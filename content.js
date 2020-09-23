'use strict';

// Links formatting state variable
let hideLinks = false;
const hideLinksRule = `
a,
a:hover,
a:focus,
a:active,
a:visited {
    text-decoration: none !important;
    color: inherit !important;
    background-color: inherit !important;
    border-bottom: initial !important;
}`;


let styleSheet = (function () {
    let style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet;
})();


// 
browser.runtime.onMessage.addListener(request => {

    // Do not modify if request is only a query
    if (request.isQuery) {
        return Promise.resolve({
            hideLinks
        });
    }

    // Toggle hide/show link formatting on event
    if (hideLinks) {
        styleSheet.deleteRule(0);
        hideLinks = !hideLinks;
    } else {
        styleSheet.insertRule(hideLinksRule, 0);
        hideLinks = !hideLinks;
    }

    // Return links state
    return Promise.resolve({
        hideLinks
    });

});
