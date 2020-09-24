// Icons paths
const showLinksIconPath = {
    path: 'icons/link-icon.png'
};
const hideLinksIconPath = {
    path: 'icons/broken-link-icon.png'
};


function onError(error) {
    browser.browserAction.setIcon(showLinksIconPath);
}


function updateIcon(response) {
    if (response.hideLinks) {
        browser.browserAction.setIcon(hideLinksIconPath);
    } else {
        browser.browserAction.setIcon(showLinksIconPath);
    }
}


function verifyTabStatus(activeInfo) {
    browser.tabs.sendMessage(
        activeInfo.tabId, {
            isQuery: true
        }
    ).then(updateIcon).catch(onError);
}


function activeTabLinkToggle() {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(requestLinkFormatToggle).catch(onError);                
}


function requestLinkFormatToggle(tabs) {
    
    if (!(tabs === undefined || tabs.length == 0)) {
        const activeTab = tabs[0];
        browser.tabs.sendMessage(
            activeTab.id, {
                isQuery: false
            }
        ).then(updateIcon).catch(onError);
    }

}


// Update Icon on tab change
browser.tabs.onActivated.addListener(verifyTabStatus);


// Request toggle link formatting on click
browser.browserAction.onClicked.addListener(activeTabLinkToggle);
