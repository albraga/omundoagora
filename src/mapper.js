import $script from 'scriptjs'
import disastersTranslated from './disasters-translated'

// let map
// $script('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRugSnW6uPDAmw9R2_yBoSqOx87A8eGL8', 'gmp', function() {
//     map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 28.304381, lng: 10.195313},
//           zoom: 2
//     })
// })

function changeZoom() {
    $script.ready('gmp', ()=> {
        map.setZoom(this.zoom)
    })
}

function addMarkerAndGeoJSONandInfoWindow(disaster) {
    $script.ready('gmp', function() {
        map.data.loadGeoJson(disaster.getGeoJSON())
        let infowindow = new google.maps.InfoWindow({
            content: disaster.description,
            maxWidth: 200
        });
        let marker = []
        marker[disaster.iso3] = new google.maps.Marker(disaster.toMarkerOptions(map))
        marker[disaster.iso3].addListener('click', function() {
            infowindow.open(map, marker[disaster.iso3])
        }) 
    })
}

function addDisasters() {
    let disasters = disastersTranslated.getDisasters()
    for(let disaster of disasters) {
        addMarkerAndGeoJSONandInfoWindow(disaster)
    }
}

module.exports.changeZoom = changeZoom
module.exports.addDisasters = addDisasters