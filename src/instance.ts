import {
	assertNever,
	type CardGenerator,
	createModuleLogger,
	type HostCapabilities,
	parseColor,
	type RgbColor,
	type SurfaceDrawProps,
	type SurfaceContext,
	type SurfaceInstance,
	type ModuleLogger,
} from '@companion-surface/base'
import type { Input, Output } from '@julusian/midi/lazy'
import type { MidiButtonDefinitionWithId, MidiLayoutDefinition } from './tmp-layout.js'
import { parseControlId } from './util.js'
import { getInputs, getOutputs } from './midi-helper.js'

export class MidiWrapper implements SurfaceInstance {
	readonly #logger: ModuleLogger

	readonly #input: Input
	readonly #output: Output
	readonly #outputWasOpenAtStart: boolean = false
	readonly #inputPortName: string
	readonly #outputPortName: string
	readonly #surfaceId: string
	readonly #context: SurfaceContext
	readonly #layout: MidiLayoutDefinition

	readonly #noteOnOffListeners: Map<number, MidiButtonDefinitionWithId> = new Map()
	readonly #ccListeners: Map<number, MidiButtonDefinitionWithId> = new Map()
	#extendedMode: boolean = false

	/**
	 * Last drawn colours, to allow resending when brightness changes
	 */
	readonly #lastColours: Record<string, RgbColor> = {}
	#brightness: number = 100
	readonly #checkInterval: NodeJS.Timeout

	public get surfaceId(): string {
		return this.#surfaceId
	}
	public get productName(): string {
		return this.#inputPortName
	}

