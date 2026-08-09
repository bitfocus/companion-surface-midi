import type { DetectionSurfaceInfo, OpenSurfaceResult, SurfaceContext, SurfacePlugin } from '@companion-surface/base'
import { MidiWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { Input, Output } from '@julusian/midi'
import { DeviceMappings, DeviceMappingsWithRegex, MidiLayoutDefinition } from './tmp-layout.js'
import { createPincodeMap } from './pincode.js'

export interface MidiDeviceInfo {
	inputPortName: string
	outputPortName?: string
	layout: MidiLayoutDefinition
}

function getInputs(): string[] {
	const input = new Input()
	const inputs: string[] = []
	for (let i = 0; i < input.getPortCount(); i++) {
		let counter = 0
		const portName = input.getPortName(i)
		let numberedPortName = portName
		while (inputs.includes(numberedPortName)) {
			counter++
			numberedPortName = `${portName} ${counter}`
		}
		inputs.push(numberedPortName)
	}
	input.closePort()
	return inputs
}

function getOutputs(): string[] {
	const output = new Output()
	const outputs: string[] = []
	for (let i = 0; i < output.getPortCount(); i++) {
		let counter = 0
		const portName = output.getPortName(i)
		let numberedPortName = portName
		while (outputs.includes(numberedPortName)) {
			counter++
			numberedPortName = `${portName} ${counter}`
		}
		outputs.push(numberedPortName)
	}
	output.closePort()
	return outputs
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
		let output: Output | undefined

		try {
			// Use index based off name (as name already gets an index number after the port name when duplicate name), then just indexOf
			input.openPort(getInputs().indexOf(pluginInfo.inputPortName))
			output = new Output()
			output.openPort(getOutputs().indexOf(pluginInfo.outputPortName ?? pluginInfo.inputPortName)) // TODO - check if this is good?

			return {
				surface: new MidiWrapper(surfaceId, input, output, pluginInfo.inputPortName, context, layout),
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
