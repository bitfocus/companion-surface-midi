## Generic MIDI surface

Turn MIDI devices (with colored button grids) into a companion compatible surface.

Only a certain list of devices is supported currently.  
Feel free to open a device request on the [github issues](https://github.com/bitfocus/companion-surface-midi/issues).

### Usage

As soon as you enable this surface module in your surfaces tab, it should automatically be able to detect MIDI devices if they are added to this module.

### Supported devices

Here is a list of currently programmed-in devices and on which platform they are recognized.
Some are only on a certain platform recognized, since the maintainer does not have all of these controller nor do they have all OS's.
Please check for an existing device request for the module and then comment the portname on your OS, OR make a new device request in case the device has not been added yet:

| Name                     | Platforms       | Status                         |
| ------------------------ | --------------- | ------------------------------ |
| NovationLaunchpadMini    | Linux           | Needs testing                  |
| NovationLaunchpadPro     | Linux, Windows  | Works                          |
| NovationLaunchpadMK2     | Linux, Windows  | Works                          |
| NovationLaunchpadXMK3    | Windows         | Needs testing                  |
| NovationLaunchpadProMK3  | None            | No portname, and needs testing |
| NovationLaunchpadMiniMK3 | Linux, Windows  | Works                          |
| NovationLaunchkeyMiniMK3 | Linux, Windows  | Works                          |
| AkaiAPCMiniMK2           | Windows         | Works                          |
| AkaiAPCMini              | Linux, Windows  | Works, but limited colors      |
| AkaiAPC40MK2             | Windows         | Needs testing                  |
| AkaiMpkMiniMk3           | Fedora, Windows | Works                          |
| AkaiMIDImix              | Linux, Windows  | Needs testing                  |

### Things to note

- Pincode locking is not implemented, since there is no way to light up the buttons of the numbers, plus since you cannot even see the numbers.  
  So it would have become guessing work which button does which. Plus not all midi controllers have enough buttons or at least not enough rows/columns.  
  Therefor, there is no pincode locking implemented at all.
- Some devices might have extra buttons that do not support RGB. These can be optionally enabled using the "Extended Mode" toggle that only shows for devices that support the setting.
- Some devices with a specific button for like an arrow up/down or left/right that is not part of the main grid, might have an extra toggle in the settings of the device, which when enabled will make those buttons do the page up and page down action, without you needing to reserve a specific button for that. However since this is a Companion native feature, it is disabled by default and must be turned on manually if you want to use it.
- There is no status indication system built into this, as there's no way to show text or a logo on a grid as large as 9x9 or 8x2 (biggest so far, and smallest so far).
- Some devices have been added theorically, by using documentation references online, but have not been tested. If a surface doesn't behave the way it should or if a surface is not getting detected, but it is listed in the code, please open an issue and provide information!
- The color will be take from the background color of the button (or whatever Companion actually reports as the button color), and will turn Companion's pressed-orange when the button is pressed!  
  If you want it to take the color from the bitmap (rendered image of button contents) instead, you can enable the useBitmap toggle, and then it will take the top left or bottom right color of an 8x8 render of your button. It is recommended to leave this setting off, as it is not quite as accurate or capable to get the correct color and/or color when pressed.
  If you do enable that feature, make sure to set your default Buttons -> Decorations as being Border instead of being Topbar!
- If you have multiple of the same device model, then the order of plugging them in (and perhaps the USB port location as well) matter as to which one becomes which controller.
  The module is unable to keep track of which controller is which, as only the name of the controller is being given by the midi library. Therefor I don't have a reliable way to keep track which controller is which. Thanks for your understanding.
