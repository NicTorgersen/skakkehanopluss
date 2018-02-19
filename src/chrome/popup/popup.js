(function ($) {

    function saveVerboseOption (state) {
        chrome.storage.sync.set({'verbose': state}, function () {
            notifyChange()
        })
    }

    function notifyChange (message) {
        message = message || "Lagret endringer."
        $("#notify-change").empty().text(message)
        $("#notify-change").fadeIn(400, () => {})
        setTimeout(() => {
            $("#notify-change").fadeOut(400, () => {})
        }, 1000)
    }

    function toggleOption (key) {
        chrome.
    }

    $(document).ready(function () {
        var inputs = {'verbose': $('#verbose')}

        chrome.storage.onChanged.addListener((changes, namespaces) => {
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

        for (var input in inputs) {
            var el = inputs[input]
            chrome.storage.sync.get(input, (obj) => {
                el.prop('checked', obj[input])
            })
        }

        $("#verbose").click((evt) => {
            saveVerboseOption(evt.target.checked)
        })
    })

})(jQuery)
