// ==UserScript==
// @name         DeepL - Clipboard to Translation Input (Auto Paste)
// @version      1.0
// @grant        none
// @match        https://www.deepl.com/en/translator
// @description  Automatically paste clipboard content into the DeepL translation input box without manual clicking.
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
    function pasteClipboardText() {
        navigator.clipboard.readText().then(text => {
            if (text) {
                const inputBox = document.querySelector('d-textarea[aria-labelledby="translation-source-heading"] div[contenteditable="true"]');
                if (inputBox) {
                    // Set the content of the input box
                    inputBox.innerHTML = text;

                    // Trigger input event to notify DeepL about the change
                    const event = new Event('input', { bubbles: true });
                    inputBox.dispatchEvent(event);
                }
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    // Observe the clipboard for changes
    let lastClipboardText = '';

    async function checkClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            if (text && text !== lastClipboardText) {
                lastClipboardText = text;
                pasteClipboardText();
            }
        } catch (err) {
            console.error('Error checking clipboard:', err);
        }
    }

    // Set an interval to periodically check the clipboard
    setInterval(checkClipboard, 1000); // Check every second

})();
