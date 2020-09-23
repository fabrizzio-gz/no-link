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

// Send message to active tabs to activate content JS
function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {isQuery: false}
        ).then(response => {
        
            if (response.hideLinks) {
                browser.browserAction.setIcon(hideLinksIconPath);
            } else {
                browser.browserAction.setIcon(showLinksIconPath);
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
            browser.browserAction.setIcon(hideLinksIconPath);
        } else {
            browser.browserAction.setIcon(showLinksIconPath);
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
