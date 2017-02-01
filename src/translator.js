import ajax from 'ajax'

let yandex_key = 'trnsl.1.1.20170122T193632Z.4559465b309f3298.adcb99797c5d62069304ac3780b2774156e65122'
let yandex_lang = 'en-pt'
let yandex_url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandex_key}`

function translate(yandex_text, iso3) {
    let disastersAjax = ajax({
        method: 'POST',
        url: yandex_url,
        data: {
            lang: yandex_lang,
            text: yandex_text
        }
    })
    disastersAjax.then(function(response) {
        localStorage.setItem(iso3, response.text[0])
    }).catch(function (response, xhr) {
        localStorage.setItem(iso3, 'Não foi possível traduzir no momento: ' + yandex_text)
    })
}

function getTranslation(iso3) {
    return localStorage.getItem(iso3)
}

module.exports.translate = translate
module.exports.getTranslation = getTranslation