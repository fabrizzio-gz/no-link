"use strict";

let hideLinks = false;

let styleSheet = (function() {
    let style = document.createElement("style");
    document.head.appendChild(style);
    return style.sheet;
})();


// Add rule on button request
browser.runtime.onMessage.addListener(request => {
    
    if (!request.modify) {
        return Promise.resolve({hideLinks});
    }
    
    if (hideLinks) {
        styleSheet.deleteRule(0);
        hideLinks = !hideLinks;
    } else {
        styleSheet.insertRule("a, a:hover, a:focus, a:active, a:visited {text-decoration: none !important;color: inherit !important;  background-color: inherit !important; border-bottom: initial !important;}", 0);
        hideLinks = !hideLinks;
    }
    return Promise.resolve({hideLinks});
});
