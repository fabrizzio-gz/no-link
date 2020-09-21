"use strict";

let erased = false;

var sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();


// Add rule on button request
browser.runtime.onMessage.addListener(request => {
    if (erased) {
        sheet.deleteRule(0);
        erased = !erased;
    } else {
        sheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);
        erased = !erased;
    }
    return Promise.resolve({erased});
});
