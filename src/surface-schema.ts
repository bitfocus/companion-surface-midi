import type { SurfaceSchemaLayoutDefinition } from '@companion-surface/base'
import { MidiLayoutDefinition } from './tmp-layout.js'
import { parseControlId } from './util.js'

export function createSurfaceSchema(layout: MidiLayoutDefinition): SurfaceSchemaLayoutDefinition {
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

	for (const button of layout.buttons) {
		const { row, column } = parseControlId(button.id)
		surfaceLayout.controls[button.id] = {
			row: row,
			column: column,
		}
	}

	return surfaceLayout
}
