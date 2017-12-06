(function ($) {

    function saveVerboseOption (state) {
        browser.storage.sync.set({'verbose': state}, function () {
            notifyChange("Lagret endringer.")
        })
    }

    function notifyChange (message) {
        $("#notify-change").empty().text(message)
        $("#notify-change").fadeIn(400, () => {})
        setTimeout(() => {
            $("#notify-change").fadeOut(400, () => {})
        }, 1000)
    }

    function toggleOption (key) {
        var optionPromise = browser.storage.sync.get(key)

        optionPromise.then(function (optionValue) { // success
            optionValue = optionValue || ''
            if (optionValue.length != 0) {

            }
        }, function () { // error

        })
    }

    browser.storage.onChanged.addListener((changes, namespaces) => {
        for (var key in changes) {
            var storageChange = changes[key]
            for (var input in inputs) {
                var el = inputs[input]
                if (key == input) {
                    el.prop('checked', storageChange)
                }
            }
        }
    });


    $(document).ready(function () {
        var verboseCheckbox = $("#verbose")
        var bigRedButton = $("#big-red-button")
        var storagePromise = browser.storage.sync.get()
        var buttonStrings = {
            'unblock': "Jæ har pluss på denna sia.",
            'block': "Jæ vi'kke ha no' pluss her lenger!",
        }
        
        storagePromise.then(function (storageItems) => {
            for (itemKey in storageItems) {
                if (itemKey === 'verbose') {
                    verboseCheckbox.prop('checked', storageItems['verbose'])
                }

                if (itemKey === window.location.host) {
                    
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
