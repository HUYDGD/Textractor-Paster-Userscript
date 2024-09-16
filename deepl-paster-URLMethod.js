// ==UserScript==
// @name         DeepL - Clipboard to Translation URL
// @version      1.1
// @grant        none
// @match        https://www.deepl.com/en/translator
// @description  Automatically navigate to a DeepL translation URL based on clipboard content.
// @author       Your Name
// ==/UserScript==

(function() {
    'use strict';

    // Function to construct and navigate to the DeepL URL with the clipboard content
    function navigateToTranslationURL(text) {
        // Encode the clipboard content for URL
        const encodedText = encodeURIComponent(text);
        // Construct the DeepL URL with the clipboard content
        const url = `https://www.deepl.com/en/translator#jp/en-us/${encodedText}`;
        // Navigate to the constructed URL
        window.location.href = url;
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
                    navigateToTranslationURL(text);
                }
            }
        } catch (err) {
            console.error('Error checking clipboard:', err);
        }
    }

    // Set an interval to periodically check the clipboard
    setInterval(checkClipboard, 1000); // Check every second

})();
