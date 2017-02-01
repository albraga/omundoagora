import ajax from 'ajax'

function loadEarthquakes() {
    const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=today&minmagnitude=4'
    
    let earthquakesAjax = ajax({
        method: 'GET',
        url: URL
    })

    earthquakesAjax.then(function(response) {
        let earthquakesRawArray = response.features
        console.log(earthquakesRawArray[0].properties.place) 
    })


}

module.exports.loadEarthquakes = loadEarthquakes