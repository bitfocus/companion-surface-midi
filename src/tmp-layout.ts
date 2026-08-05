import { RgbColor } from '@companion-surface/base'
import { MidiMessage } from '@julusian/midi'
import { getClosestApcColor, getClosestApcMiniColor, getClosestLpColor } from './util.js'

export interface MidiLayoutDefinition {
	supportsBrightness: boolean
	canChangePage?: { label: string } | undefined
	buttons: MidiButtonDefinition[]
	extra_buttons: (MidiButtonDefinition & { id: 'page-left' | 'page-right'; row: -1; column: -1 })[]
	command_clearPanel: () => MidiMessage[]
	command_shutdown: () => MidiMessage[]
	command_writeKeyColour: (x: number, y: number, color: RgbColor) => MidiMessage
	isColorTooBlack?: (color: RgbColor) => boolean
}

export interface MidiButtonDefinition {
	id: string

	row: number
	column: number

	type: 'noteon' | 'cc' | 'cc-encoder'
	channel: number
	note: number
}

///////////////////////////////
// Launchpad MK2 collection: //
///////////////////////////////

// TODO - this should be moved to a json schema..
// TODO still needs testing
const NovationLaunchpadMiniLayoutTest: MidiLayoutDefinition = {
	supportsBrightness: true,
	buttons: [
		// Row 0 - cc 104-112
		{ id: '0/0', row: 0, column: 0, type: 'cc', channel: 0, note: 104 },
		{ id: '0/1', row: 0, column: 1, type: 'cc', channel: 0, note: 105 },
		{ id: '0/2', row: 0, column: 2, type: 'cc', channel: 0, note: 106 },
		{ id: '0/3', row: 0, column: 3, type: 'cc', channel: 0, note: 107 },
		{ id: '0/4', row: 0, column: 4, type: 'cc', channel: 0, note: 108 },
		{ id: '0/5', row: 0, column: 5, type: 'cc', channel: 0, note: 109 },
		{ id: '0/6', row: 0, column: 6, type: 'cc', channel: 0, note: 110 },
		{ id: '0/7', row: 0, column: 7, type: 'cc', channel: 0, note: 111 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', channel: 0, note: 112 },

		// Row 1 - notes 0-8
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 0, note: 0 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 0, note: 1 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 0, note: 2 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 0, note: 3 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 0, note: 4 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 0, note: 5 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 0, note: 6 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 0, note: 7 },
		{ id: '1/8', row: 1, column: 8, type: 'noteon', channel: 0, note: 8 },

		// Row 2 - notes 16-24
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 0, note: 16 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 0, note: 17 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 0, note: 18 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 0, note: 19 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 0, note: 20 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 0, note: 21 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 0, note: 22 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 0, note: 23 },
		{ id: '2/8', row: 2, column: 8, type: 'noteon', channel: 0, note: 24 },

		// Row 3 - notes 32-40
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 0, note: 32 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 0, note: 33 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 0, note: 34 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 0, note: 35 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 0, note: 36 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 0, note: 37 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 0, note: 38 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 0, note: 39 },
		{ id: '3/8', row: 3, column: 8, type: 'noteon', channel: 0, note: 40 },

		// Row 4 - notes 48-56
		{ id: '4/0', row: 4, column: 0, type: 'noteon', channel: 0, note: 48 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 0, note: 49 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 0, note: 50 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 0, note: 51 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 0, note: 52 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 0, note: 53 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 0, note: 54 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 0, note: 55 },
		{ id: '4/8', row: 4, column: 8, type: 'noteon', channel: 0, note: 56 },

		// Row 5 - notes 64-72
		{ id: '5/0', row: 5, column: 0, type: 'noteon', channel: 0, note: 64 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', channel: 0, note: 65 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', channel: 0, note: 66 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', channel: 0, note: 67 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', channel: 0, note: 68 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', channel: 0, note: 69 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', channel: 0, note: 70 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', channel: 0, note: 71 },
		{ id: '5/8', row: 5, column: 8, type: 'noteon', channel: 0, note: 72 },

		// Row 6 - notes 80-88
		{ id: '6/0', row: 6, column: 0, type: 'noteon', channel: 0, note: 80 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', channel: 0, note: 81 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', channel: 0, note: 82 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', channel: 0, note: 83 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', channel: 0, note: 84 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', channel: 0, note: 85 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', channel: 0, note: 86 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', channel: 0, note: 87 },
		{ id: '6/8', row: 6, column: 8, type: 'noteon', channel: 0, note: 88 },

		// Row 7 - notes 96-104
		{ id: '7/0', row: 7, column: 0, type: 'noteon', channel: 0, note: 96 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', channel: 0, note: 97 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', channel: 0, note: 98 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', channel: 0, note: 99 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', channel: 0, note: 100 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', channel: 0, note: 101 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', channel: 0, note: 102 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', channel: 0, note: 103 },
		{ id: '7/8', row: 7, column: 8, type: 'noteon', channel: 0, note: 104 },

		// Row 8 - notes 112-120
		{ id: '8/0', row: 8, column: 0, type: 'noteon', channel: 0, note: 112 },
		{ id: '8/1', row: 8, column: 1, type: 'noteon', channel: 0, note: 113 },
		{ id: '8/2', row: 8, column: 2, type: 'noteon', channel: 0, note: 114 },
		{ id: '8/3', row: 8, column: 3, type: 'noteon', channel: 0, note: 115 },
		{ id: '8/4', row: 8, column: 4, type: 'noteon', channel: 0, note: 116 },
		{ id: '8/5', row: 8, column: 5, type: 'noteon', channel: 0, note: 117 },
		{ id: '8/6', row: 8, column: 6, type: 'noteon', channel: 0, note: 118 },
		{ id: '8/7', row: 8, column: 7, type: 'noteon', channel: 0, note: 119 },
		{ id: '8/8', row: 8, column: 8, type: 'noteon', channel: 0, note: 120 },
	],
	extra_buttons: [],
	command_clearPanel: function () {
		return [[0x0b]]
	},
	command_shutdown: function () {
		return [[0x0b]]
	},
	command_writeKeyColour: function (x, y, color) {
		return [0x0f, (x + 1) & 0x7f, (y + 1) & 0x7f, color.r & 0x7f, color.g & 0x7f, color.b & 0x7f]
	},
}

// Works
const NovationLaunchpadProLayout: MidiLayoutDefinition = {
	supportsBrightness: true,
	buttons: [
		// Row 0 - cc 91-98
		{ id: '0/0', row: 0, column: 0, type: 'cc', channel: 0, note: -1 },
		{ id: '0/1', row: 0, column: 1, type: 'cc', channel: 0, note: 91 },
		{ id: '0/2', row: 0, column: 2, type: 'cc', channel: 0, note: 92 },
		{ id: '0/3', row: 0, column: 3, type: 'cc', channel: 0, note: 93 },
		{ id: '0/4', row: 0, column: 4, type: 'cc', channel: 0, note: 94 },
		{ id: '0/5', row: 0, column: 5, type: 'cc', channel: 0, note: 95 },
		{ id: '0/6', row: 0, column: 6, type: 'cc', channel: 0, note: 96 },
		{ id: '0/7', row: 0, column: 7, type: 'cc', channel: 0, note: 97 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', channel: 0, note: 98 },
		{ id: '0/9', row: 0, column: 9, type: 'cc', channel: 0, note: -1 },

		// Row 1 - notes 80-89
		{ id: '1/0', row: 1, column: 0, type: 'cc', channel: 0, note: 80 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 0, note: 81 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 0, note: 82 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 0, note: 83 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 0, note: 84 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 0, note: 85 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 0, note: 86 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 0, note: 87 },
		{ id: '1/8', row: 1, column: 8, type: 'noteon', channel: 0, note: 88 },
		{ id: '1/9', row: 1, column: 9, type: 'cc', channel: 0, note: 89 },

		// Row 2 - notes 70-79
		{ id: '2/0', row: 2, column: 0, type: 'cc', channel: 0, note: 70 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 0, note: 71 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 0, note: 72 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 0, note: 73 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 0, note: 74 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 0, note: 75 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 0, note: 76 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 0, note: 77 },
		{ id: '2/8', row: 2, column: 8, type: 'noteon', channel: 0, note: 78 },
		{ id: '2/9', row: 2, column: 9, type: 'cc', channel: 0, note: 79 },

		// Row 3 - notes 60-69
		{ id: '3/0', row: 3, column: 0, type: 'cc', channel: 0, note: 60 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 0, note: 61 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 0, note: 62 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 0, note: 63 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 0, note: 64 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 0, note: 65 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 0, note: 66 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 0, note: 67 },
		{ id: '3/8', row: 3, column: 8, type: 'noteon', channel: 0, note: 68 },
		{ id: '3/9', row: 3, column: 9, type: 'cc', channel: 0, note: 69 },

		// Row 4 - notes 50-59
		{ id: '4/0', row: 4, column: 0, type: 'cc', channel: 0, note: 50 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 0, note: 51 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 0, note: 52 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 0, note: 53 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 0, note: 54 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 0, note: 55 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 0, note: 56 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 0, note: 57 },
		{ id: '4/8', row: 4, column: 8, type: 'noteon', channel: 0, note: 58 },
		{ id: '4/9', row: 4, column: 9, type: 'cc', channel: 0, note: 59 },

		// Row 5 - notes 40-49
		{ id: '5/0', row: 5, column: 0, type: 'cc', channel: 0, note: 40 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', channel: 0, note: 41 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', channel: 0, note: 42 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', channel: 0, note: 43 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', channel: 0, note: 44 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', channel: 0, note: 45 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', channel: 0, note: 46 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', channel: 0, note: 47 },
		{ id: '5/8', row: 5, column: 8, type: 'noteon', channel: 0, note: 48 },
		{ id: '5/9', row: 5, column: 9, type: 'cc', channel: 0, note: 49 },

		// Row 6 - notes 30-39
		{ id: '6/0', row: 6, column: 0, type: 'cc', channel: 0, note: 30 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', channel: 0, note: 31 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', channel: 0, note: 32 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', channel: 0, note: 33 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', channel: 0, note: 34 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', channel: 0, note: 35 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', channel: 0, note: 36 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', channel: 0, note: 37 },
		{ id: '6/8', row: 6, column: 8, type: 'noteon', channel: 0, note: 38 },
		{ id: '6/9', row: 6, column: 9, type: 'cc', channel: 0, note: 39 },

		// Row 7 - notes 20-29
		{ id: '7/0', row: 7, column: 0, type: 'cc', channel: 0, note: 20 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', channel: 0, note: 21 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', channel: 0, note: 22 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', channel: 0, note: 23 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', channel: 0, note: 24 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', channel: 0, note: 25 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', channel: 0, note: 26 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', channel: 0, note: 27 },
		{ id: '7/8', row: 7, column: 8, type: 'noteon', channel: 0, note: 28 },
		{ id: '7/9', row: 7, column: 9, type: 'cc', channel: 0, note: 29 },

		// Row 8 - notes 10-19
		{ id: '8/0', row: 8, column: 0, type: 'cc', channel: 0, note: 10 },
		{ id: '8/1', row: 8, column: 1, type: 'noteon', channel: 0, note: 11 },
		{ id: '8/2', row: 8, column: 2, type: 'noteon', channel: 0, note: 12 },
		{ id: '8/3', row: 8, column: 3, type: 'noteon', channel: 0, note: 13 },
		{ id: '8/4', row: 8, column: 4, type: 'noteon', channel: 0, note: 14 },
		{ id: '8/5', row: 8, column: 5, type: 'noteon', channel: 0, note: 15 },
		{ id: '8/6', row: 8, column: 6, type: 'noteon', channel: 0, note: 16 },
		{ id: '8/7', row: 8, column: 7, type: 'noteon', channel: 0, note: 17 },
		{ id: '8/8', row: 8, column: 8, type: 'noteon', channel: 0, note: 18 },
		{ id: '8/9', row: 8, column: 9, type: 'cc', channel: 0, note: 19 },

		// Row 9 - notes 1-8
		{ id: '9/0', row: 9, column: 0, type: 'cc', channel: 0, note: -1 },
		{ id: '9/1', row: 9, column: 1, type: 'cc', channel: 0, note: 1 },
		{ id: '9/2', row: 9, column: 2, type: 'cc', channel: 0, note: 2 },
		{ id: '9/3', row: 9, column: 3, type: 'cc', channel: 0, note: 3 },
		{ id: '9/4', row: 9, column: 4, type: 'cc', channel: 0, note: 4 },
		{ id: '9/5', row: 9, column: 5, type: 'cc', channel: 0, note: 5 },
		{ id: '9/6', row: 9, column: 6, type: 'cc', channel: 0, note: 6 },
		{ id: '9/7', row: 9, column: 7, type: 'cc', channel: 0, note: 7 },
		{ id: '9/8', row: 9, column: 8, type: 'cc', channel: 0, note: 8 },
		{ id: '9/9', row: 9, column: 9, type: 'cc', channel: 0, note: -1 },
	],
	extra_buttons: [],
	command_clearPanel: function () {
		// Turn on programmer mode
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0c, 0x0e, 0x01, 0xf7]]
	},
	command_shutdown: function () {
		// Turn programmer mode off to reset?
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0c, 0x0e, 0x00, 0xf7]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button || button.note === -1) return []
		return [
			0xf0,
			0x00,
			0x20,
			0x29,
			0x02,
			0x10,
			0x0b,
			button.note & 0x7f,
			Math.floor(color.r / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			Math.floor(color.g / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			Math.floor(color.b / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			0xf7,
		]
	},
	isColorTooBlack: function (color) {
		return Math.floor(color.r / 32) === 0 && Math.floor(color.g / 32) === 0 && Math.floor(color.b / 32) === 0
	},
}

// Works
const NovationLaunchpadMK2Layout: MidiLayoutDefinition = {
	...NovationLaunchpadProLayout,
	buttons: [
		// Row 0 - cc 91-99
		{ id: '0/0', row: 0, column: 0, type: 'cc', channel: 0, note: 104 },
		{ id: '0/1', row: 0, column: 1, type: 'cc', channel: 0, note: 105 },
		{ id: '0/2', row: 0, column: 2, type: 'cc', channel: 0, note: 106 },
		{ id: '0/3', row: 0, column: 3, type: 'cc', channel: 0, note: 107 },
		{ id: '0/4', row: 0, column: 4, type: 'cc', channel: 0, note: 108 },
		{ id: '0/5', row: 0, column: 5, type: 'cc', channel: 0, note: 109 },
		{ id: '0/6', row: 0, column: 6, type: 'cc', channel: 0, note: 110 },
		{ id: '0/7', row: 0, column: 7, type: 'cc', channel: 0, note: 111 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', channel: 0, note: -1 },

		// Row 1 - notes 81-89
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 0, note: 81 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 0, note: 82 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 0, note: 83 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 0, note: 84 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 0, note: 85 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 0, note: 86 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 0, note: 87 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 0, note: 88 },
		{ id: '1/8', row: 1, column: 8, type: 'noteon', channel: 0, note: 89 },

		// Row 2 - notes 71-79
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 0, note: 71 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 0, note: 72 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 0, note: 73 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 0, note: 74 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 0, note: 75 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 0, note: 76 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 0, note: 77 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 0, note: 78 },
		{ id: '2/8', row: 2, column: 8, type: 'noteon', channel: 0, note: 79 },

		// Row 3 - notes 61-69
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 0, note: 61 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 0, note: 62 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 0, note: 63 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 0, note: 64 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 0, note: 65 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 0, note: 66 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 0, note: 67 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 0, note: 68 },
		{ id: '3/8', row: 3, column: 8, type: 'noteon', channel: 0, note: 69 },

		// Row 4 - notes 51-59
		{ id: '4/0', row: 4, column: 0, type: 'noteon', channel: 0, note: 51 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 0, note: 52 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 0, note: 53 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 0, note: 54 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 0, note: 55 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 0, note: 56 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 0, note: 57 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 0, note: 58 },
		{ id: '4/8', row: 4, column: 8, type: 'noteon', channel: 0, note: 59 },

		// Row 5 - notes 41-49
		{ id: '5/0', row: 5, column: 0, type: 'noteon', channel: 0, note: 41 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', channel: 0, note: 42 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', channel: 0, note: 43 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', channel: 0, note: 44 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', channel: 0, note: 45 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', channel: 0, note: 46 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', channel: 0, note: 47 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', channel: 0, note: 48 },
		{ id: '5/8', row: 5, column: 8, type: 'noteon', channel: 0, note: 49 },

		// Row 6 - notes 31-39
		{ id: '6/0', row: 6, column: 0, type: 'noteon', channel: 0, note: 31 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', channel: 0, note: 32 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', channel: 0, note: 33 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', channel: 0, note: 34 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', channel: 0, note: 35 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', channel: 0, note: 36 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', channel: 0, note: 37 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', channel: 0, note: 38 },
		{ id: '6/8', row: 6, column: 8, type: 'noteon', channel: 0, note: 39 },

		// Row 7 - notes 21-29
		{ id: '7/0', row: 7, column: 0, type: 'noteon', channel: 0, note: 21 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', channel: 0, note: 22 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', channel: 0, note: 23 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', channel: 0, note: 24 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', channel: 0, note: 25 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', channel: 0, note: 26 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', channel: 0, note: 27 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', channel: 0, note: 28 },
		{ id: '7/8', row: 7, column: 8, type: 'noteon', channel: 0, note: 29 },

		// Row 8 - notes 11-19
		{ id: '8/0', row: 8, column: 0, type: 'noteon', channel: 0, note: 11 },
		{ id: '8/1', row: 8, column: 1, type: 'noteon', channel: 0, note: 12 },
		{ id: '8/2', row: 8, column: 2, type: 'noteon', channel: 0, note: 13 },
		{ id: '8/3', row: 8, column: 3, type: 'noteon', channel: 0, note: 14 },
		{ id: '8/4', row: 8, column: 4, type: 'noteon', channel: 0, note: 15 },
		{ id: '8/5', row: 8, column: 5, type: 'noteon', channel: 0, note: 16 },
		{ id: '8/6', row: 8, column: 6, type: 'noteon', channel: 0, note: 17 },
		{ id: '8/7', row: 8, column: 7, type: 'noteon', channel: 0, note: 18 },
		{ id: '8/8', row: 8, column: 8, type: 'noteon', channel: 0, note: 19 },
	],
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button || button.note === -1) return []
		return [
			0xf0,
			0x00,
			0x20,
			0x29,
			0x02,
			0x18,
			0x0b,
			button.note & 0x7f,
			Math.floor(color.r / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			Math.floor(color.g / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			Math.floor(color.b / 4) & 0x3f, // 0 to 64 instead of 0 to 255 -> 255 / 4 = 64
			0xf7,
		]
	},
}

///////////////////////////////
// Launchpad MK3 collection: //
///////////////////////////////

// TODO still needs testing
const NovationLaunchpadXMK3Layout: MidiLayoutDefinition = {
	...NovationLaunchpadProLayout, // Same clearPanel and shutdown functions!
	buttons: [
		// Row 0 - cc 91-99
		{ id: '0/0', row: 0, column: 0, type: 'cc', channel: 0, note: 91 },
		{ id: '0/1', row: 0, column: 1, type: 'cc', channel: 0, note: 92 },
		{ id: '0/2', row: 0, column: 2, type: 'cc', channel: 0, note: 93 },
		{ id: '0/3', row: 0, column: 3, type: 'cc', channel: 0, note: 94 },
		{ id: '0/4', row: 0, column: 4, type: 'cc', channel: 0, note: 95 },
		{ id: '0/5', row: 0, column: 5, type: 'cc', channel: 0, note: 96 },
		{ id: '0/6', row: 0, column: 6, type: 'cc', channel: 0, note: 97 },
		{ id: '0/7', row: 0, column: 7, type: 'cc', channel: 0, note: 98 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', channel: 0, note: 99 },

		// Row 1 - notes 81-89
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 0, note: 81 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 0, note: 82 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 0, note: 83 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 0, note: 84 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 0, note: 85 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 0, note: 86 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 0, note: 87 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 0, note: 88 },
		{ id: '1/8', row: 1, column: 8, type: 'cc', channel: 0, note: 89 },

		// Row 2 - notes 16-24
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 0, note: 71 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 0, note: 72 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 0, note: 73 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 0, note: 74 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 0, note: 75 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 0, note: 76 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 0, note: 77 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 0, note: 78 },
		{ id: '2/8', row: 2, column: 8, type: 'cc', channel: 0, note: 79 },

		// Row 3 - notes 32-40
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 0, note: 61 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 0, note: 62 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 0, note: 63 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 0, note: 64 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 0, note: 65 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 0, note: 66 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 0, note: 67 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 0, note: 68 },
		{ id: '3/8', row: 3, column: 8, type: 'cc', channel: 0, note: 69 },

		// Row 4 - notes 48-56
		{ id: '4/0', row: 4, column: 0, type: 'noteon', channel: 0, note: 51 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 0, note: 52 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 0, note: 53 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 0, note: 54 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 0, note: 55 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 0, note: 56 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 0, note: 57 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 0, note: 58 },
		{ id: '4/8', row: 4, column: 8, type: 'cc', channel: 0, note: 59 },

		// Row 5 - notes 64-72
		{ id: '5/0', row: 5, column: 0, type: 'noteon', channel: 0, note: 41 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', channel: 0, note: 42 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', channel: 0, note: 43 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', channel: 0, note: 44 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', channel: 0, note: 45 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', channel: 0, note: 46 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', channel: 0, note: 47 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', channel: 0, note: 48 },
		{ id: '5/8', row: 5, column: 8, type: 'cc', channel: 0, note: 49 },

		// Row 6 - notes 80-88
		{ id: '6/0', row: 6, column: 0, type: 'noteon', channel: 0, note: 31 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', channel: 0, note: 32 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', channel: 0, note: 33 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', channel: 0, note: 34 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', channel: 0, note: 35 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', channel: 0, note: 36 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', channel: 0, note: 37 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', channel: 0, note: 38 },
		{ id: '6/8', row: 6, column: 8, type: 'cc', channel: 0, note: 39 },

		// Row 7 - notes 96-104
		{ id: '7/0', row: 7, column: 0, type: 'noteon', channel: 0, note: 21 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', channel: 0, note: 22 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', channel: 0, note: 23 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', channel: 0, note: 24 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', channel: 0, note: 25 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', channel: 0, note: 26 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', channel: 0, note: 27 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', channel: 0, note: 28 },
		{ id: '7/8', row: 7, column: 8, type: 'cc', channel: 0, note: 29 },

		// Row 8 - notes 112-120
		{ id: '8/0', row: 8, column: 0, type: 'noteon', channel: 0, note: 11 },
		{ id: '8/1', row: 8, column: 1, type: 'noteon', channel: 0, note: 12 },
		{ id: '8/2', row: 8, column: 2, type: 'noteon', channel: 0, note: 13 },
		{ id: '8/3', row: 8, column: 3, type: 'noteon', channel: 0, note: 14 },
		{ id: '8/4', row: 8, column: 4, type: 'noteon', channel: 0, note: 15 },
		{ id: '8/5', row: 8, column: 5, type: 'noteon', channel: 0, note: 16 },
		{ id: '8/6', row: 8, column: 6, type: 'noteon', channel: 0, note: 17 },
		{ id: '8/7', row: 8, column: 7, type: 'noteon', channel: 0, note: 18 },
		{ id: '8/8', row: 8, column: 8, type: 'cc', channel: 0, note: 19 },
	],
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button || button.note === -1) return []
		return [
			0xf0,
			0x00,
			0x20,
			0x29,
			0x02,
			0x0c,
			0x03,
			0x03, // lighting type 3 is RGB
			button.note & 0x7f,
			Math.floor(color.r / 2) & 0x7f,
			Math.floor(color.g / 2) & 0x7f,
			Math.floor(color.b / 2) & 0x7f,
			0xf7,
		] // There's a chance this might work

		// const lpColorIndex = getClosestLpColor(color)
		// return [(button.type === 'noteon' ? 0x90 : 0xb0) | (button.channel & 0x0f), button.note & 0x7f, lpColorIndex & 0x7f]
	},
}

/*
// TODO still needs testing
const NovationLaunchpadProMK3Layout: MidiLayoutDefinition = {
	...NovationLaunchpadXMK3Layout, // I DONT KNOW
	command_clearPanel: function () {
		// Turn on programmer mode
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0e, 0x00, 0x11, 0x00, 0x00, 0xf7]]
	},
	command_shutdown: function () {
		// Turn programmer mode off to reset?
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0e, 0x0e, 0x00, 0x00, 0x00, 0xf7]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button || button.note === -1) return []
		return [
			0xf0,
			0x00,
			0x20,
			0x29,
			0x02,
			0x0e,
			0x03,
			0x03, // lighting type 3 is RGB
			button.note & 0x7f,
			Math.floor(color.r / 2) & 0x7f,
			Math.floor(color.g / 2) & 0x7f,
			Math.floor(color.b / 2) & 0x7f,
			0xf7,
		]
	},
}
*/

// Works
const NovationLaunchpadMiniMK3Layout: MidiLayoutDefinition = {
	...NovationLaunchpadXMK3Layout, // same layout
	command_clearPanel: function () {
		// Turn on programmer mode
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0d, 0x0e, 0x01, 0xf7]]
	},
	command_shutdown: function () {
		// Turn programmer mode off to reset?
		return [[0xf0, 0x00, 0x20, 0x29, 0x02, 0x0d, 0x0e, 0x00, 0xf7]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button || button.note === -1) return []
		return [
			0xf0,
			0x00,
			0x20,
			0x29,
			0x02,
			0x0d,
			0x03,
			0x03, // lighting type 3 is RGB
			button.note & 0x7f,
			Math.floor(color.r / 2) & 0x7f,
			Math.floor(color.g / 2) & 0x7f,
			Math.floor(color.b / 2) & 0x7f,
			0xf7,
		]
	},
}

///////////////////////////////
// Launchkey MK3 collection: //
///////////////////////////////

// Works
const NovationLaunchkeyMiniMK3Layout: MidiLayoutDefinition = {
	supportsBrightness: false, // Colors are limited, most of them will become just black when allowing brightness, so we say we don't support it.
	canChangePage: { label: 'Shift+Arp and Shift+FixedChord change Page' },
	buttons: [
		// Row 1 - notes 0-8 plus ">" button
		{ id: '0/0', row: 0, column: 0, type: 'noteon', channel: 9, note: 40 },
		{ id: '0/1', row: 0, column: 1, type: 'noteon', channel: 9, note: 41 },
		{ id: '0/2', row: 0, column: 2, type: 'noteon', channel: 9, note: 42 },
		{ id: '0/3', row: 0, column: 3, type: 'noteon', channel: 9, note: 43 },
		{ id: '0/4', row: 0, column: 4, type: 'noteon', channel: 9, note: 48 },
		{ id: '0/5', row: 0, column: 5, type: 'noteon', channel: 9, note: 49 },
		{ id: '0/6', row: 0, column: 6, type: 'noteon', channel: 9, note: 50 },
		{ id: '0/7', row: 0, column: 7, type: 'noteon', channel: 9, note: 51 },
		{ id: '0/8', row: 0, column: 8, type: 'cc', channel: 0, note: 104 },

		// Row 2 - notes 9-16 plus "Stop/Solo/Mute" button
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 9, note: 36 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 9, note: 37 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 9, note: 38 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 9, note: 39 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 9, note: 44 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 9, note: 45 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 9, note: 46 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 9, note: 47 },
		{ id: '1/8', row: 1, column: 8, type: 'cc', channel: 0, note: 105 },

		// Row 0 - pots 0-8
		{ id: '2/0', row: 2, column: 0, type: 'cc-encoder', channel: 0, note: 21 },
		{ id: '2/1', row: 2, column: 1, type: 'cc-encoder', channel: 0, note: 22 },
		{ id: '2/2', row: 2, column: 2, type: 'cc-encoder', channel: 0, note: 23 },
		{ id: '2/3', row: 2, column: 3, type: 'cc-encoder', channel: 0, note: 24 },
		{ id: '2/4', row: 2, column: 4, type: 'cc-encoder', channel: 0, note: 25 },
		{ id: '2/5', row: 2, column: 5, type: 'cc-encoder', channel: 0, note: 26 },
		{ id: '2/6', row: 2, column: 6, type: 'cc-encoder', channel: 0, note: 27 },
		{ id: '2/7', row: 2, column: 7, type: 'cc-encoder', channel: 0, note: 28 },
	],
	extra_buttons: [
		{ id: 'page-left', row: -1, column: -1, type: 'cc', channel: 15, note: 103 },
		{ id: 'page-right', row: -1, column: -1, type: 'cc', channel: 15, note: 102 },
	],
	command_clearPanel: function () {
		return [
			// Turn DAW mode off to reset
			[0x90 | (15 & 0x0f), 12, 0],
			// Turn DAW mode back on
			[0x90 | (15 & 0x0f), 12, 127],
			// Set pots mode to Device
			[0xb0 | (15 & 0x0f), 9, 2],
		]
	},
	command_shutdown: function () {
		// Turn DAW mode off to reset
		return [[0x90 | (15 & 0x0f), 12, 0]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button) return []

		const lpColorIndex = getClosestLpColor(color)
		return [(button.type === 'noteon' ? 0x90 : 0xb0) | (button.channel & 0x0f), button.note & 0x7f, lpColorIndex & 0x7f]
	},
	isColorTooBlack: function (color) {
		return getClosestLpColor(color) === 0
	},
}

const AkaiAPCMiniMK2Layout: MidiLayoutDefinition = {
	// https://cdn.inmusicbrands.com/akai/attachments/APC%20mini%20mk2%20-%20Communication%20Protocol%20-%20v1.0.pdf
	supportsBrightness: true, // Brightness for preset colors would be done using the channel number: 0 = 10%, 1 = 25%, 2 = 50%, 3 = 65%, 4 = 75%, 5 = 90%, 6 = 100% but we have full RGB
	canChangePage: { label: 'Track button 7 & 8 (arrow left and right) change Page' },
	buttons: [
		// Row 1
		{ id: '0/0', row: 0, column: 0, type: 'noteon', channel: 6, note: 56 },
		{ id: '0/1', row: 0, column: 1, type: 'noteon', channel: 6, note: 57 },
		{ id: '0/2', row: 0, column: 2, type: 'noteon', channel: 6, note: 58 },
		{ id: '0/3', row: 0, column: 3, type: 'noteon', channel: 6, note: 59 },
		{ id: '0/4', row: 0, column: 4, type: 'noteon', channel: 6, note: 60 },
		{ id: '0/5', row: 0, column: 5, type: 'noteon', channel: 6, note: 61 },
		{ id: '0/6', row: 0, column: 6, type: 'noteon', channel: 6, note: 62 },
		{ id: '0/7', row: 0, column: 7, type: 'noteon', channel: 6, note: 63 },

		// Row 2
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 6, note: 48 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 6, note: 49 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 6, note: 50 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 6, note: 51 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 6, note: 52 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 6, note: 53 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 6, note: 54 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 6, note: 55 },

		// Row 3
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 6, note: 40 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 6, note: 41 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 6, note: 42 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 6, note: 43 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 6, note: 44 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 6, note: 45 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 6, note: 46 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 6, note: 47 },

		// Row 4
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 6, note: 32 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 6, note: 33 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 6, note: 34 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 6, note: 35 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 6, note: 36 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 6, note: 37 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 6, note: 38 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 6, note: 39 },

		// Row 5
		{ id: '4/0', row: 4, column: 0, type: 'noteon', channel: 6, note: 24 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 6, note: 25 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 6, note: 26 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 6, note: 27 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 6, note: 28 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 6, note: 29 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 6, note: 30 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 6, note: 31 },

		// Row 6
		{ id: '5/0', row: 5, column: 0, type: 'noteon', channel: 6, note: 16 },
		{ id: '5/1', row: 5, column: 1, type: 'noteon', channel: 6, note: 17 },
		{ id: '5/2', row: 5, column: 2, type: 'noteon', channel: 6, note: 18 },
		{ id: '5/3', row: 5, column: 3, type: 'noteon', channel: 6, note: 19 },
		{ id: '5/4', row: 5, column: 4, type: 'noteon', channel: 6, note: 20 },
		{ id: '5/5', row: 5, column: 5, type: 'noteon', channel: 6, note: 21 },
		{ id: '5/6', row: 5, column: 6, type: 'noteon', channel: 6, note: 22 },
		{ id: '5/7', row: 5, column: 7, type: 'noteon', channel: 6, note: 23 },

		// Row 7
		{ id: '6/0', row: 6, column: 0, type: 'noteon', channel: 6, note: 8 },
		{ id: '6/1', row: 6, column: 1, type: 'noteon', channel: 6, note: 9 },
		{ id: '6/2', row: 6, column: 2, type: 'noteon', channel: 6, note: 10 },
		{ id: '6/3', row: 6, column: 3, type: 'noteon', channel: 6, note: 11 },
		{ id: '6/4', row: 6, column: 4, type: 'noteon', channel: 6, note: 12 },
		{ id: '6/5', row: 6, column: 5, type: 'noteon', channel: 6, note: 13 },
		{ id: '6/6', row: 6, column: 6, type: 'noteon', channel: 6, note: 14 },
		{ id: '6/7', row: 6, column: 7, type: 'noteon', channel: 6, note: 15 },

		// Row 8
		{ id: '7/0', row: 7, column: 0, type: 'noteon', channel: 6, note: 0 },
		{ id: '7/1', row: 7, column: 1, type: 'noteon', channel: 6, note: 1 },
		{ id: '7/2', row: 7, column: 2, type: 'noteon', channel: 6, note: 2 },
		{ id: '7/3', row: 7, column: 3, type: 'noteon', channel: 6, note: 3 },
		{ id: '7/4', row: 7, column: 4, type: 'noteon', channel: 6, note: 4 },
		{ id: '7/5', row: 7, column: 5, type: 'noteon', channel: 6, note: 5 },
		{ id: '7/6', row: 7, column: 6, type: 'noteon', channel: 6, note: 6 },
		{ id: '7/7', row: 7, column: 7, type: 'noteon', channel: 6, note: 7 },
	],
	extra_buttons: [
		{ id: 'page-left', row: -1, column: -1, type: 'noteon', channel: 0, note: 0x6a },
		{ id: 'page-right', row: -1, column: -1, type: 'noteon', channel: 0, note: 0x6b },
	],
	command_clearPanel: function () {
		// 												   0x41, 0x09, 0x01, 0x04 ???
		return [[0xf0, 0x47, 0x7f, 0x4f, 0x60, 0x00, 0x04, 0x00, 0x01, 0x00, 0x00, 0xf7]]
	},
	command_shutdown: function () {
		return [] // Unsure what to do here
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button) return []

		return [
			0xf0,
			0x47,
			0x7f,
			0x4f,
			0x24,

			(8 >> 7) & 0x01, // 8 bytes to follow
			8 & 0x7f,

			button.note & 0x3f, // from
			button.note & 0x3f, // to
			(color.r >> 7) & 0x01, // MSB
			color.r & 0x7f, // LSB
			(color.g >> 7) & 0x01,
			color.g & 0x7f,
			(color.b >> 7) & 0x01,
			color.b & 0x7f,

			0xf7,
		]
	},
	isColorTooBlack: function (color) {
		return Math.floor(color.r / 32) === 0 && Math.floor(color.g / 32) === 0 && Math.floor(color.b / 32) === 0
	},
}

