import './css/styles.css';
import elementsRefs from './js/elementsRefs';
import ApiCountryService from "./js/fetchCountry";

const DEBOUNCE_DELAY = 300;

const refs = elementsRefs()

const apiCountryService = new ApiCountryService()


function handleInputChange (e) {
    apiCountryService.name=e.currentTarget.country.value;
        apiCountryService.fetchCountries().then(console.log).catch(error=>console.log(`${error} !!!fff`))
}
refs.form.addEventListener('input',handleInputChange)