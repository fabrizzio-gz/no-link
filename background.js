const showLinkIcon = {
};

function onError(error) {
    browser.browserAction.setIcon({path: "icons/link-icon.png"});
}

// Send message to active tabs to activate content JS
function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {isQuery: false}
        ).then(response => {
        
            if (response.hideLinks) {
                browser.browserAction.setIcon({path: "icons/broken-link-icon.png"});
            } else {
                browser.browserAction.setIcon({path: "icons/link-icon.png"});
            }

        }).catch(onError);
    }
}


function verifyTabStatus(activeInfo) {
    
    browser.tabs.sendMessage(
        activeInfo.tabId,
        {
            isQuery: true
        }
    ).then(response => {
        
        if (response.hideLinks) {
            browser.browserAction.setIcon({path: "icons/broken-link-icon.png"});
        } else {
            browser.browserAction.setIcon({path: "icons/link-icon.png"});
        }
    }).catch(onError);
}


// On active tab event to set icon
browser.tabs.onActivated.addListener(verifyTabStatus);


// On click event
browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
});
