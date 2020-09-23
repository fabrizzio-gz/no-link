"use strict";

let hideLinks = false;

var sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();


// Add rule on button request
browser.runtime.onMessage.addListener(request => {
    
    if (!request.modify) {
        return Promise.resolve({hideLinks});
    }
    
    if (hideLinks) {
        sheet.deleteRule(0);
        hideLinks = !hideLinks;
    } else {
        sheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);
        hideLinks = !hideLinks;
    }
    return Promise.resolve({hideLinks});
});
