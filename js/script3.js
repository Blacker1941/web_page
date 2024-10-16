"use strict"

let $ = document

const inputElem = $.querySelector(`input`)

let apiData = {
    url: `https://api.openweathermap.org/data/2.5/weather?`,
    key: `f14909fd3575f37b7f6a5bc9ae78a9cf`
}


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
    } else {
        alert("Geolocation is not supported by this browser")
    }
}


function successLocation(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    fetchWeatherByLocation(lat, lon)
}


function errorLocation() {
    alert("Unable to retrieve your location. Please enter a city manually")
}


function fetchWeatherByLocation(lat, lon) {
    fetch(`${apiData.url}lat=${lat}&lon=${lon}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showData(data)
        })
}


function fatchData() {
    let countryValue = inputElem.value

    fetch(`${apiData.url}q=${countryValue}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showData(data)
        })
}


function showData(data) {
    let cityElem = $.querySelector(`.city`)
    cityElem.innerHTML = `${data.name}, ${data.sys.country}`

    let dateElem = $.querySelector(`.date`)
    dateElem.innerHTML = showDate()

    let tempElem = $.querySelector(`.temp`)
    tempElem.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`

    let weatherElem = $.querySelector(`.weather`)
    weatherElem.innerHTML = `${data.weather[0].main}`

    let tempsElem = $.querySelector(`.hi-low`)
    tempsElem.innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}°c`
}


function showDate() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let now = new Date()

    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()
    let date = now.getDate()

    return `${day} ${month} ${year} ${date}`
}


inputElem.addEventListener(`keypress`, (event) => {
    if (event.keyCode === 13) {
        fatchData()
    }
})


window.addEventListener("load", getUserLocation)