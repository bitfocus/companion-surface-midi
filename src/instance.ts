import {
	CardGenerator,
	HostCapabilities,
	SurfaceDrawProps,
	SurfaceContext,
	SurfaceInstance,
	ModuleLogger,
	createModuleLogger,
	assertNever,
} from '@companion-surface/base'
import type { Input, Output } from '@julusian/midi'
// import { createControlId, parseControlId } from './util.js'
import { MidiButtonDefinition, MidiLayoutDefinition } from './tmp-layout.js'

export class MidiWrapper implements SurfaceInstance {
	readonly #logger: ModuleLogger

	readonly #input: Input
	readonly #output: Output | undefined
	readonly #portName: string
	readonly #surfaceId: string
	// readonly #layout: MidiLayoutDefinition
	// readonly #context: SurfaceContext

	readonly #noteOnOffListeners: Map<number, MidiButtonDefinition> = new Map()
	readonly #ccListeners: Map<number, MidiButtonDefinition> = new Map()

	// /**
	//  * Last drawn colours, to allow resending when brightness changes
	//  */
	// readonly #lastColours: Record<string, RgbColor> = {}
	// #brightness: number = 50

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
		this.#logger = createModuleLogger(`Framework/${surfaceId}`)
		this.#input = input
		this.#output = output
		this.#portName = portName
		this.#surfaceId = surfaceId
		// this.#context = context
		// this.#layout = layout

		// Future: could there be multiple listeners for one note?
		for (const button of layout.buttons) {
			switch (button.type) {
				case 'noteon':
					this.#noteOnOffListeners.set(button.note, button)
					break
				case 'cc':
					this.#ccListeners.set(button.note, button)
					break
				default:
					assertNever(button.type)
					this.#logger.warn(`Unknown button in layout: ${button.id}`)
					break
			}
		}

		// this.#input.on('messageBuffer', (deltaTime, message) => {
		// 	console.log(`MIDI message received: ${message.toString('hex')} (Delta time: ${deltaTime})`)
		// })
		this.#input.on('noteon', (note, velocity, info) => {
			console.log(`MIDI noteon received: note=${note} velocity=${velocity} info=${JSON.stringify(info)}`)
			const listener = this.#noteOnOffListeners.get(note)
			if (!listener) return

			if (listener.type === 'noteon') {
				if (velocity > 0) {
					context.keyDownById(listener.id)
				} else {
					context.keyUpById(listener.id)
				}
			}
		})
		this.#input.on('cc', (param, value, info) => {
			console.log(`MIDI cc received: param=${param} value=${value} info=${JSON.stringify(info)}`)

			const listener = this.#ccListeners.get(param)
			if (!listener) return

			if (listener.type === 'cc') {
				if (value > 0) {
					context.keyDownById(listener.id)
				} else {
					context.keyUpById(listener.id)
				}
			}
		})

		// this.#device.on('error', (e) => context.disconnect(e))
	}

	async init(): Promise<void> {
		// Start with blanking it
		await this.blank()
	}
	async close(): Promise<void> {
		await this.#clearPanel().catch(() => null)

		this.#input.closePort()
		this.#input.destroy()
		this.#output?.closePort()
		this.#output?.destroy()
	}

	updateCapabilities(_capabilities: HostCapabilities): void {
		// Not used
	}

	async ready(): Promise<void> {}

	async setBrightness(percent: number): Promise<void> {
		// this.#brightness = percent
		// for (let y = 0; y < MACROPAD_ROWS; y++) {
		// 	for (let x = 0; x < MACROPAD_COLUMNS; x++) {
		// 		const color = this.#lastColours[createControlId(y, x)] ?? { r: 0, g: 0, b: 0 }
		// 		this.#writeKeyColour(x, y, color)
		// 	}
		// }
	}
	async blank(): Promise<void> {
		await this.#clearPanel()
	}
	async draw(_signal: AbortSignal, drawProps: SurfaceDrawProps): Promise<void> {
		// const color = drawProps.color ? parseColor(drawProps.color) : { r: 0, g: 0, b: 0 }
		// this.#lastColours[drawProps.controlId] = color
		// const pos = parseControlId(drawProps.controlId)
		// this.#writeKeyColour(pos.column, pos.row, color)
	}

	// #writeKeyColour(x: number, y: number, color: RgbColor): void {
	// 	const fillBuffer = Buffer.alloc(32)
	// 	fillBuffer.writeUint8(0x0f, 0)
	// 	fillBuffer.writeUint8(x + 1, 1)
	// 	fillBuffer.writeUint8(y + 1, 2)

	// 	const scale = (this.#brightness || 50) / 100
	// 	fillBuffer.writeUint8(color.r * scale, 3)
	// 	fillBuffer.writeUint8(color.g * scale, 4)
	// 	fillBuffer.writeUint8(color.b * scale, 5)

	// 	this.#device.write(fillBuffer).catch((e) => {
	// 		this.#logger.error(`write failed: ${e}`)
	// 	})
	// }

	async #clearPanel(): Promise<void> {
		// const clearBuffer = Buffer.alloc(32)
		// clearBuffer.writeUint8(0x0b, 0)
		// await this.#device.write(clearBuffer)
	}

	async showStatus(_signal: AbortSignal, _cardGenerator: CardGenerator): Promise<void> {
		// Nothing to display here
		// TODO - do some flashing lights to indicate each status?
	}
}
