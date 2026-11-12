import type { SurfaceSchemaLayoutDefinition } from '@companion-surface/base'
import type { MidiLayoutDefinition } from './tmp-layout.js'
import { parseControlId } from './util.js'

export function createSurfaceSchema(
	layout: MidiLayoutDefinition,
	// extendedMode: boolean = false,
): SurfaceSchemaLayoutDefinition {
	const surfaceLayout: SurfaceSchemaLayoutDefinition = {
		stylePresets: {
			default: {
				colors: 'hex',
				bitmap: {
					w: 8,
					h: 8,
					format: 'rgb',
				},
			},
		},
		controls: {},
	}

	for (const buttonId in layout.buttons) {
		// The following code is commented out, because there is no way to update the surface schema after already being initialized.
		// In case this functionality ever gets added, we do already have the code to handle that here then.
		// But for now, we'll just add all buttons instead
		// if (button.extendedModeOnly === true && !extendedMode) continue // skip these
		const { row, column } = parseControlId(buttonId)
		surfaceLayout.controls[buttonId] = {
			row: row,
			column: column,
		}
	}

	return surfaceLayout
}
