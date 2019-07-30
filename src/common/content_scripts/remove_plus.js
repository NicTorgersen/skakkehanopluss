(function () {
    
    // src: https://stackoverflow.com/a/24107550/1478808
    function closest(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }

    function getSiteElements (host) {
        var url = host
        var elements = []
        var count = 0

        switch (url) {
            case "www.bt.no": // schibsted
                var target = '.df-skin-paywall-closed'
                elements = document.querySelectorAll(target);
                count = elements.length
            break

            case "www.varden.no": // agderposten medier
                var targets = document.querySelectorAll('.plus_button');

                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                    count++
                }
            break

            case "www.vg.no":
                var targets = document.querySelectorAll('.article-content .df-img-skin-pluss')

                for (var i = 0; i < targets.length; i++) {
                    elements.push(targets[i].parentElement)
                    count++
                }
            break

            case "www.ta.no": // amedia lokal
            case "www.ba.no":
            case 'www.tk.no':
                var target = '.df-skin-paywall'
                elements = document.querySelectorAll(target)
                count = elements.length
            break

            case "www.tb.no": // amedia lokal
                var targets = document.querySelectorAll('.am-premium-logo')

                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                }
            break

            case 'www.dagbladet.no': // aller media
                /*
                var targets = document.querySelectorAll('.label.black')
                var searchTerm = "Dagbladet Pluss"
                $.each(targets, function (index, elms) {
                    $.each(elms, function (index, element) {
                        if ($(element).text() === searchTerm) {
                            elements.push($(element).closest('article'))
                            count++
                        }
                    })
                })
                */
                elements = document.querySelectorAll('[data-label="pluss"]')
                count = elements.length
            break

            case 'www.adressa.no': // adresseavisen gruppen
            case 'www.smp.no':
            case 'www.rbnett.no':
            case 'www.itromso.no':
                var targets = ['.relatedArticles .payed', '.payed a']

                for (var i = 0; i < targets.length; i++) {
                    var elmts = document.querySelectorAll(targets[i])
                    for (var j = 0; j < elmts.length; j++) {
                        elements.push(elmts[j])
                        count++
                    }
                }

            break

            case 'www.dn.no': // nhst media group
                elements = document.querySelectorAll('.df-skin-paid')
                count = elements.length
            break

            case "www.gjengangeren.no":  // amedia lokal
            case 'www.avisa-valdres.no': // valdres media
                var targets = document.querySelectorAll('[class^="am-premium-"')

                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], '.am-gridComp-item'))
                    count++
                }
            break

            case 'www.an.no':
                var targets = document.querySelectorAll('.am-premium-logo--imageoverlay')

                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                    count++
                }
            break

			case 'www.digi.no':
                var targets = document.querySelectorAll('.subscription-banner')
                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                    count++
                }

				var eksklusivt = document.querySelectorAll('[data-title="EKSKLUSIVT INNHOLD FOR DIGITALE ABONNENTER"], .subscription-reccs')
                for (var i = 0; i < eksklusivt.length; i++) {
                    elements.push(eksklusivt[i])
                    count++
                }
            break

            case 'www.tu.no':
                var targets = document.querySelectorAll('.subscription-banner')
                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                    count++
                }

				var h3 = document.querySelectorAll('h3')
				for (var i = 0; i < h3.length; i++) {
					if (h3[i].innerHTML.indexOf('Eksklusivt for digitale abonnenter') != -1) {
						elements.push(h3[i])
						count++
					}
				}
            break

            case 'e24.no':
                var targets = document.querySelectorAll('.df-img-skin-e24pluss')
                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], '.article-content'))
                    count++
                }
            break

            case 'www.jarlsbergavis.no':
                var targets = document.querySelectorAll('article [class*="premium-logo"]')
                for (var i = 0; i < targets.length; i++) {
                    elements.push(closest(targets[i], 'article'))
                    count++
				}
				var strong = document.querySelectorAll('strong')
				for (var i = 0; i < strong.length; i++) {
					if (strong[i].innerHTML.indexOf('LES OGSÅ') != -1 && strong[i].innerHTML.indexOf('(+)')) {
						elements.push(closest(strong[i], 'ul'))
						count++
					}
				}
            break
        }

        return {
            elements: elements, 
            count: count
        }
    }

    var site = window.location.host
    var nodes_to_remove = getSiteElements(site)
    var count = nodes_to_remove.count

    chrome.runtime.sendMessage({
        type: 'notifyRemove', url: site, objectsFound: count
    })

    var style = document.createElement('style')
    style.innerHTML = ".skakke-ha-no-pluss { display: none; }"
    style.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(style)

    for (var i = 0; i < nodes_to_remove.elements.length; i++) {
        if (typeof nodes_to_remove.elements[i] !== 'undefined') {
            nodes_to_remove.elements[i].style = 'display: none; opacity: 0;'
            nodes_to_remove.elements[i].className = 'skakke-ha-no-pluss'
        }
    }

})()
