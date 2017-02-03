<template>
  <div id="mapa">
    <div id="map_entry_point"></div>
      <input ref="input" type="number" v-bind:value="zoomprop" v-on:change="changeZoom($event.target.value)">         
      <button @click="addDisasters">{{ bname }}</button>
      {{ initMap() }}
  </div>
</template>

<script>
  import $script from 'scriptjs'
  import disastersApiLoader from './disasters-api-loader'
  import earthquakesLoader from './earthquakers-loader'
  import disastersTranslated from './disasters-translated'

  disastersApiLoader.loadDisasters()
  earthquakesLoader.loadEarthquakes()
  
  let map 

  export default {
    name: 'mapa',
    data: function() {
      return {
        bname: 'Desastres'
      }
    },
    props: {
      zoomprop: {
        type: Number,
        default: 2
      }
    },
    methods: {
      initMap: init,
      addDisasters: addDisasters,
      changeZoom: changeZoom
    }
  }

   function cbMap() {
    map = new google.maps.Map(document.getElementById('map_entry_point'), {
      center: {lat: 28.304381, lng: 10.195313},
      zoom: 2
    })
  }

  function init() {
    $script('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRugSnW6uPDAmw9R2_yBoSqOx87A8eGL8', 'gmp', cbMap)
  }

  function changeZoom(zoomprop) {
    this.$emit('input', zoomprop)
    $script.ready('gmp', ()=> {
      map.setZoom(parseInt(this.$refs.input.value))
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


  
</script>

<style>
#map_entry_point {
  height: 500px;
}
</style>
