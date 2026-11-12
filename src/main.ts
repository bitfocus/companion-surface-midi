import {
	createModuleLogger,
	type DetectionSurfaceInfo,
	type OpenSurfaceResult,
	type SurfaceContext,
	type SurfacePlugin,
} from '@companion-surface/base'
import { Input, Output } from '@julusian/midi/lazy'
import { DeviceMappings, DeviceMappingsWithRegex, type MidiLayoutDefinition } from './tmp-layout.js'
import { MidiWrapper } from './instance.js'
import { createSurfaceSchema } from './surface-schema.js'
import { createPincodeMap } from './pincode.js'
import { getInputs, getOutputs } from './midi-helper.js'

export interface MidiDeviceInfo {
	inputPortName: string
	outputPortName?: string
	layout: MidiLayoutDefinition
}

const logger = createModuleLogger('Main')

const MidiPlugin: SurfacePlugin<MidiDeviceInfo> = {
	init: async (): Promise<void> => {
		// Nothing to do
	},
	destroy: async (): Promise<void> => {
		// Nothing to do
	},

	scanForSurfaces: async (): Promise<DetectionSurfaceInfo<MidiDeviceInfo>[]> => {
		const discovered: DetectionSurfaceInfo<MidiDeviceInfo>[] = []

		const inputs = getInputs()
		const outputs = getOutputs()
		let i = -1
		for (const inputPortName of inputs) {
			i++

			let outputName: string | undefined = undefined
			let deviceMapping = DeviceMappings[inputPortName]
			if (deviceMapping === undefined) {
				// If there's multiple of the same device, the name will have an index at the end
				deviceMapping = DeviceMappings[inputPortName.replace(/ [0-9]+$/m, '')]
				if (deviceMapping === undefined) {
					for (const { regex, name: regexName } of DeviceMappingsWithRegex) {
						if (regex.exec(inputPortName) !== null) {
							deviceMapping = DeviceMappings[regexName]
							if (deviceMapping === undefined) {
								// Unsure how this would happen, probably only when the regexName has not been updated...
								logger.error(
									'This should never happen, but for some reason the regexName ' +
										regexName +
										' does not have a DeviceMappings entry linked',
								)
							} else {
								if (deviceMapping.outputName !== undefined) {
									outputName = inputPortName.replace(regex, deviceMapping.outputName)
								}
								// Found it, break the for loop
								break
							}
						}
					}

					if (!deviceMapping) {
						// Does not have a known name
						continue
					}
				} else if (deviceMapping.outputName !== undefined) {
					// Add index to outputName, so it can match. Assuming if the input port has an index, then the outputPort has too, as it does indicate a duplicate
					outputName = deviceMapping.outputName + inputPortName.replace(/.* ([0-9]+)$/m, ' $1')
				}
			} else if (deviceMapping.outputName !== undefined) {
				outputName = deviceMapping.outputName
			}

			if (deviceMapping.layout !== undefined) {
				const findOutputName = outputName !== undefined ? outputName : inputPortName
				discovered.push({
					deviceHandle: `midi:${inputPortName}`,
					surfaceId: `midi:${inputPortName}`,
					description: `MIDI Port ${i}: ${inputPortName}`,
					pluginInfo: {
						inputPortName: inputPortName,
						outputPortName: outputs.find((output) => output === findOutputName),
						layout: deviceMapping.layout,
					},
				})
			}
		}

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
			const outputPortIndex = getOutputs().indexOf(outputPortName)
			if (outputPortIndex > -1) output.openPort(outputPortIndex)
			else throw new Error('Failed to open output port')
			// Leaving this one ^^ in for when we switch to allowing users to change output port for a surface, when we add all midi devices by default

			return {
				surface: new MidiWrapper(surfaceId, input, output, inputPortName, outputPortName, context, layout),
				registerProps: {
					brightness: layout.supportsBrightness,
					canChangePage: layout.canChangePage,
					surfaceLayout: createSurfaceSchema(layout),
					pincodeMap: createPincodeMap(layout),
					transferVariables: layout.transferVariables ?? [],
					configFields: [
						{
							id: 'useBitmap',
							type: 'checkbox',
							label: 'Use bitmap instead of button color + pressed action',
							description:
								'By default the module will use the button color, and the pressed property to determine which color to display.\n' +
								'Previously, it used the bitmap image and grabbed a pixel from the top left or bottom right, which required the decoration to be border and not topbar.\n' +
								'It is recommended to leave this off, but if you really care or if your setup is super absurd, you can enable this to let it pick from the bitmap.',
							default: false,
						},
						{
							id: 'extendedMode',
							type: 'checkbox',
							label: 'Enable extended mode',
							description:
								'SOME devices contain extra buttons that do not have color support, and therefor will not be usable by default.\n' +
								'But if you really care about utilizing those buttons, you can enable this. Just be aware those extra buttons do not have color support or only one color.',
							isVisibleExpression: `${Object.values(layout.buttons).find((btn) => btn?.extendedModeOnly === true) ? 1 : 0} == 1`,
							default: false,
						},
					],
					location: null,
				},
			}
		} catch (e) {
			try {
				input.closePort()
				input.destroy()
			} catch {
				/* empty */
			}
			try {
				output.closePort()
				output.destroy()
			} catch {
				/* empty */
			}

			// disconnect required to give a message back to the user, else they'll only get a generic stacktrace which isn't user friendly
			context.disconnect(new Error('Failed to open MIDI device', { cause: e }))
			// throw required to stop the openSurface to actually pass thru
			throw e
		}
	},
}
export default MidiPlugin
