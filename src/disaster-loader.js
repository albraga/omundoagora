import ajax from 'ajax'
import disasterAssembler from './disaster-assembler'

let load = function() {
    let disastersAPI = 'https://api.reliefweb.int/v1/disasters?appname=omundoagora&profile=full&offset=0&limit=10&preset=latest'

    let disastersAjax = ajax({
        method: 'GET',
        url: disastersAPI
    })

    disastersAjax.then(function(response) {
        let index = 0
        for (let obj of response.data) {
            let disasterRaw = {iso3: obj.fields.primary_country.iso3, nameTitle: obj.fields.name, description: obj.fields.description}
            sessionStorage.setItem(index, JSON.stringify(disasterRaw))
            index++
        }
        disasterAssembler.assembly()
    })
}

module.exports.load = load