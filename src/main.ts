import type { DetectionSurfaceInfo, OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { MidiWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { Input, Output } from '@julusian/midi'
import { DeviceMappings, DeviceMappingsWithRegex, MidiLayoutDefinition } from './tmp-layout.js'
import { createPincodeMap } from './pincode.js'
import { getInputs, getOutputs } from './midi-helper.js'

export interface MidiDeviceInfo {
	inputPortName: string
	outputPortName?: string
	layout: MidiLayoutDefinition
}

const MidiPlugin: SurfacePlugin<MidiDeviceInfo> = {
	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	scanForSurfaces: async (): Promise<DetectionSurfaceInfo<MidiDeviceInfo>[]> => {
		const discovered: DetectionSurfaceInfo<MidiDeviceInfo>[] = []

		const outputs = getOutputs()
		getInputs().forEach((name, i) => {
			let deviceMapping = DeviceMappings[name]
			if (!deviceMapping) {
				deviceMapping = DeviceMappings[name.replace(/ [0-9]+$/m, '')]
				if (!deviceMapping) {
					for (const { regex, name: regexName } of DeviceMappingsWithRegex) {
						if (regex.exec(name) !== null) {
							deviceMapping = DeviceMappings[regexName]
							if (deviceMapping.outputName !== undefined)
								deviceMapping.outputName = name.replace(regex, deviceMapping.outputName)
						}
					}
				}
			}

			if (deviceMapping?.layout)
				discovered.push({
					deviceHandle: `midi:${name}`,
					surfaceId: `midi:${name}`,
					description: `MIDI Port ${i}: ${name}`,
					pluginInfo: {
						inputPortName: name,
						outputPortName: deviceMapping.outputName ?? outputs.find((output) => output === name) ?? name,
						layout: deviceMapping.layout,
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
		const layout: MidiLayoutDefinition = pluginInfo.layout

		const input = new Input()
		const output = new Output()

		try {
			const inputPortName = pluginInfo.inputPortName
			const outputPortName = pluginInfo.outputPortName ?? pluginInfo.inputPortName

			// Use index based off name (as name already gets an index number after the port name when duplicate name), then just indexOf
			input.openPort(getInputs().indexOf(inputPortName))
			output.openPort(getOutputs().indexOf(outputPortName)) // TODO - check if this is good?

			return {
				surface: new MidiWrapper(surfaceId, input, output, inputPortName, outputPortName, context, layout),
				registerProps: {
					brightness: layout.supportsBrightness,
					canChangePage: layout.canChangePage,
					surfaceLayout: createSurfaceSchema(layout),
					pincodeMap: createPincodeMap(layout),
					transferVariables: layout.transferVariables ?? [],
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
