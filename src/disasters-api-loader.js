import Disaster from './disaster'
import ajax from 'ajax'


let load = function() {
    let disastersAPI = 'https://api.reliefweb.int/v1/disasters?appname=omundoagora&profile=full&offset=0&limit=10&preset=latest'

    let disastersAjax = ajax({
        method: 'GET',
        url: disastersAPI
    })

    disastersAjax.then(function(response) {
        let x = 0
        for (let obj of response.data) {
            let disasterRaw = {iso3: obj.fields.primary_country.iso3, nameTitle: obj.fields.name, description: obj.fields.description}
            sessionStorage.setItem(x,JSON.stringify(disasterRaw))
            x++
        }
    })
}

module.exports.loadDisasters = load