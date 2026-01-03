import type { SurfaceSchemaLayoutDefinition } from '@companion-surface/base'
import { MidiLayoutDefinition } from './tmp-layout.js'

export function createSurfaceSchema(layout: MidiLayoutDefinition): SurfaceSchemaLayoutDefinition {
	const surfaceLayout: SurfaceSchemaLayoutDefinition = {
		stylePresets: {
			default: {
				colors: 'hex',
			},
		},
		controls: {},
	}

	for (const button of layout.buttons) {
		surfaceLayout.controls[button.id] = {
			row: button.row,
			column: button.column,
			// TODO - style?
		}
	}

	return surfaceLayout
}
