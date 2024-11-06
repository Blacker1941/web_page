"use strict"

let $ = document // دسترسی به document
const inputElem = $.querySelector(`input`) // عنصر ورودی

let apiData = {
    url: `https://api.openweathermap.org/data/2.5/weather?`, // URL API
    key: `f14909fd3575f37b7f6a5bc9ae78a9cf` // کلید API
}

// دریافت موقعیت جغرافیایی کاربر
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation) // موفقیت یا خطا
    } else {
        alert("Geolocation is not supported by this browser") // پیام خطا
    }
}

// موفقیت: دریافت مختصات و گرفتن آب‌وهوا
function successLocation(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    fetchWeatherByLocation(lat, lon)
}

// خطا: پیام برای وارد کردن شهر به صورت دستی
function errorLocation() {
    alert("Unable to retrieve your location. Please enter a city manually")
}

// دریافت آب‌وهوا بر اساس مختصات
function fetchWeatherByLocation(lat, lon) {
    fetch(`${apiData.url}lat=${lat}&lon=${lon}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showData(data)
        })
}

// دریافت آب‌وهوا بر اساس نام شهر
function fatchData() {
    let countryValue = inputElem.value
    fetch(`${apiData.url}q=${countryValue}&appid=${apiData.key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            showData(data)
        })
}

// نمایش داده‌های آب‌وهوا
function showData(data) {
    $.querySelector(`.city`).innerHTML = `${data.name}, ${data.sys.country}`
    $.querySelector(`.date`).innerHTML = showDate()
    $.querySelector(`.temp`).innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`
    $.querySelector(`.weather`).innerHTML = `${data.weather[0].main}`
    $.querySelector(`.hi-low`).innerHTML = `${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}°c`
}

// نمایش تاریخ جاری
function showDate() {
    let now = new Date()
    return `${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][now.getDay()]} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()]} ${now.getFullYear()} ${now.getDate()}`
}

// افزودن رویداد برای کلید Enter
inputElem.addEventListener(`keypress`, (event) => {
    if (event.keyCode === 13) {
        fatchData() // دریافت آب‌وهوا بر اساس نام شهر
    }
})

// بارگذاری صفحه: دریافت موقعیت جغرافیایی
window.addEventListener("load", getUserLocation)
