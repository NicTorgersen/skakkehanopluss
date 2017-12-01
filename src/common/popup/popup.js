(function ($) {

    function toggleRemovePlus (e) {
        var button = $(e.target)
        localStorage['rp-enabled'] = !localStorage['rp-enabled']
        button.text( (localStorage['rp-enabled']) ? 'Deaktiver' : 'Aktiver' )
    }

    $(document).ready(function () {
        $('#toggleEnableButton').click(toggleRemovePlus)
    })

})(jQuery)
