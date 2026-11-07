# EmojiEnterFix

A [BetterDiscord](https://betterdiscord.app/) plugin that fixes a small annoyance in the chat box.

## The problem

When you click an emoji or sticker in the picker, focus stays on the picker button. Pressing Enter then reopens the picker instead of sending your message.

## What it does

- After you pick an emoji or sticker, focus goes back to the message box with the caret at the end.
- If focus is still on a chat-bar button (emoji, sticker, GIF) when you press Enter, the message is sent instead.

Shift+Enter and IME composition are left untouched.

## Installation

1. Download [`EmojiEnterFix.plugin.js`](EmojiEnterFix.plugin.js).
2. Put it in your BetterDiscord plugins folder (Settings → BetterDiscord → Plugins → Open Plugins Folder).
3. Enable **EmojiEnterFix** in the plugin list.

## Credits

Based on the original script by 給綠.

## License

[MIT](LICENSE)
