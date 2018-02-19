(function ($) {

	/* const blockedPapers = {
		"www.vg.no",
        "www.tb.no",
        "www.dagbladet.no",
        "www.adressa.no",
        "www.bt.no",
        "www.tk.no",
        "www.smp.no",
        "www.rbnett.no",
        "www.gjengangeren.no",
        "www.ta.no",
        "www.varden.no",
        "www.avisa-valdres.no",
        "www.dn.no",
        "www.ba.no",
        "www.an.no",
        "www.itromso.no",
	} */

    function getSiteElements (host) {
        var url = host
        var elements = []
        var count = 0

        switch (url) {
            case "www.bt.no": // schibsted
                var targets = $('.df-skin-paywall-closed')

                $.each(targets, function (index, element) {
                    elements.push($(this))
                    count++
                })

                break

            case "www.varden.no": // agderposten medier
                var targets = $('.plus_button')

                $.each(targets, function (index, element) {
                    count++
                    elements.push($(this).closest('article'))
                })

                break

            case "www.vg.no":
                var targets = [$('.article-content .df-img-skin-pluss'), $('#pluss-teaser')]

                $.each(targets, function (index, elmts) {
                    $.each(elmts, function (index, element) {
                        if (typeof $(element).parent('.article-extract') !== 'undefined') {
                            count++
                            elements.push($(this).closest('.article-extract'))
                        } else if (typeof $(element).parent('.df-container') !== 'undefined') {
                            elements.push($(this).closest('.df-container'))
                        } else if (typeof $(element).parent('.articles') !== 'undefined') {
                            elements.push($(this))
                        }
                    })
                })

                break

            case "www.ta.no": // amedia lokal
            case "www.gjengangeren.no":
            case "www.tb.no":
            case "www.ba.no":
            case 'www.tk.no':
                var targets = $('.df-skin-paywall')
                $.each(targets, function (index, element) {
                    count++
                    elements.push($(this))
                })

                break

            case 'www.dagbladet.no': // aller media
                var targets = [$('.label.black')]
                var searchTerm = "Dagbladet Pluss"

                $.each(targets, function (index, elms) {
                    $.each(elms, function (index, element) {
                        if ($(element).text() === searchTerm) {
                            elements.push($(element).closest('article'))
                            count++
                        }
                    })
                })

                break

            case 'www.adressa.no': // adresseavisen gruppen
            case 'www.smp.no':
            case 'www.rbnett.no':
            case 'www.itromso.no':
                var targets = [$('.relatedArticles .payed'), $('.payed a')]
                console.log(targets);
                $.each(targets, function (index, element) {
                    elements.push($(this))
                    count++
                })

                break

            case 'www.dn.no': // nhst media group
                var targets = $('.df-skin-paid')
                $.each(targets, function (index, element) {
                    elements.push($(this))
                    count++
                })

                break

            case 'www.avisa-valdres.no': // valdres media
            case 'www.an.no': // amedia
                var targets = $('[class^=\'am-premium-\']')
                $.each(targets, function (index, element) {
                    elements.push($(element).closest('.am-gridComp-item'))
                    count++
                })

                break
        }

        return {
            elements: elements, 
            count: count
        }
    }

    $(document).ready(function () {
        var site = window.location.host
        var nodes_to_remove = getSiteElements(site)
        var count = nodes_to_remove.count

        chrome.runtime.sendMessage({
            type: 'notifyRemove', url: site, objectsFound: count
        })

        for (var i = 0; i < nodes_to_remove.elements.length; i++) {
            if (nodes_to_remove.elements[i].length > 0 && typeof nodes_to_remove.elements[i] !== 'undefined') {
                var currentElement = nodes_to_remove.elements[i]

                currentElement.css('display', 'none')
            }
        }
    })
})(jQuery)