const AkaiAPCMiniLayout: MidiLayoutDefinition = {
	// https://cdn.inmusicbrands.com/akai/apc-mini/APC%20mini%20-%20User%20Guide%20-%20v1.0.pdf_079659375431bb679d17071da25ad6af.pdf ??
	...AkaiAPCMiniMK2Layout,
	supportsBrightness: false, // NOPE, theres only 3 colors!!!
	canChangePage: {
		label:
			'Track buttons 3 & 4 (arrow left and right) change Page ---- NOTE about controller: only Green, Red and Yellow colors are available on this controller!',
	},
	extra_buttons: [
		{ id: 'page-left', row: -1, column: -1, type: 'noteon', channel: 0, note: 66 },
		{ id: 'page-right', row: -1, column: -1, type: 'noteon', channel: 0, note: 67 },
	],
	command_clearPanel: function () {
		return [[]]
	},
	command_shutdown: function () {
		return [[]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button) return []

		const lpColorIndex = getClosestApcMiniColor(color) // There's only three colors!
		return [(button.type === 'noteon' ? 0x90 : 0xb0) | (button.channel & 0x0f), button.note & 0x7f, lpColorIndex & 0x7f]
	},
	isColorTooBlack: function (color) {
		return getClosestApcMiniColor(color) === 0
	},
}

