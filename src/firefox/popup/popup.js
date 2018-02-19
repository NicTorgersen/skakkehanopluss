(function ($) {

    function saveVerboseOption (state) {
        browser.storage.sync.set({'verbose': state}, function () {
<<<<<<< HEAD
            notifyChange("Lagret endringer.")
=======
            notifyState()
>>>>>>> 524478e3894f18f108dad03713ab980b67252a5c
        })
    }

    function notifyState (message, style) {
        message = message || "Lagret endringer."
        style = style || false

        if (style) {
            $("#notify-change").toggleClass("."+style);
        }

        $("#notify-change").empty().text(message)
        $("#notify-change").fadeIn(400)

        setTimeout(() => {
            $("#notify-change").fadeOut(400)
        }, 1000)
    }

    function toggleOption (key) {
        var optionPromise = browser.storage.sync.get(key)

        optionPromise.then(function (optionValue) {
            optionValue = optionValue || false

            if (optionValue) {
                browser.storage.sync.set({key: !optionValue})
                    .then(null, onError)
            } else {
                browser.storage.sync.set({key: false})
                    .then(null, onError)
            }
        }, onError)
    }

    function onError (err) {
        notifyState("err: "+err, "error")
    }

    // derp...
    function getHostFromURL (url) {
        var protocols = ["http://", "https://"]
        for (var i = 0; i < protocols.length; i++) {
            var protocol = protocols[i]
            if (url.startsWith(protocol)) {
                url = url.replace(protocol, "").replace("/", "")
            }
        }
        return url
    }

    $(document).ready(function () {
<<<<<<< HEAD
        var inputs = {'verbose': $('#verbose')}

        browser.storage.onChanged.addListener((changes, namespaces) => {
            for (var key in changes) {
                var browser.storageChange = changes[key]
                for (var input in inputs) {
                    var el = inputs[input]
                    if (key == input) {
                        el.prop('checked', browser.storageChange)
                    }
=======
        var verboseCheckbox = $("#verbose")
        var bigRedButton = $("#big-red-button")
        var storagePromise = browser.storage.sync.get()
        var buttonStrings = {
            'unblock': "Jæ har pluss på denna sia.",
            'block': "Jæ vi'kke ha no' pluss her lenger!",
        }

        browser.storage.onChanged.addListener((changes, namespaces) => {
            for (key in changes) {
                if (key === "verbose") {
                    verboseCheckbox.prop('checked', changes[key])
                } else {
                    browser.tabs.query({
                        active: true,
                        currentWindow: true,
                    }, function (tabs) {
                        var tab = tabs[0]
                        var host = getHostFromURL(tab.url)
                        console.log(host)
                    })
>>>>>>> 524478e3894f18f108dad03713ab980b67252a5c
                }
            }
        });
        
        storagePromise.then(function (storageItems) => {
            for (itemKey in storageItems) { // dette kommer sikkert til å bli tregt
                if (itemKey === 'verbose') {
                    verboseCheckbox.prop('checked', storageItems['verbose'])
                } else {
                    browser.tabs.query({ // spesielt pga dette
                        active: true,
                        currentWindow: true,
                    }, function (tabs) {
                        var tab = tabs[0]
                        var host = getHostFromURL(tab.url)

                        if (itemKey === host) {

                        }
                    })
                }
            }
        })

        for (var input in inputs) {
            var el = inputs[input]
            browser.storage.sync.get(input, (obj) => {
                el.prop('checked', obj[input])
            })
        }

        verboseCheckbox.click((evt) => {
            toggleOption('verbose')
        })

        bigRedButton.click((evt) => {
            toggleOption(window.host)
        })
    })

})(jQuery)
