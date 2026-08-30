import { Input, Output } from '@julusian/midi'

const input = new Input()
const output = new Output()

export function getInputs(): string[] {
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
	return inputs
}

export function getOutputs(): string[] {
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
	return outputs
}
