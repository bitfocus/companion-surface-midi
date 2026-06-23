import { SurfacePincodeMap } from '@companion-surface/base'
import { MidiLayoutDefinition } from './tmp-layout.js'
import { createControlId } from './util.js'

export function createPincodeMap(_model: MidiLayoutDefinition): SurfacePincodeMap | null {
	return {
		type: 'single-page',
		pincode: null,
		1: createControlId(0, 0),
		2: createControlId(0, 1),
		3: createControlId(0, 2),
		4: createControlId(0, 3),
		5: createControlId(0, 4),
		6: createControlId(1, 0),
		7: createControlId(1, 1),
		8: createControlId(1, 2),
		9: createControlId(1, 3),
		0: createControlId(1, 4),
	}
}
