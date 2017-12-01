chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "notifyRemove") {
        chrome.pageAction.show(sender.tab.id)
        chrome.pageAction.setIcon({ "tabId": sender.tab.id, "path": "assets/icon38.png" })

        chrome.storage.sync.get('verbose', (obj) => {
            if (obj.hasOwnProperty('verbose')) {
                if (obj.verbose) {
                    var string = "Fjernet " + request.objectsFound + " plussartikler fra " + request.url + "."
                    chrome.notifications.create('', { "type": "basic", "iconUrl": "assets/icon48.png", "title": "Ska'kke ha no' pluss!", "message": string }, function () {})
                }
            }
        })
    }
})
