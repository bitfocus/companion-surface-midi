import {
	assertNever,
	CardGenerator,
	createModuleLogger,
	HostCapabilities,
	parseColor,
	RgbColor,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	ModuleLogger,
} from '@companion-surface/base'
import type { Input, Output } from '@julusian/midi'
import { parseControlId, createControlId } from './util.js'
import { MidiButtonDefinition, MidiLayoutDefinition } from './tmp-layout.js'

export class MidiWrapper implements SurfaceInstance {
	readonly #logger: ModuleLogger

	readonly #input: Input
	readonly #output: Output | undefined
	readonly #portName: string
	readonly #surfaceId: string
	// readonly #context: SurfaceContext
	readonly #layout: MidiLayoutDefinition

	readonly #noteOnOffListeners: Map<number, MidiButtonDefinition> = new Map()
	readonly #ccListeners: Map<number, MidiButtonDefinition> = new Map()

	/**
	 * Last drawn colours, to allow resending when brightness changes
	 */
	readonly #lastColours: Record<string, RgbColor> = {}
	#brightness: number = 100

	public get surfaceId(): string {
		return this.#surfaceId
	}
	public get productName(): string {
		return this.#portName
	}

	public constructor(
		surfaceId: string,
		input: Input,
		output: Output | undefined,
		portName: string,
		context: SurfaceContext,
		layout: MidiLayoutDefinition,
	) {
		this.#logger = createModuleLogger(`Instance/${surfaceId}`)
		this.#input = input
		this.#output = output
		this.#portName = portName
		this.#surfaceId = surfaceId
		// this.#context = context
		this.#layout = layout

		// Future: could there be multiple listeners for one note?
		for (const button of layout.buttons) {
			switch (button.type) {
				case 'noteon':
					this.#noteOnOffListeners.set(button.note, button)
					break
				case 'cc':
				case 'cc-encoder':
					this.#ccListeners.set(button.note, button)
					break
				default:
					assertNever(button.type)
					this.#logger.warn(`Unknown button in layout: ${button.id}`)
					break
			}
		}

		// Extra buttons that are not really buttons, but just helpful tools
		for (const button of layout.extra_buttons) {
			switch (button.type) {
				case 'noteon':
					this.#noteOnOffListeners.set(button.note, button)
					break
				case 'cc':
					this.#ccListeners.set(button.note, button)
					break
			}
		}

		// As of right now, the current version of the midi package does not do this, still waiting for that new version to come out!
		this.#input.on('message', (deltaTime, message) => {
			// this.#logger.debug(`m: ${message} d: ${deltaTime}`)
			const channel = message[0] & 0x0f
			const type = message[0] & 0xf0
			if (type === 0x90) input.emit('noteon', message[1], message[2], { channel, deltaTime })
			else if (type === 0x80) input.emit('noteoff', message[1], message[2], { channel, deltaTime })
			else if (type === 0xb0) input.emit('cc', message[1], message[2], { channel, deltaTime })
		})

		// / @ts-expect-error no types for message
		// this.#input.on('messageBuffer', (deltaTime, message) => {
		// 	this.#logger.debug(`MIDI message received: ${message.toString('hex')} (Delta time: ${deltaTime})`)
		// })
		// @ts-expect-error no types for message
		this.#input.on('noteon', (note, velocity, info) => {
			this.#logger.debug(`MIDI noteon received: note=${note} velocity=${velocity} info=${JSON.stringify(info)}`)

			const listener = this.#noteOnOffListeners.get(note)
			if (!listener) return

			if (listener.type === 'noteon') {
				if (listener.row > -1) {
					if (velocity > 0) {
						context.keyDownById(listener.id)
					} else {
						context.keyUpById(listener.id)
					}
				} else if (velocity > 0) {
					// Extra buttons
					if (this.#layout.canChangePage) {
						if (listener.id === 'page-left') context.changePage(false)
						else if (listener.id === 'page-right') context.changePage(true)
					}
				}
			}
		})
		// @ts-expect-error no types for message
		this.#input.on('noteoff', (note, velocity, info) => {
			this.#logger.debug(`MIDI noteoff received: note=${note} velocity=${velocity} info=${JSON.stringify(info)}`)

			const listener = this.#noteOnOffListeners.get(note)
			if (!listener) return

			if (listener.type === 'noteon') {
				if (listener.row > -1) {
					context.keyUpById(listener.id)
				}
			}
		})

		const valuesPots: { [id: string]: number } = {}
		// @ts-expect-error no types for message
		this.#input.on('cc', (param, value, info) => {
			this.#logger.debug(`MIDI cc received: param=${param} value=${value} info=${JSON.stringify(info)}`)

			const listener = this.#ccListeners.get(param)
			if (!listener) return

			if (listener.type === 'cc') {
				if (listener.row > -1) {
					if (value > 0) {
						context.keyDownById(listener.id)
					} else {
						context.keyUpById(listener.id)
					}
				} else if (value > 0) {
					// Extra buttons
					if (this.#layout.canChangePage) {
						if (listener.id === 'page-left') context.changePage(false)
						else if (listener.id === 'page-right') context.changePage(true)
					}
				}
			} else if (listener.type === 'cc-encoder') {
				if (valuesPots[listener.id] === undefined) valuesPots[listener.id] = value
				const delta = value - valuesPots[listener.id]
				valuesPots[listener.id] = value
				if (delta > 0) {
					for (let i = 0; i < delta; i++) context.rotateRightById(listener.id)
				} else if (delta < 0) {
					for (let i = 0; i < -delta; i++) context.rotateLeftById(listener.id)
				}
			}
		})

		// / @ts-expect-error no types for message
		// this.#device.on('error', (e) => context.disconnect(e))
	}

	async init(): Promise<void> {
		// Start by blanking it
		await this.blank()
	}

	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)
		if (this.#output) {
			const commands = this.#layout.command_shutdown()
			for (const command of commands) this.#output.sendMessage(command)
		}

		this.#input.closePort()
		this.#input.destroy()
		this.#output?.closePort()
		this.#output?.destroy()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {
		// Not used
	}

	async updateConfig(_config: Record<string, any>): Promise<void> {
		// Not used
	}

	async ready(): Promise<void> {}

	async setBrightness(percent: number): Promise<void> {
		this.#brightness = this.#layout.supportsBrightness ? percent : 100
		for (const btn of this.#layout.buttons) {
			const color = this.#lastColours[createControlId(btn.row, btn.column)] ?? { r: 0, g: 0, b: 0 }
			this.#writeKeyColour(btn.column, btn.row, color)
		}
	}

	async blank(): Promise<void> {
		await this.#clearPanel()
	}

	async draw(_signal: AbortSignal, drawProps: SurfaceDrawProps): Promise<void> {
		let color = drawProps.color ? parseColor(drawProps.color) : { r: 0, g: 0, b: 0 }
		// Grab bitmap one pixel color if provided. This will make sure we can kind of provide a color change when pressed...
		if (drawProps.image && drawProps.image.length >= 3) {
			color = {
				r: drawProps.image[0],
				g: drawProps.image[1],
				b: drawProps.image[2],
			}
			if (this.#layout.isColorTooBlack?.(color)) {
				color = {
					r: drawProps.image[drawProps.image.length - 3],
					g: drawProps.image[drawProps.image.length - 2],
					b: drawProps.image[drawProps.image.length - 1],
				}
			}

			// for debugging purposes
			drawProps.image = new Uint8Array([
				...drawProps.image.slice(0, 3),
				...drawProps.image.slice(drawProps.image.length - 3, drawProps.image.length),
			])
		}
		this.#logger.debug(JSON.stringify(drawProps) + ' -> ' + JSON.stringify(color))
		this.#lastColours[drawProps.controlId] = color

		const pos = parseControlId(drawProps.controlId)
		this.#writeKeyColour(pos.column, pos.row, color)
	}

	#writeKeyColour(x: number, y: number, color: RgbColor): void {
		if (this.#layout.supportsBrightness) {
			const scale = (this.#brightness || 100) / 100
			color = { r: color.r * scale, g: color.g * scale, b: color.b * scale }
		}

		const fillBuffer = this.#layout.command_writeKeyColour(x, y, color)
		if (this.#output && fillBuffer.length > 0) this.#output.sendMessage(fillBuffer)
	}

	async #clearPanel(): Promise<void> {
		if (!this.#output) return
		const commands = this.#layout.command_clearPanel()
		for (const command of commands) this.#output.sendMessage(command)
	}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator, _statusMessage: string): Promise<void> {
		// Nothing to display here
		// TODO - do some flashing lights to indicate each status?
	}
}
