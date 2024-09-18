// ==UserScript==
// @name         Auto Paste Clipboard to Yandex Translate (Japanese Only)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Continuously check the clipboard and paste Japanese text into the Yandex Translate contenteditable div, mimicking user pasting actions.
// @match        https://translate.yandex.com/*
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

    // Function to paste text into the contenteditable div
    function pasteIntoContentEditable(text) {
        const editableDiv = document.querySelector('div#fakeArea');
        if (editableDiv) {
            // Focus on the div
            editableDiv.focus();

            // Clear the existing content
            editableDiv.innerHTML = '';

            // Insert the new text
            editableDiv.innerText = text;

            // Dispatch input and change events to notify the page
            const inputEvent = new Event('input', { bubbles: true });
            const changeEvent = new Event('change', { bubbles: true });
            editableDiv.dispatchEvent(inputEvent);
            editableDiv.dispatchEvent(changeEvent);
        }
    }

    // Function to check the clipboard and paste if necessary
    function processClipboard() {
        navigator.clipboard.readText().then(clipText => {
            if (clipText && clipText !== lastClipboardText && isJapanese(clipText)) {
                // Update the last clipboard text
                lastClipboardText = clipText;

                // Paste the clipboard text into the contenteditable div
                pasteIntoContentEditable(clipText);
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    // Check clipboard content every second
    setInterval(processClipboard, 1000);
})();
