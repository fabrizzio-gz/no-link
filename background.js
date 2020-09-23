function onError(error) {
  browser.browserAction.setIcon({path: "icons/link-icon.png"});
  console.error(`Error: ${error}`);
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
        {isQuery: true}
    ).then(response => {
               
        if (response.hideLinks) {
             browser.browserAction.setIcon({path: "icons/broken-link-icon.png"});
        } else {
            browser.browserAction.setIcon({path: "icons/link-icon.png"});
        }

    }).catch(onError);
}

// Chaging the icon
function changeIcon() {
      browser.browserAction.setIcon({path: "icons/broken-link-icon.png"});
}


function setIcon(tabId, changeInfo, tabInfo) {
    browser.browserAction.setIcon({path: "icons/link-icon.png"});
}

const filter = {
    urls: ["https://*/*", "http://*/*"],
    properties: ["status"]
};

// On active tab event to set icon
//browser.tabs.onUpdated.addListener(setIcon, filter);
browser.tabs.onActivated.addListener(verifyTabStatus);


// On click event
browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});
