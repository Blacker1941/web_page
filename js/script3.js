"use strict"

let citiesData = {
    tehran: { city: `Tehran`, temp: 12, weather: `sunny`, humidity: 23, windSpeed: 32 },
    qom: { city: `Qom`, temp: 50, weather: `sunny`, humidity: 1, windSpeed: 0 },
    shiraz: { city: `Shiraz`, temp: 16, weather: `rainy`, humidity: 40, windSpeed: 29 },
    tabriz: { city: `Tabriz`, temp: 89, weather: `snowy`, humidity: 33, windSpeed: 99 },
    nakojaAbad: { city: `NakojaAbad`, temp: 100, weather: `rainy`, humidity: 999, windSpeed: 999 },
    mashhad: { city: `Mashhad`, temp: 1, weather: `sunny`, humidity: 6, windSpeed: 666 },
    esfehan: { city: `Esfehan`, temp: -66, weather: `snowy`, humidity: 88, windSpeed: 1000 },
}

let $ = document
let searchBtn = $.getElementById(`search`)
let searchBar = $.querySelector(`.search-bar`)

searchBtn.addEventListener(`click`, function () {
    let searchBarValue = searchBar.value.toLowerCase();
    let mainCityDatas = citiesData[searchBarValue];

    console.log(mainCityDatas)

    if (mainCityDatas) {
        $.querySelector(`.city`).innerHTML = "Weather in " + mainCityDatas.city
        $.querySelector(`.temp`).innerHTML = mainCityDatas.temp + `°C`
        $.querySelector(`.description`).innerHTML = mainCityDatas.weather
        $.querySelector(`.humidity`).innerHTML = "Humidity: " + mainCityDatas.humidity
        $.querySelector(`.wind`).innerHTML = "Wind speed: " + mainCityDatas.windSpeed + `km/h`
        $.querySelector(`.weather`).classList.remove(`loading`)
    } else {
        alert(`شهر مورد نظر را به درستی وارد نمایید`)
    }
})


searchBar.addEventListener(`keydown`, function (event) {
  if (event.keyCode === 13) {
    let searchBarValue = searchBar.value.toLowerCase();
    let mainCityDatas = citiesData[searchBarValue]; 
    console.log(mainCityDatas)

    if (mainCityDatas) {
        $.querySelector(`.city`).innerHTML = "Weather in " + mainCityDatas.city
        $.querySelector(`.temp`).innerHTML = mainCityDatas.temp + `°C`
        $.querySelector(`.description`).innerHTML = mainCityDatas.weather
        $.querySelector(`.humidity`).innerHTML = "Humidity: " + mainCityDatas.humidity
        $.querySelector(`.wind`).innerHTML = "Wind speed: " + mainCityDatas.windSpeed + `km/h`
        $.querySelector(`.weather`).classList.remove(`loading`)
    } else {
        alert(`شهر مورد نظر را به درستی وارد نمایید`)
    }
  }
})

// let citiesData = [
//   {city: `tehran `, temp: 12, weather: `sunney`, humidity: 23, windSpeed: 32 },
//   {city: `qom `, temp: 50, weather: `sunney`, humidity: 1, windSpeed: 0 },
//   {city: `shiraz `, temp: 16, weather: `rainy`, humidity: 40, windSpeed: 29 },
//   {city: `tabriz `, temp: 89, weather: `snowy`, humidity: 33, windSpeed: 99 },
//   {city: `nakojaAbad `, temp: 100, weather: `rainy`, humidity: 999, windSpeed: 999 },
//   {city: `mashhad `, temp: 1, weather: `sunney`, humidity: 6, windSpeed: 666 },
//   {city: `esfehan `, temp: -66, weather: `snowy`, humidity: 88, windSpeed: 1000 },
// ]

// let searchBtn = $.getElementById(`search`)
// let searchBar = $.querySelector(`.search-bar`)

// searchBtn.addEventListener(`click`, function () {
//     let searchBarValue = searchBar.value

//   let mainCityDatas = citiesData.find(function (item) {
//     return item.city === searchBarValue
//     })

//     console.log(mainCityDatas)

//     if (mainCityDatas) {
//       $.querySelector(`.city`).innerHTML = "Weather in " + mainCityDatas.city
//       $.querySelector(`.temp`).innerHTML = mainCityDatas.temp + `°C`
//       $.querySelector(`.description`).innerHTML = mainCityDatas.weather
//       $.querySelector(`.humidity`).innerHTML = "Humidity: " +  mainCityDatas.humidity
//       $.querySelector(`.wind`).innerHTML = "Wind speed: " +  mainCityDatas.windSpeed + `km/h`
//       $.querySelector(`.weather`).classList.remove(`loading`)
//     } else {
//       alert(`شهر مورد نظر را به درستی وارد نمایید`)
//     }

//   })

let image = $.getElementById(`B1`)

const contextMenu = $.getElementById(`contextMenu`)


function contextHandler(event) {
  event.preventDefault()

  if (contextMenu.style.display === `none`) {

    contextMenu.style.left = event.pageX + `px`
    contextMenu.style.top = event.pageY + `px`

    contextMenu.style.display = `block`
  } else {
    contextMenu.style.left = event.pageX + `px`
    contextMenu.style.top = event.pageY + `px`
  }
}

function clickConTextMenu() {
  contextMenu.style.display = `none`
}

function keyDownHandler(event) {
  if (event.keyCode === 27)
    contextMenu.style.display = `none`
}

$.body.addEventListener(`contextmenu`, contextHandler)
$.body.addEventListener(`click`, clickConTextMenu)
$.body.addEventListener(`keydown`, keyDownHandler)