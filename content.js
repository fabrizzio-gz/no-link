"use strict";

var sheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");

	// WebKit hack :(
	// style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet;
})();

// sheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);

// Add rule on button request
browser.runtime.onMessage.addListener(request => {
  sheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);
});

// browser.runtime.onMessage.addListener(request => {
//   sheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);
// });
