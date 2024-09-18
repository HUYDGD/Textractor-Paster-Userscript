// ==UserScript==
// @name         Auto Scroll to Bottom on Data Change
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Scrolls to the bottom of the page when new data is added for a specific local HTML file
// @author       Your Name
// @match        file:///C:/Personal/Resources/Tools/Texthooker-Local-main/index.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to scroll to the bottom of the page
    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    // Create a MutationObserver to detect changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if new nodes are added
            if (mutation.addedNodes.length > 0) {
                scrollToBottom();
            }
        });
    });

    // Configuration of the observer:
    const config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);

    // Initial scroll to bottom
    scrollToBottom();
})();

