import Country from './country'
import Disaster from './disaster'
import countriesMatrix from './countries-matrix'
import disasterTranslatorApi from './disaster-translator-api'

function assembly() {
    let disastersRawArray = []

    for(let y = 0; y < sessionStorage.length; y++) {
        disastersRawArray.push(JSON.parse(sessionStorage.getItem(y)))
    }

    sessionStorage.clear()

    let index = 0;
    for(let disasterRaw of disastersRawArray) {
        for(let w = 0; w < countriesMatrix.length; w++) {
           if(countriesMatrix[w][0] === disasterRaw.iso3) {
                let iso3 = countriesMatrix[w][0]
                let name = countriesMatrix[w][1]
                let lat = countriesMatrix[w][2]
                let lng = countriesMatrix[w][3]
                let disaster = {iso3, name, lat, lng, nameTitle: disasterRaw.nameTitle, description: disasterRaw.description}
                sessionStorage.setItem(index, JSON.stringify(disaster))
                index++
           }
        }
    }
    disasterTranslatorApi.translate()
}

module.exports.assembly = assembly