const AkaiAPC40MK2Layout: MidiLayoutDefinition = {
	// https://cdn.inmusicbrands.com/akai/attachments/apc40II/APC40Mk2_Communications_Protocol_v1.2.pdf
	...AkaiAPCMiniLayout,
	supportsBrightness: false, // NOPE, requires different channel
	canChangePage: {
		label: 'Bank left and right change Page',
	},
	buttons: [
		// Row 1
		{ id: '0/0', row: 0, column: 0, type: 'noteon', channel: 0, note: 32 },
		{ id: '0/1', row: 0, column: 1, type: 'noteon', channel: 0, note: 33 },
		{ id: '0/2', row: 0, column: 2, type: 'noteon', channel: 0, note: 34 },
		{ id: '0/3', row: 0, column: 3, type: 'noteon', channel: 0, note: 35 },
		{ id: '0/4', row: 0, column: 4, type: 'noteon', channel: 0, note: 36 },
		{ id: '0/5', row: 0, column: 5, type: 'noteon', channel: 0, note: 37 },
		{ id: '0/6', row: 0, column: 6, type: 'noteon', channel: 0, note: 38 },
		{ id: '0/7', row: 0, column: 7, type: 'noteon', channel: 0, note: 39 },

		// Row 2
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 0, note: 24 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 0, note: 25 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 0, note: 26 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 0, note: 27 },
		{ id: '1/4', row: 1, column: 4, type: 'noteon', channel: 0, note: 28 },
		{ id: '1/5', row: 1, column: 5, type: 'noteon', channel: 0, note: 29 },
		{ id: '1/6', row: 1, column: 6, type: 'noteon', channel: 0, note: 30 },
		{ id: '1/7', row: 1, column: 7, type: 'noteon', channel: 0, note: 31 },

		// Row 3
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 0, note: 16 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 0, note: 17 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 0, note: 18 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 0, note: 19 },
		{ id: '2/4', row: 2, column: 4, type: 'noteon', channel: 0, note: 20 },
		{ id: '2/5', row: 2, column: 5, type: 'noteon', channel: 0, note: 21 },
		{ id: '2/6', row: 2, column: 6, type: 'noteon', channel: 0, note: 22 },
		{ id: '2/7', row: 2, column: 7, type: 'noteon', channel: 0, note: 23 },

		// Row 4
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 0, note: 8 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 0, note: 9 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 0, note: 10 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 0, note: 11 },
		{ id: '3/4', row: 3, column: 4, type: 'noteon', channel: 0, note: 12 },
		{ id: '3/5', row: 3, column: 5, type: 'noteon', channel: 0, note: 13 },
		{ id: '3/6', row: 3, column: 6, type: 'noteon', channel: 0, note: 14 },
		{ id: '3/7', row: 3, column: 7, type: 'noteon', channel: 0, note: 15 },

		// Row 5
		{ id: '4/0', row: 4, column: 0, type: 'noteon', channel: 0, note: 0 },
		{ id: '4/1', row: 4, column: 1, type: 'noteon', channel: 0, note: 1 },
		{ id: '4/2', row: 4, column: 2, type: 'noteon', channel: 0, note: 2 },
		{ id: '4/3', row: 4, column: 3, type: 'noteon', channel: 0, note: 3 },
		{ id: '4/4', row: 4, column: 4, type: 'noteon', channel: 0, note: 4 },
		{ id: '4/5', row: 4, column: 5, type: 'noteon', channel: 0, note: 5 },
		{ id: '4/6', row: 4, column: 6, type: 'noteon', channel: 0, note: 6 },
		{ id: '4/7', row: 4, column: 7, type: 'noteon', channel: 0, note: 7 },
	],
	extra_buttons: [
		{ id: 'page-left', row: -1, column: -1, type: 'noteon', channel: 0, note: 0x3c },
		{ id: 'page-right', row: -1, column: -1, type: 'noteon', channel: 0, note: 0x3d },
	],
	command_clearPanel: function () {
		const deviceId = 0
		// 0x41 = Ableton mode
		return [[0xf0, 0x47, deviceId, 0x29, 0x60, 0x00, 0x04, 0x41, 0x01, 0x00, 0x00, 0xf7]]
	},
	command_shutdown: function () {
		return [[]]
	},
	command_writeKeyColour: function (x, y, color) {
		const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		if (!button) return []

		const lpColorIndex = getClosestApcColor(color) // There's only three colors!
		return [(button.type === 'noteon' ? 0x90 : 0xb0) | (button.channel & 0x0f), button.note & 0x7f, lpColorIndex & 0x7f]
	},
	isColorTooBlack: function (color) {
		return getClosestApcColor(color) === 0
	},
}

