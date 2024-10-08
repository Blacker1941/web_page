"use strict"

let $ = document

let countrySelectBox = document.querySelector(`.countrySelect`)
let citySelect = document.querySelector(`.citySelect`)

let countriesData = {
    Iran: [`Tehran`, `Shiraz`, `Tabriz`, `Esfehan`, `Arak`, `Pasargadae`],
    Turkey: [`Error ***`],
    US: [`Los Angles`, `San Diego`, `New York`]
}

countrySelectBox.addEventListener(`change`, function() {

    if (countrySelectBox.value === `Please Select`) {
        citySelect.innerHTML = ``
        citySelect.innerHTML += "<option>Select City ...</option>"
    } else {
        let mainCounteryName = countrySelectBox.value
        let mainCounteryCities = countriesData[mainCounteryName]

        citySelect.innerHTML = ``

        mainCounteryCities.forEach(function(city) {

            citySelect.innerHTML += `<option>` + city + `</option>`
        })
    }


})