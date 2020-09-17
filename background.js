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

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});
