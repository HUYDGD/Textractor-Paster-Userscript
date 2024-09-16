// ==UserScript==
// @name         DeepL - Auto VN Translation Extension Helper
// @version      1.2.4
// @grant        GM.setClipboard
// @match        https://www.deepl.com/translator
// @description  Watch for target language element class change, copy new value of textarea to clipboard each time change has been detected.
// @author       Zero_G
// @icon         https://www.deepl.com/img/logo/deepl-logo-blue.svg
// @namespace Zero_G.autovntranslation
// ==/UserScript==
(function() {
    'use strict';
    // Filters to apply to translated text
    // These were originally here, so leaving them as is for compatibility to previous caches (as filtering should be done in setClipboardText)
    const filters = {
//      '' : /\"+|\'\'+/g,        // Remove " or ''
//      '...' : /\.\.\.\.+/g      // Change multiple dots (when there are more than 3 to '...' only)
    }
 
    const mutationObserver = new MutationObserver(callback)
 
    // Observe the text div that contain the translation
    // But as the translated text appears in a <p> in a ::before css we need to watch
    // for added nodes
    mutationObserver.observe(
      	document.querySelector('#translation-target-heading').parentNode, {
            childList: true,
          	subtree: true
        }
    )
 
    function callback(mutationsList) {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' && // Irrelevant as we are already watching for childList only but meh
                mutation.addedNodes.length !== 0 && // Looking for a mutation with an added node
                mutation.removedNodes.length !== 0 && // This condition is to prevent a repeat
                !mutation.addedNodes[0].innerHTML.includes('<br')) { // Filter out garbage while translating
                // Get text from <p> (get as value doesn't work)
              	let text = '';
              	// Check for added elments/mutations of element type <p>
                for(let i in mutation.addedNodes){
                  let p = mutation.addedNodes[i]
                  if(p.tagName == 'P'){
                    // If <p> has spans, get text from them
                    if (p.firstChild) {
                      for(let i of p.childNodes){
                        if(i.innerHTML) text = text + i.textContent;
                      }
                  	} else {
                      // If text is isn't inside spans
                    	text = mutation.addedNodes[0].textContent; 
                  	}         
                  }
                }
                        
 
                // Apply filters
                for (const [key, value] of Object.entries(filters)) {
                  text = text.replace(value, key);
                }
 
                // Copy to memory with GreaseMonkey special function (needs @grant)
                if(text) GM.setClipboard(text);
            }
        })
    }
})();
