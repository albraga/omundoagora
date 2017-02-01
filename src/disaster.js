import Country from './country'

export default class Disaster extends Country {
    constructor(iso3, name, lat, lng, nameTitle, description) {
        super(iso3, name, lat, lng)
        this.nameTitle = nameTitle
        this.description = description
    }
    toMarkerOptions(map) {
        let mo = super.toMarkerOptions(map)
        //mo.title = this.nameTitle
        mo.title = this.name
        return mo
    }
}