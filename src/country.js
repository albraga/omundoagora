export default class Country {
    constructor(iso3, name, lat, lng) {
        this.flagWidth = 800
        this.flagHeight = 500 
        this.iso3 = iso3
        this.name = name
        this.lat = lat
        this.lng = lng 
    }
    getLabel() {
        return {
            text: this.name, 
            fontSize: '14px'
        }
    }
    getPosition() {
        return {
            lat: this.lat, 
            lng: this.lng
        }
    }
    getGeoJSON() {
        return `data/${this.iso3}.geo.json`
    }
    getFlag() {
        return {
            url: `data/${this.iso3}.svg`,
            size: {width: this.flagWidth, height: this.flagHeight},
            scaledSize: {width: this.flagWidth/20, height: this.flagHeight/20},
            labelOrigin: {x: 0, y: 0},
            origin: {x: 0, y: 0},
            anchor: {x: 0, y: 0}
        }
    }
    getFlagShape() {
        return {
          coords: [0, 0, this.flagWidth/20, this.flagHeight/20],
          type: 'rect'
        }
    }
    toMarkerOptions(map) {
        return {
          position: this.getPosition(),
          //label: this.getLabel(),
          icon: this.getFlag(),
          shape: this.getFlagShape(),
          map: map
        }
    }
}