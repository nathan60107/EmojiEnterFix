/**
 * @name EmojiEnterFix
 * @author nathan60107
 * @version 1.0.0
 * @source https://github.com/nathan60107/EmojiEnterFix
 * @description Returns focus to the message box after picking an emoji or sticker, so pressing Enter sends the message instead of reopening the picker.
 */

const TEXTBOX = '[role="textbox"][data-slate-editor="true"]';
const PICKER = '[id^="emoji-picker"], [class*="emojiPicker"], [class*="expression-picker"], [class*="stickerPicker"], [class*="emojiItem"], [class*="stickerGrid"], [class*="sticker"]';

module.exports = class EmojiEnterFix {
  onClick = (e) => {
    if (e.target instanceof Element && e.target.closest(PICKER)) {
      clearTimeout(this.timer);
      this.timer = setTimeout(focusBox, 50);
    }
  };

  // Fallback: Enter on a chat-bar button (emoji/sticker/GIF) sends the message instead.
  onKeyDown = (e) => {
    if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
    const active = document.activeElement;
    if (!active?.closest || active.closest('[role="textbox"]')) return;
    if (!active.closest('button, [role="button"]')?.closest('[class*="channelTextArea"]')) return;
    const box = focusBox();
    if (!box) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    box.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true,
    }));
  };

  start() {
    document.addEventListener('click', this.onClick, true);
    document.addEventListener('keydown', this.onKeyDown, true);
  }

  stop() {
    document.removeEventListener('click', this.onClick, true);
    document.removeEventListener('keydown', this.onKeyDown, true);
    clearTimeout(this.timer);
  }
};

// Focuses the message box and moves the caret to the end if it is elsewhere.
function focusBox() {
  const box = document.querySelector(TEXTBOX);
  if (!box) return null;
  box.focus();
  const sel = window.getSelection();
  if (sel && !box.contains(sel.anchorNode)) {
    sel.selectAllChildren(box);
    sel.collapseToEnd();
  }
  return box;
}
