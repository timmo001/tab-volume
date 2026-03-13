<p align="center">
  <img src="./webstore/images/promo/marquee.png" />
</p>

# Tab Volume 🎚️

A convenient and attractive extension for adjusting sound volume in a browser tab

- 🍙 Increase or decrease volume within a browser tab
- 🍥 Set any upper limit to scale the sound volume
- 🍣 Displays a list of tabs where sound is playing, allowing you to easily switch between them
- 🍤 Restore tab volume with one click
- 🍢 Change volume with hotkey `Shift + Alt + ArrowDown`
- 🍡 Adjust stereo balance (left/right panning) per tab with a slider or hotkeys `Shift + Alt + ArrowLeft/ArrowRight`

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Shift + Alt + Down` | Decrease volume |
| `Shift + Alt + Left` | Pan audio to the left |
| `Shift + Alt + Right` | Pan audio to the right |
| *(unassigned)* | Reset balance to center |

Shortcuts can be reassigned at `chrome://extensions/shortcuts`. Chrome limits extensions to 4 commands, so only the above are registered by default.

## Localization

If you want to add localizations to the extension, they are located in the [`_locales`](_locales) folder. Just create a folder with your locale and translate language phrases.

## Developers

If you are developing your own extension and are looking for code examples, I highly recommend checking out my [utils](./src/utils) from this repository, which I collected while developing Tab Volume. Some of them may require Lodash to work.

## Contribution

See [Contributing Guide](CONTRIBUTING.md).

## License

[Creative Commons BY-NC 4.0](LICENSE.md).
