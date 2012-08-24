// Called when URLs change
function checkForJammableUrl(tabId, changeInfo, tab) {
  if (isPotentiallyJammable(tab.url)) {
    chrome.pageAction.show(tabId);
  }
  else {
      chrome.pageAction.hide(tabId);
  }
};

// Listen to URL changes
chrome.tabs.onUpdated.addListener(checkForJammableUrl);

// Called when jamlet icon is clicked
function jamletClicked(tab) {
    var destUrl = 'http://www.thisismyjam.com/jam/create?signin=1&url=' + encodeURIComponent(tab.url);
    chrome.tabs.create({'url': destUrl});
}

// Jammable URL resolver helper 
function isPotentiallyJammable(string) {
    if(string.match(/^(https?:\/\/)?(www\.)?soundcloud\.com\/[^\/]+\/[^\/]+/i))
        return true; // Potential SoundCloud track page (TODO: introspect page to make sure?)
    else if(string.match(/^(https?:\/\/)?(www\.)?youtube\.com\/watch.+/i))
        return true; // YouTube watch page
    else if(string.match(/^[^ ]+\/[^ ]+\.mp3$/))
        return true; // Found audio
    else if(string.match(/^(https?:\/\/)?(www\.)?hypem.com\/track[^\/]+/i))
        return true; // Hype Machine track page
    else if(string.match(/^(https?:\/\/)[^\/]+\/track\//))
        return true; // Potential Bandcamp track page (TODO: introspect page to make sure?)

    return false;
}

// Listen to clicks
chrome.pageAction.onClicked.addListener(jamletClicked);