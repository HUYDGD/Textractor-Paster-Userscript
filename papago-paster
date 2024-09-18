// ==UserScript==
// @name         Auto Paste Clipboard to Papago (Japanese Only)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Continuously check the clipboard and paste Japanese text into the Papago textarea input box, mimicking user pasting actions.
// @match        https://papago.naver.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastClipboardText = '';  // Tracks the last clipboard text

    // Function to check if text contains Japanese characters
    function isJapanese(text) {
        // Regex to match Japanese characters (Hiragana, Katakana, Kanji)
        const japaneseRegex = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]|[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/u;
        return japaneseRegex.test(text);
    }

    // Function to simulate user paste action into the textarea
    function pasteIntoTextarea(text) {
        const textArea = document.querySelector('textarea#txtSource');
        if (textArea) {
            // Clear the textarea before pasting
            textArea.focus();
            textArea.select();
            document.execCommand('delete');

            // Set the new value
            textArea.value = text;

            // Dispatch input and change events to notify the page
            textArea.dispatchEvent(new Event('input', { bubbles: true }));
            textArea.dispatchEvent(new Event('change', { bubbles: true }));

            // Trigger a custom event if necessary
            const event = new Event('input', { bubbles: true, cancelable: true });
            textArea.dispatchEvent(event);
        }
    }

    // Function to check the clipboard and paste if necessary
    function processClipboard() {
        navigator.clipboard.readText().then(clipText => {
            if (clipText && clipText !== lastClipboardText && isJapanese(clipText)) {
                // Update the last clipboard text
                lastClipboardText = clipText;

                // Paste the clipboard text into the textarea
                pasteIntoTextarea(clipText);
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    // Check clipboard content every second
    setInterval(processClipboard, 1000);
})();
