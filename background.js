function onError(error) {
  console.error(`Error: ${error}`);
}

// Send message to active tabs to activate content JS
function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {}
    ).catch(onError);
  }
}

// Chaging the icon
function changeIcon() {
      browser.browserAction.setIcon({path: "icons/broken-link-icon.png"});
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).then(changeIcon).catch(onError);
});
