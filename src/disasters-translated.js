import disastersMaker from './disasters-maker'
import translator from './translator'

function getDisasters() {
    let disastersPt = []
    let disastersEng = disastersMaker.getDisasters()
    for(let disaster of disastersEng) {
        translator.translate(disaster.description, disaster.iso3)
        disaster.description = translator.getTranslation(disaster.iso3)
        disastersPt.push(disaster)
    }
    return disastersPt
}

module.exports.getDisasters = getDisasters