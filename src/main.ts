import type { DiscoveredSurfaceInfo, OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { MidiWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { Input, Output } from '@julusian/midi'
import { MidiLayoutDefinition, NovationLaunchpadLayoutTest } from './tmp-layout.js'

export interface MidiDeviceInfo {
	inputPortName: string
}

const MidiPlugin: SurfacePlugin<MidiDeviceInfo> = {
	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	scanForSurfaces: async (): Promise<DiscoveredSurfaceInfo<MidiDeviceInfo>[]> => {
		const discovered: DiscoveredSurfaceInfo<MidiDeviceInfo>[] = []

		Input.getPortNames().forEach((name, i) => {
			// Future: maybe filter names here to only show certain devices
			console.log(`MIDI Input Port ${i}: ${name}`)

			discovered.push({
				surfaceId: `midi:${i}`,
				description: `MIDI Port ${i}: ${name}`,
				pluginInfo: {
					inputPortName: name,
				},
			})
		})

		return discovered
	},

	openSurface: async (
		surfaceId: string,
		pluginInfo: MidiDeviceInfo,
		context: SurfaceContext,
	): Promise<OpenSurfaceResult> => {
		const layout: MidiLayoutDefinition = NovationLaunchpadLayoutTest

		const input = new Input()
		let output: Output | undefined

		try {
			input.openPortByName(pluginInfo.inputPortName)
			output = new Output()
			output.openPortByName(pluginInfo.inputPortName) // TODO - check if this is good?

			return {
				surface: new MidiWrapper(surfaceId, input, output, pluginInfo.inputPortName, context, layout),
				registerProps: {
					brightness: true,
					surfaceLayout: createSurfaceSchema(layout),
					pincodeMap: null,
					configFields: null,
					location: null,
				},
			}
		} catch (e) {
			input.closePort()
			output?.closePort()

			throw e
		}
	},
}
export default MidiPlugin
