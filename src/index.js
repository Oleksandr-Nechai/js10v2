import './css/styles.css';
import './sass/main.scss';
import elementsRefs from './js/elementsRefs';
import ApiCountryService from "./js/fetchCountry";
import CreateMarkup from './js/createMarkup'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; 

const DEBOUNCE_DELAY = 500;

const refs = elementsRefs()

const messageOptions = {width: '450px',fontSize: '26px',distance: '25px',borderRadius: '10px',timeout: 1000,};

let inputValue = "";

const apiCountryService = new ApiCountryService()

const createMarkup = new CreateMarkup(refs,messageOptions)

refs.form.addEventListener('input',debounce(handleInputChange,DEBOUNCE_DELAY))
refs.form.addEventListener('submit',e=>e.preventDefault())



function handleInputChange (e) { 

    const valueTrim = e.target.value.trim()

    if(!valueTrim) {
        createMarkup.data=[];
        inputValue="";
        Notiflix.Notify.warning('Enter country name',messageOptions);;
        createMarkup.clearMarkup()
     
        return
    }

    if(inputValue===valueTrim) {return }

    inputValue = valueTrim    
                
    apiCountryService.name=inputValue;

    apiCountryService.fetchCountries().
    then(dataArrayCountries=>createMarkup.createCountryCardMarkup(dataArrayCountries)).
    catch(()=>{createMarkup.clearMarkup(), createMarkup.data=[]
        Notiflix.Notify.failure("Oops!, there is no country with that name",messageOptions)})
}





