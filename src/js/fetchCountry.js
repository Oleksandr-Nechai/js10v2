const BASE_URL = 'https://restcountries.com/v3.1/name/'


export default class ApiCountryService {
    constructor(){
     this.nameContry=""
    }

    fetchCountries () {return fetch (`${BASE_URL}${this.nameContry}?fields=name,capital,population,flags,languages`).then(response=>response.json())}

    get name () {
        return this.nameContry
    }
     
    set name (newName) {
        this.nameContry = newName
    }
}
