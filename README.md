# companion-surface-midi

~~This is a POC, and is not a finished or usable module. It is testing out some ideas on how a module could look, and could become the groundwork for a usable module.~~  
This is a somwhat usable module.

~~In its current state it is able to work with a novation launchpad mini, translating it to a sensible layout. But it does not handle disconnection or reconnection, button rgb or anything more.~~  
In its current state it is able to work with a Novation Launchpad MK2, Novation Launchpad Pro, Novation Launchpad X???, Novation Launchkey Mini MK3, Akai APC Mini MK1/MK2, translating it to a sensible layout. But it does not handle disconnection or reconnection. It does support button colors.

~~Note: To get it to build you need to use a custom build of https://github.com/Julusian/node-midi/. There are some changes made to that library in parallel to this module, which have not yet been released (they will likely be in 3.7.0 once they have had more testing)~~  
Current version just uses the v3.6 and just implemented the missing stuff manually.

## Design

This is using a simple midi library to handle midi io.  
It is opening each input (optionally with a paired output) as its own surface.

## Status

Things to be figured out:

- Is the input+output pairing sane? (is the order consistent, or should this be more optional)
- Properly define the midi surface schema, write it up as a json schema and move each definition to its own json file.
  This should make it fairly easy to add new ones, and to use the schema to create tooling to generate the schema
- Look into making a webapp to generate/edit the schema for a surface. Use webmidi to build an interactive editor and visualiser?
- Expand the schema to handle additional surface types; this should be done before the first usable release of this.
- Make it possible to load a custom schema in as a surface config field?
  Perhaps include some simple ones intended to be used by other software to trigger companion over virtual ports?
- How to handle device disconnections
- How to handle new devices (polling?)
- Should every midi device be always opened, or should there be some configuration to do so?
- What is the midi port name on each platform. How should that be translated into a surfaceId
- Probably more

---

See [HELP.md](./companion/HELP.md) and [LICENSE](./LICENSE)

## Getting started

Executing a `yarn` command should perform all necessary steps to develop the module, if it does not then follow the steps below.

The module can be built once with `yarn build`. This should be enough to get the module to be loadable by companion.

While developing the module, by using `yarn dev` the compiler will be run in watch mode to recompile the files on change.

### Notes

The port names vary in format by platform;

- On linux:
  - Launchpad Mini MK2: `Launchpad Mini:Launchpad Mini MIDI 1 ([0-9]+):0` is common
  - Launchpad Pro MK2: `Launchpad Pro:Launchpad Pro Live Port ([0-9]+):0`
  - Launchpad MK2: `Launchpad MK2:Launchpad MK2 MIDI 1 ([0-9]+):0`
  - Launchpad X: ???
  - Launchkey Mini MK3:
    - `Launchkey Mini MK3:Launchkey Mini MK3 MIDI 2 ([0-9]+):1` OR `Launchkey Mini MK3:Launchkey Mini MK3 Launchkey Mi ([0-9]+):1`
  - Akai APC Mini: `APC MINI:APC MINI MIDI 1 ([0-9]+):0`
- On macos:
  - Launchpad X: ???
  - LaunchControl: ???
- On windows:
  - Launchpad Mini MK2: ???
  - Launchpad Pro MK2: `Launchpad Pro` (input and output)
  - Launchpad MK2: `Launchpad MK2` (input and output)
  - Launchpad X: `MIDIIN2 (LPX MIDI)` with output `MIDIOUT2 (LPX MIDI)`
  - Launchkey Mini MK3: `MIDIIN2 (Launchkey Mini MK3)` with output `MIDIOUT2 (Launchkey Mini MK3)` for DAW control
  - LaunchControl: `Launch Control 2` (input and output)
  - Akai LPD8 MK2: `LPD8 mk2` (input and output)
  - Akai APC Mini: `APC MINI` (input and output)
  - Akai APC Mini MK2: `MIDIIN2 (APC mini mk2)` with output `MIDIOUT2 (APC mini mk2)`
    - OR `APC mini mk2` (input and output) likely 'better'
  - Akai MPK mini 3: `MPK mini 3` (input and output)