	public constructor(
		surfaceId: string,
		input: Input,
		output: Output,
		inputPortName: string,
		outputPortName: string,
		context: SurfaceContext,
		layout: MidiLayoutDefinition,
	) {
		this.#logger = createModuleLogger(`Instance/${surfaceId}`)
		this.#input = input
		this.#output = output
		this.#outputWasOpenAtStart = output.isPortOpen()
		this.#inputPortName = inputPortName
		this.#outputPortName = outputPortName
		this.#surfaceId = surfaceId
		this.#context = context
		this.#layout = layout

		this.#checkInterval = setInterval(() => {
			this.#checkPortStatus()
				.catch(() => {})
				.finally(() => {})
		}, 2e3)
	}

	async init(): Promise<void> {
		this.#configureLayoutListeners()

		this.#input.on('noteon', (note, velocity, info) => {
			this.#logger.debug(`MIDI noteon received: channel=${info.channel} note=${note} velocity=${velocity}`)

			const noteIdx = info.channel * 128 + note
			const listener = this.#noteOnOffListeners.get(noteIdx)
			if (!listener) return

			if (listener.type === 'noteon') {
				const { row } = parseControlId(listener.id)
				if (!isNaN(row)) {
					if (velocity > 0) {
						this.#context.keyDownById(listener.id)
					} else {
						this.#context.keyUpById(listener.id)
					}
				} else if (velocity > 0) {
					// Extra buttons
					if (this.#layout.canChangePage) {
						if (listener.id === 'page/left') this.#context.changePage(false)
						else if (listener.id === 'page/right') this.#context.changePage(true)
					}
				}
			} else if (listener.type === 'noteon-encoder') {
				this.#context.sendVariableValue(listener.id, velocity)
			}
		})

		this.#input.on('noteoff', (note, velocity, info) => {
			this.#logger.debug(`MIDI noteoff received: channel=${info.channel} note=${note} velocity=${velocity}`)

			const noteIdx = info.channel * 128 + note
			const listener = this.#noteOnOffListeners.get(noteIdx)
			if (!listener) return

			if (listener.type === 'noteon') {
				const { row } = parseControlId(listener.id)
				if (!isNaN(row)) {
					this.#context.keyUpById(listener.id)
				}
			} else if (listener.type === 'noteon-encoder') {
				this.#context.sendVariableValue(listener.id, 0)
			}
		})

		this.#input.on('cc', (param, value, info) => {
			this.#logger.debug(`MIDI cc received: channel=${info.channel} param=${param} value=${value}`)

			const noteIdx = info.channel * 128 + param
			const listener = this.#ccListeners.get(noteIdx)
			if (!listener) return

			if (listener.type === 'cc') {
				const { row } = parseControlId(listener.id)
				if (!isNaN(row)) {
					if (value > 0) {
						this.#context.keyDownById(listener.id)
					} else {
						this.#context.keyUpById(listener.id)
					}
				} else if (value > 0) {
					// Extra buttons
					if (this.#layout.canChangePage) {
						if (listener.id === 'page/left') this.#context.changePage(false)
						else if (listener.id === 'page/right') this.#context.changePage(true)
					}
				}
			} else if (listener.type === 'cc-encoder') {
				this.#context.sendVariableValue(listener.id, value)
			}
		})

		this.#input.on('sysex', (bytes) => {
			if (this.#layout.parseSysex) {
				this.#layout.parseSysex(this.#context, bytes)
			}
		})

		// this.#input.on('error', (e) => context.disconnect(e))

		// Start by blanking it
		await this.blank()
	}

	#configureLayoutListeners(): void {
		this.#noteOnOffListeners.clear()
		this.#ccListeners.clear()

		// Future: could there be multiple listeners for one note?
		const buttons = this.#layout.buttons
		for (const buttonId in buttons) {
			if (!buttons[buttonId]) continue // should never happen but just for typescript
			const button: MidiButtonDefinitionWithId = { ...buttons[buttonId], id: buttonId }
			if (button.note < 0) continue
			if (button.extendedModeOnly && !this.#extendedMode) continue
			const noteIdx = button.channel * 128 + button.note
			switch (button.type) {
				case 'noteon':
				case 'noteon-encoder':
					this.#noteOnOffListeners.set(noteIdx, button)
					break
				case 'cc':
				case 'cc-encoder':
					this.#ccListeners.set(noteIdx, button)
					break
				default:
					assertNever(button.type)
					this.#logger.warn(`Unknown button in layout: ${button.id}`)
					break
			}
		}

		// Extra buttons that are not really buttons, but just helpful tools
		const extraButtons = this.#layout.extraButtons
		for (const buttonId in extraButtons) {
			if (!extraButtons[buttonId]) continue // should never happen but just for typescript
			const button: MidiButtonDefinitionWithId = { ...extraButtons[buttonId], id: buttonId }
			if (button.note < 0) continue
			if (button.extendedModeOnly && !this.#extendedMode) continue
			const noteIdx = button.channel * 128 + button.note
			switch (button.type) {
				case 'noteon':
				case 'noteon-encoder':
					this.#noteOnOffListeners.set(noteIdx, button)
					break
				case 'cc':
				case 'cc-encoder':
					this.#ccListeners.set(noteIdx, button)
					break
				default:
					assertNever(button.type)
					this.#logger.warn(`Unknown button in layout: ${button.id}`)
					break
			}
		}

		// Extra inputs from the device, such as encoders, etc
		for (const variable of this.#layout.transferVariables?.filter((variable) => variable.type === 'input') ?? []) {
			if (variable.note < 0) continue
			if (variable.extendedModeOnly && !this.#extendedMode) continue
			const button: MidiButtonDefinitionWithId = {
				...variable,
				type: (variable.msg_type + '-encoder') as 'cc-encoder' | 'noteon-encoder',
				id: variable.id,
			}
			const noteIdx = button.channel * 128 + button.note
			switch (variable.msg_type) {
				case 'noteon':
					this.#noteOnOffListeners.set(noteIdx, button)
					break
				case 'cc':
					this.#ccListeners.set(noteIdx, button)
					break
				default:
					assertNever(variable.msg_type)
					this.#logger.warn(`Unknown variable in layout: ${variable.id}`)
					break
			}
		}
	}

	async close(): Promise<void> {
		this.#logger.debug('Connection closed')
		clearInterval(this.#checkInterval)

		if (this.#output.isPortOpen()) {
			await this.#clearPanel().catch(() => null)

			const commands = this.#layout.command_shutdown()
			for (const command of commands) this.#output.sendMessage(command)
		}

		this.#input.closePort()
		this.#input.destroy()
		this.#output.closePort()
		this.#output.destroy()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {
		// Not used
	}

	async updateConfig(config: Record<string, any>): Promise<void> {
		this.#extendedMode = config?.extendedMode === true
		this.#configureLayoutListeners()
	}

	async ready(): Promise<void> {}

	async setBrightness(percent: number): Promise<void> {
		this.#brightness = this.#layout.supportsBrightness ? percent : 100
		for (const btnId in this.#layout.buttons) {
			const color = this.#lastColours[btnId] ?? { r: 0, g: 0, b: 0 }
			this.#writeKeyColour(btnId, color)
		}
	}

	async blank(): Promise<void> {
		await this.#clearPanel()
	}

	async draw(_signal: AbortSignal, drawProps: SurfaceDrawProps): Promise<void> {
		if (!this.#output.isPortOpen()) return

		let color = drawProps.color ? parseColor(drawProps.color) : { r: 0, g: 0, b: 0 }

		// using api 1.4.1+ it will provide an pressed property
		if ('pressed' in drawProps) {
			if (drawProps.pressed === true) {
				color = {
					r: 255,
					g: 198,
					b: 0,
				}
			}
		} else if (drawProps.image && drawProps.image.length >= 3) {
			// Grab bitmap one pixel color if provided. This will make sure we can kind of provide a color change when pressed...
			color = {
				r: drawProps.image[0],
				g: drawProps.image[1],
				b: drawProps.image[2],
			}
			if (this.#layout.isColorTooBlack(color)) {
				color = {
					r: drawProps.image[drawProps.image.length - 3],
					g: drawProps.image[drawProps.image.length - 2],
					b: drawProps.image[drawProps.image.length - 1],
				}
			}

			// // for debugging purposes
			// drawProps.image = new Uint8Array([
			// 	...drawProps.image.slice(0, 3),
			// 	...drawProps.image.slice(drawProps.image.length - 3, drawProps.image.length),
			// ])
		}
		// this.#logger.debug(JSON.stringify(drawProps) + ' -> ' + JSON.stringify(color))
		this.#lastColours[drawProps.controlId] = color

		this.#writeKeyColour(drawProps.controlId, color)
	}

	#writeKeyColour(controlId: string, color: RgbColor): void {
		if (!this.#output.isPortOpen()) return

		if (this.#layout.supportsBrightness) {
			const scale = Math.max(Math.min(this.#brightness, 100), 0) / 100
			color = { r: color.r * scale, g: color.g * scale, b: color.b * scale }
		}

		const fillBuffer = this.#layout.command_writeKeyColour(controlId, color)
		if (fillBuffer.length > 0) this.#output.sendMessage(fillBuffer)
	}

	async #clearPanel(): Promise<void> {
		if (!this.#output.isPortOpen()) return
		const commands = this.#layout.command_clearPanel()
		for (const command of commands) this.#output.sendMessage(command)
	}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator, _statusMessage: string): Promise<void> {
		/*
		const ids = this.#layout.buttons.map((a) => parseControlId(a.id))
		const width = Math.max(...ids.map((id) => id.column))
		const height = Math.max(...ids.map((id) => id.row))
		const pixels = await _cardGenerator.generateLogoCard(width, height, 'rgb')

		let btn = 0
		for (let i = 0; i < pixels.length; i += 3) {
			this.#writeKeyColour(this.#layout.buttons[btn++].id, { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] })
		}
		*/
	}

	onVariableValue(id: string, value: unknown): void {
		if (!this.#output.isPortOpen()) return
		const variable = this.#layout.transferVariables
			?.filter((variable) => variable.type === 'output')
			.find((variable) => variable.id === id)
		if (variable && typeof value === 'number' && value >= 0 && value <= 127) {
			variable.callback(this.#output, value)
		}
	}

	async #checkPortStatus(): Promise<void> {
		let disconnected: boolean = false
		if (!this.#input.isPortOpen()) {
			this.#context.disconnect(new Error('Input port closed'))
			disconnected = true
		} else if (this.#outputWasOpenAtStart && !this.#output.isPortOpen()) {
			this.#context.disconnect(new Error('Output port closed'))
			disconnected = true
		} else if (!getInputs().includes(this.#inputPortName)) {
			this.#input.closePort()
			this.#output.closePort()
			this.#context.disconnect(new Error('Input port is lost'))
			disconnected = true
		} else if (this.#outputWasOpenAtStart && !getOutputs().includes(this.#outputPortName)) {
			this.#input.closePort()
			this.#output.closePort()
			this.#context.disconnect(new Error('Output port is lost'))
			disconnected = true
		}

		if (disconnected) {
			clearInterval(this.#checkInterval)
		}
	}
}