const AkaiMpkMiniMk3Layout: MidiLayoutDefinition = {
	supportsBrightness: false, // doesn't even support color...
	buttons: [
		// Bank B - Row 1
		{ id: '0/0', row: 0, column: 0, type: 'noteon', channel: 9, note: 48 },
		{ id: '0/1', row: 0, column: 1, type: 'noteon', channel: 9, note: 49 },
		{ id: '0/2', row: 0, column: 2, type: 'noteon', channel: 9, note: 50 },
		{ id: '0/3', row: 0, column: 3, type: 'noteon', channel: 9, note: 51 },
		// Bank B - Row 2
		{ id: '1/0', row: 1, column: 0, type: 'noteon', channel: 9, note: 44 },
		{ id: '1/1', row: 1, column: 1, type: 'noteon', channel: 9, note: 45 },
		{ id: '1/2', row: 1, column: 2, type: 'noteon', channel: 9, note: 46 },
		{ id: '1/3', row: 1, column: 3, type: 'noteon', channel: 9, note: 47 },

		// Bank A - Row 1
		{ id: '2/0', row: 2, column: 0, type: 'noteon', channel: 9, note: 40 },
		{ id: '2/1', row: 2, column: 1, type: 'noteon', channel: 9, note: 41 },
		{ id: '2/2', row: 2, column: 2, type: 'noteon', channel: 9, note: 42 },
		{ id: '2/3', row: 2, column: 3, type: 'noteon', channel: 9, note: 43 },
		// Bank A - Row 2
		{ id: '3/0', row: 3, column: 0, type: 'noteon', channel: 9, note: 36 },
		{ id: '3/1', row: 3, column: 1, type: 'noteon', channel: 9, note: 37 },
		{ id: '3/2', row: 3, column: 2, type: 'noteon', channel: 9, note: 38 },
		{ id: '3/3', row: 3, column: 3, type: 'noteon', channel: 9, note: 39 },
	],
	extra_buttons: [],
	command_clearPanel: function () {
		return [[]]
	},
	command_shutdown: function () {
		return [[]]
	},
	command_writeKeyColour: function (_x, _y, _color) {
		// Only being red... and cannot seem to color any surface...
		return []
		// const button = this.buttons.find((btn) => btn.row === y && btn.column === x)
		// if (!button) return []
		// const colorIndex = color.r + color.g + color.g === 0 ? 0 : 0x7f
		// return [(button.type === 'noteon' ? 0x90 : 0xb0) | (button.channel & 0x0f), button.note & 0x7f, colorIndex]
	},
}

