// ==UserScript==
// @name         Auto Paste Clipboard to Google Translate (Continuous)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Continuously check the clipboard and paste text into the Google Translate input box.
// @match        https://translate.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastClipboardText = '';

    // Function to paste clipboard content into the textarea
    function pasteClipboard() {
        // Find the text area for input
        const textArea = document.querySelector('textarea.er8xn');
        if (textArea) {
            // Read the clipboard content
            navigator.clipboard.readText().then(clipText => {
                if (clipText && clipText !== lastClipboardText) {
                    // Update the text area value and trigger an input event
                    textArea.value = clipText;
                    textArea.dispatchEvent(new Event('input', { bubbles: true }));

                    // Save the current clipboard text to avoid duplicate pasting
                    lastClipboardText = clipText;
                }
            });
        }
    }

    // Check clipboard content every second
    setInterval(pasteClipboard, 1000);
})();
