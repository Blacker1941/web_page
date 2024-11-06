"use strict"

// کوتاه کننده سند
let $ = document

// تغییر تم روشن/تاریک با کلیک
const switchElement = document.querySelector(`.switch`)

switchElement.addEventListener(`click`, function () {
    // تغییر کلاس به تاریک یا روشن
    $.body.classList.toggle(`dark`)

    // ذخیره تم در localStorage
    if (document.body.className.includes(`dark`)) {
        localStorage.setItem(`theme`, `dark`)
    } else {
        localStorage.setItem(`theme`, `light`)
    }
})

// بارگذاری تم ذخیره‌شده از localStorage
window.onload = function () {
    let localStorageTheme = localStorage.getItem(`theme`)
    if (localStorageTheme === `dark`) {
        $.body.classList.add(`dark`)
    }
}

// المان‌های ورودی وزن و قد و مقادیر نمایش داده شده
const weightInpute = $.querySelector(`#weight`)
const heightInpute = $.querySelector(`#height`)
const weightVal = $.querySelector(`#weight-val`)
const heightVal = $.querySelector(`#height-val`)
const bmiResult = $.querySelector(`#result`)
const categoryElem = $.querySelector(`#category`)

// محاسبه BMI و نمایش دسته بندی
function bmiCalculator() {
    let weightInputeValue = weightInpute.value
    let heightInputeValue = heightInpute.value

    // نمایش وزن و قد وارد شده
    weightVal.innerHTML = weightInputeValue
    heightVal.innerHTML = heightInputeValue

    // محاسبه BMI
    let bmiValue = (weightInputeValue / (Math.pow(heightInputeValue / 100, 2))).toFixed(1)

    bmiResult.innerHTML = bmiValue

    // تعیین و نمایش دسته‌بندی BMI با رنگ‌ها
    if (bmiValue < 16) {
        categoryElem.innerHTML = `SERVERE THINNESS`
        bmiResult.style.color = `#d32f2e`
    } else if(bmiValue >= 16 && bmiValue < 17) {
        categoryElem.innerHTML = `MODERATE THINNESS`
        bmiResult.style.color = `#f5511e`
    } else if (bmiValue >= 17 && bmiValue < 18.5) {
        categoryElem.innerHTML = `MILD THINNESS`
        bmiResult.style.color = `#ff9f00`
    } else if (bmiValue >= 18.5 && bmiValue < 25){
        categoryElem.innerHTML = `NORMAL`
        bmiResult.style.color = `#009788`
    } else if (bmiValue >= 25 && bmiValue < 30){
        categoryElem.innerHTML = `OVERWEIGHT`
        bmiResult.style.color = `#00acc2`
    } else if (bmiValue >= 30 && bmiValue < 35){
        categoryElem.innerHTML = `OBESE CLASS I`
        bmiResult.style.color = `#ff9f00`
    } else if (bmiValue >= 35 && bmiValue < 40){
        categoryElem.innerHTML = `OBESE CLASS II`
        bmiResult.style.color = `#f5511e`
    } else if (bmiValue >= 40 && bmiValue < 45){
        categoryElem.innerHTML = `OBESE CLASS III`
        bmiResult.style.color = `#d32f2e`
    } else {
        categoryElem.innerHTML = `PROBABLY DEATH`
        bmiResult.style.color = `#000000`
    }
}

// بروزرسانی BMI با تغییر وزن یا قد
weightInpute.addEventListener(`input`, bmiCalculator)
heightInpute.addEventListener(`input`, bmiCalculator)
