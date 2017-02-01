import countriesMatrix from './countries-matrix'

function initBlankStorage() {
for(let x = 0; x < countriesMatrix.length; x++) {
    localStorage.setItem(countriesMatrix[x][0], '')
}
}

module.exports.initBlankStorage = initBlankStorage