export const DeviceMappings: { [input: string]: { outputName?: string; layout?: MidiLayoutDefinition } } = {
	// Launchpad Mini MK2
	// - Linux:
	'/Launchpad Mini:Launchpad Mini MIDI 1 ([0-9]+):0/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadMiniLayoutTest,
	},

	// Launchpad Pro MK2
	// - Linux:
	'/Launchpad Pro:Launchpad Pro Live Port ([0-9]+):0/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadProLayout,
	},
	// - Windows:
	'Launchpad Pro': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadProLayout,
	},

	// Launchpad MK2
	// - Linux:
	'/Launchpad MK2:Launchpad MK2 MIDI 1 ([0-9]+):0/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadMK2Layout,
	},
	// - Windows:
	'Launchpad MK2': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadMK2Layout,
	},

	// Launchpad Mini MK3
	// - Linux:
	'/Launchpad Mini MK3:Launchpad Mini MK3 LPMiniMK3 MI ([0-9]+):1/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadMiniMK3Layout,
	},
	// - Windows:
	'LPMiniMK3 MIDI': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchpadMiniMK3Layout,
	},

	// Launchpad Pro MK3
	// - Windows:
	// '???': {
	// 	outputName: '???',
	// 	layout: NovationLaunchpadProMK3Layout,
	// },

	// Launchpad X MK3
	// - Windows:
	'LPX MIDI': {
		outputName: undefined,
		layout: NovationLaunchpadXMK3Layout,
	},

	// Launchkey Mini MK3
	// - Linux:
	'/Launchkey Mini MK3:Launchkey Mini MK3 MIDI 2 ([0-9]+):1/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchkeyMiniMK3Layout,
	},
	'/Launchkey Mini MK3:Launchkey Mini MK3 Launchkey Mi ([0-9]+):1/': {
		outputName: undefined, // Uses same name as input
		layout: NovationLaunchkeyMiniMK3Layout,
	},
	// - Windows:
	'/MIDIIN2 \\((Launchkey .* MK3)\\)/': {
		outputName: 'MIDIOUT2 ($1)',
		layout: NovationLaunchkeyMiniMK3Layout,
	},

	// Akai APC Mini
	// - Linux:
	'/APC MINI:APC MINI MIDI 1 ([0-9]+):0/': {
		outputName: undefined, // Uses same name as input
		layout: AkaiAPCMiniLayout,
	},
	// - Windows:
	'APC MINI': {
		outputName: undefined, // Uses same name as input
		layout: AkaiAPCMiniLayout,
	},

	// Akai APC Mini MK2
	// - Linux: Unsure if this is try or not, but at least it comes close?
	// '/APC MINI:APC mini mk2 MIDI 1 ([0-9]+):0/': {
	// 	outputName: undefined, // Uses same name as input
	// 	layout: AkaiAPCMiniLayout,
	// },
	// - Windows:
	'APC mini mk2': {
		outputName: undefined, // Uses same name as input
		layout: AkaiAPCMiniMK2Layout,
	},

	// Akai APC 40 mk2
	// - Windows:
	'APC40 mkII': {
		outputName: undefined, // Uses same name as input
		layout: AkaiAPC40MK2Layout,
	},

	// Akai LPD8 MK2
	// - Windows:
	'LPD8 mk2': {
		outputName: undefined, // Uses same name as input
		layout: undefined,
	},

	// Akai MPK Mini MK3
	// - Windows and Fedora:
	'MPK mini 3': {
		outputName: undefined, // Uses same name as input
		layout: AkaiMpkMiniMk3Layout,
	},
}

export const DeviceMappingsWithRegex: { regex: RegExp; name: string }[] = Object.keys(DeviceMappings)
	.map((name) => {
		// Only include regex'ed port names, skip the rest:
		if (!(name.startsWith('/') && name.endsWith('/'))) return undefined
		try {
			// Make sure to match the WHOLE string, instead of doing a contains, by adding the ^ and $ and the m flag
			return { regex: new RegExp('^' + name.substring(1, name.length - 1) + '$', 'm'), name }
		} catch (e) {
			console.error('Regex failure for "' + name + '". error being:', e)
			return undefined
		}
	})
	.filter((obj) => obj !== undefined)
