export interface MidiLayoutDefinition {
	buttons: MidiButtonDefinition[]
}

export interface MidiButtonDefinition {
	id: string

	row: number
	column: number

	type: 'noteon' | 'cc'
	note: number
}

// TODO - this should be moved to a json schema..
export const NovationLaunchpadLayoutTest: MidiLayoutDefinition = {
	buttons: [
		// Row 0 - cc 104-112
		{ id: '0x0', row: 0, column: 0, type: 'cc', note: 104 },
		{ id: '0x1', row: 0, column: 1, type: 'cc', note: 105 },
		{ id: '0x2', row: 0, column: 2, type: 'cc', note: 106 },
		{ id: '0x3', row: 0, column: 3, type: 'cc', note: 107 },
		{ id: '0x4', row: 0, column: 4, type: 'cc', note: 108 },
		{ id: '0x5', row: 0, column: 5, type: 'cc', note: 109 },
		{ id: '0x6', row: 0, column: 6, type: 'cc', note: 110 },
		{ id: '0x7', row: 0, column: 7, type: 'cc', note: 111 },
		{ id: '0x8', row: 0, column: 8, type: 'cc', note: 112 },

		// Row 1 - notes 0-8
		{ id: '1x0', row: 1, column: 0, type: 'noteon', note: 0 },
		{ id: '1x1', row: 1, column: 1, type: 'noteon', note: 1 },
		{ id: '1x2', row: 1, column: 2, type: 'noteon', note: 2 },
		{ id: '1x3', row: 1, column: 3, type: 'noteon', note: 3 },
		{ id: '1x4', row: 1, column: 4, type: 'noteon', note: 4 },
		{ id: '1x5', row: 1, column: 5, type: 'noteon', note: 5 },
		{ id: '1x6', row: 1, column: 6, type: 'noteon', note: 6 },
		{ id: '1x7', row: 1, column: 7, type: 'noteon', note: 7 },
		{ id: '1x8', row: 1, column: 8, type: 'noteon', note: 8 },

		// Row 2 - notes 16-24
		{ id: '2x0', row: 2, column: 0, type: 'noteon', note: 16 },
		{ id: '2x1', row: 2, column: 1, type: 'noteon', note: 17 },
		{ id: '2x2', row: 2, column: 2, type: 'noteon', note: 18 },
		{ id: '2x3', row: 2, column: 3, type: 'noteon', note: 19 },
		{ id: '2x4', row: 2, column: 4, type: 'noteon', note: 20 },
		{ id: '2x5', row: 2, column: 5, type: 'noteon', note: 21 },
		{ id: '2x6', row: 2, column: 6, type: 'noteon', note: 22 },
		{ id: '2x7', row: 2, column: 7, type: 'noteon', note: 23 },
		{ id: '2x8', row: 2, column: 8, type: 'noteon', note: 24 },

		// Row 3 - notes 32-40
		{ id: '3x0', row: 3, column: 0, type: 'noteon', note: 32 },
		{ id: '3x1', row: 3, column: 1, type: 'noteon', note: 33 },
		{ id: '3x2', row: 3, column: 2, type: 'noteon', note: 34 },
		{ id: '3x3', row: 3, column: 3, type: 'noteon', note: 35 },
		{ id: '3x4', row: 3, column: 4, type: 'noteon', note: 36 },
		{ id: '3x5', row: 3, column: 5, type: 'noteon', note: 37 },
		{ id: '3x6', row: 3, column: 6, type: 'noteon', note: 38 },
		{ id: '3x7', row: 3, column: 7, type: 'noteon', note: 39 },
		{ id: '3x8', row: 3, column: 8, type: 'noteon', note: 40 },

		// Row 4 - notes 48-56
		{ id: '4x0', row: 4, column: 0, type: 'noteon', note: 48 },
		{ id: '4x1', row: 4, column: 1, type: 'noteon', note: 49 },
		{ id: '4x2', row: 4, column: 2, type: 'noteon', note: 50 },
		{ id: '4x3', row: 4, column: 3, type: 'noteon', note: 51 },
		{ id: '4x4', row: 4, column: 4, type: 'noteon', note: 52 },
		{ id: '4x5', row: 4, column: 5, type: 'noteon', note: 53 },
		{ id: '4x6', row: 4, column: 6, type: 'noteon', note: 54 },
		{ id: '4x7', row: 4, column: 7, type: 'noteon', note: 55 },
		{ id: '4x8', row: 4, column: 8, type: 'noteon', note: 56 },

		// Row 5 - notes 64-72
		{ id: '5x0', row: 5, column: 0, type: 'noteon', note: 64 },
		{ id: '5x1', row: 5, column: 1, type: 'noteon', note: 65 },
		{ id: '5x2', row: 5, column: 2, type: 'noteon', note: 66 },
		{ id: '5x3', row: 5, column: 3, type: 'noteon', note: 67 },
		{ id: '5x4', row: 5, column: 4, type: 'noteon', note: 68 },
		{ id: '5x5', row: 5, column: 5, type: 'noteon', note: 69 },
		{ id: '5x6', row: 5, column: 6, type: 'noteon', note: 70 },
		{ id: '5x7', row: 5, column: 7, type: 'noteon', note: 71 },
		{ id: '5x8', row: 5, column: 8, type: 'noteon', note: 72 },

		// Row 6 - notes 80-88
		{ id: '6x0', row: 6, column: 0, type: 'noteon', note: 80 },
		{ id: '6x1', row: 6, column: 1, type: 'noteon', note: 81 },
		{ id: '6x2', row: 6, column: 2, type: 'noteon', note: 82 },
		{ id: '6x3', row: 6, column: 3, type: 'noteon', note: 83 },
		{ id: '6x4', row: 6, column: 4, type: 'noteon', note: 84 },
		{ id: '6x5', row: 6, column: 5, type: 'noteon', note: 85 },
		{ id: '6x6', row: 6, column: 6, type: 'noteon', note: 86 },
		{ id: '6x7', row: 6, column: 7, type: 'noteon', note: 87 },
		{ id: '6x8', row: 6, column: 8, type: 'noteon', note: 88 },

		// Row 7 - notes 96-104
		{ id: '7x0', row: 7, column: 0, type: 'noteon', note: 96 },
		{ id: '7x1', row: 7, column: 1, type: 'noteon', note: 97 },
		{ id: '7x2', row: 7, column: 2, type: 'noteon', note: 98 },
		{ id: '7x3', row: 7, column: 3, type: 'noteon', note: 99 },
		{ id: '7x4', row: 7, column: 4, type: 'noteon', note: 100 },
		{ id: '7x5', row: 7, column: 5, type: 'noteon', note: 101 },
		{ id: '7x6', row: 7, column: 6, type: 'noteon', note: 102 },
		{ id: '7x7', row: 7, column: 7, type: 'noteon', note: 103 },
		{ id: '7x8', row: 7, column: 8, type: 'noteon', note: 104 },

		// Row 8 - notes 112-120
		{ id: '8x0', row: 8, column: 0, type: 'noteon', note: 112 },
		{ id: '8x1', row: 8, column: 1, type: 'noteon', note: 113 },
		{ id: '8x2', row: 8, column: 2, type: 'noteon', note: 114 },
		{ id: '8x3', row: 8, column: 3, type: 'noteon', note: 115 },
		{ id: '8x4', row: 8, column: 4, type: 'noteon', note: 116 },
		{ id: '8x5', row: 8, column: 5, type: 'noteon', note: 117 },
		{ id: '8x6', row: 8, column: 6, type: 'noteon', note: 118 },
		{ id: '8x7', row: 8, column: 7, type: 'noteon', note: 119 },
		{ id: '8x8', row: 8, column: 8, type: 'noteon', note: 120 },
	],
}
