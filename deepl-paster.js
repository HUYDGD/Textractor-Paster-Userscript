// ==UserScript==
// @name         DeepL - Clipboard to Translation Input (Auto Paste)
// @version      1.1
// @grant        none
// @match        https://www.deepl.com/en/translator
// @description  Automatically paste Japanese clipboard content into the DeepL translation input box without manual clicking.
// @author       Your Name
// ==/UserScript==

(function() {
    'use strict';

    // Function to set clipboard content
    function setClipboardText(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Clipboard text updated:', text);
        }).catch(err => {
            console.error('Failed to write to clipboard: ', err);
        });
    }

    // Function to paste text into the DeepL input box
    function pasteClipboardText(text) {
        const inputBox = document.querySelector('d-textarea[aria-labelledby="translation-source-heading"] div[contenteditable="true"]');
        if (inputBox) {
            // Set the content of the input box
            inputBox.innerHTML = text;

            // Trigger input event to notify DeepL about the change
            const event = new Event('input', { bubbles: true });
            inputBox.dispatchEvent(event);
        }
    }

    // Function to check if text contains Japanese characters
    function isJapanese(text) {
        // Regex to match Japanese characters (Hiragana, Katakana, Kanji)
        const japaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]|[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/u;
        return japaneseRegex.test(text);
    }

    // Observe the clipboard for changes
    let lastClipboardText = '';

    async function checkClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            if (text && text !== lastClipboardText) {
                lastClipboardText = text;
                if (isJapanese(text)) {
                    pasteClipboardText(text);
                }
            }
        } catch (err) {
            console.error('Error checking clipboard:', err);
        }
    }

    // Set an interval to periodically check the clipboard
    setInterval(checkClipboard, 1000); // Check every second

})();
