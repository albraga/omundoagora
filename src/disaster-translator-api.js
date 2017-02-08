import ajax from 'ajax'

let yandex_key = 'trnsl.1.1.20170122T193632Z.4559465b309f3298.adcb99797c5d62069304ac3780b2774156e65122'
let yandex_lang = 'en-pt'
let yandex_url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandex_key}`

function translate() {
    let disastersEng = []

    for(let y = 0; y < sessionStorage.length; y++) {
        disastersEng.push(JSON.parse(sessionStorage.getItem(y)))
    }

    sessionStorage.clear()

    for(let z = 0; z < disastersEng.length; z++) {
        translateAjax(disastersEng[z], z)
    }
}

function translateAjax(disaster, z) {

    let disastersAjax = ajax({
        method: 'POST',
        url: yandex_url,
        data: {
            lang: yandex_lang,
            text: disaster.description
        }
    })

    disastersAjax.then(function(response) {
        disaster.description = response.text[0]
        sessionStorage.setItem(z, JSON.stringify(disaster))
    }).catch(function (response, xhr) {
        disaster.description = '<p><b>Não foi possível traduzir</b>:</p>' + disaster.description
        sessionStorage.setItem(z, JSON.stringify(disaster))
    })
}

module.exports.translate = translate