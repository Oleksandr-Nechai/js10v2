import Notiflix from 'notiflix';

export default class CreateMarkup {
   
        #isInfo;
        #isList;

    constructor(refs,messageOptions){
        this.#isInfo=false;
        this.#isList=false;

        this.messageOptions=messageOptions;
        this.dataArray=[];
        this.refs=refs;
    }
   
    #createCountryListMarkup () {
        this.#isList=true;
        const stringCountryListMarkup = this.dataArray.map(({flags,name:{official}})=>`<li class="country-item"><img class="country-flags" src="${flags.svg}" alt="flag ${official}"><p class="country-name">${official}</p></li>`).join('')

        this.#insertMarkup(stringCountryListMarkup)
        Notiflix.Notify.success('Searching results', this.messageOptions);
    }
   
    #createOneSelectedCountryMarkup (){
        this.#isInfo=true;
        const {flags:{svg},name:{official},capital,population,languages} = this.dataArray[0]
        const languagesInCountry = Object.values(languages).join(', ')
        const stringCountryMarkup = `<li class= "country-item"><img class = "selected-flags" src="${svg}" alt="flag ${official}"><p class="selected-name">${official}</p></li><ul class="selected-list"><li>Capital: <span>${capital}</span></li><li>Population: <span>${population}</span></li><li>Languages: <span>${languagesInCountry}</span></li></ul>`;

        this.#insertMarkup(stringCountryMarkup,"info");
        Notiflix.Notify.success('Searching results', this.messageOptions);
    
}

    #insertMarkup(string,position="list"){
        this.refs[position].innerHTML=string;
   }

    clearMarkup () {
    if(this.#isInfo){
        this.#insertMarkup("","info")
        this.#isInfo=false;
    }
    if(this.#isList){
        this.#insertMarkup("")
        this.#isList=false;
    }
   }
    createCountryCardMarkup (dataArrayCountries){
        const isNameEqual = this.dataArray[0]?.name?.official===dataArrayCountries[0]?.name?.official
        const amount=dataArrayCountries.length;

        if(amount===1 && isNameEqual) {
            return
        }
        
        this.dataArray=dataArrayCountries;
        
        this.clearMarkup ()

        if(amount>=10){Notiflix.Notify.info("Too many matches found. Please enter a more specific name.",this.messageOptions);
            this.dataArray=[];} 
        else if(amount>1){this.#createCountryListMarkup (),this.dataArray=[];} 
        else if (amount) {this.#createOneSelectedCountryMarkup()} 
        else {Notiflix.Notify.failure("Oops, there is no country with that name", this.messageOptions)
            this.dataArray=[];}

        }

        
    get data () {
        return this.dataArray
    };

    set data(newData){
        this.dataArray=newData
    }

}