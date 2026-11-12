import type { SurfacePincodeMap } from '@companion-surface/base'
import type { MidiLayoutDefinition } from './tmp-layout.js'

export function createPincodeMap(_model: MidiLayoutDefinition): SurfacePincodeMap | null {
	// Return null to disable the feature, as there's no good way to do this yet.
	return null
	/*
	return {
		type: 'single-page',
		pincode: null,
		1: '0/0',
		2: '0/1',
		3: '0/2',
		4: '0/3',
		5: '0/4',
		6: '1/0',
		7: '1/1',
		8: '1/2',
		9: '1/3',
		0: '1/4',
	}
	*/
}
