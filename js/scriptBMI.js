"use strict"

let $ = document

const switchElement = document.querySelector('.switch')

switchElement.addEventListener('click', function () {
    $.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})


window.onload = function () {
    let localStorageTheme = localStorage.getItem('theme')

    if (localStorageTheme === 'dark') {
        $.body.classList.add('dark')
    }
}

const weightInpute = $.querySelector('#weight')
const heightInpute = $.querySelector('#height')
const weightVal = $.querySelector('#weight-val')
const heightVal = $.querySelector('#height-val')
const bmiResult = $.querySelector('#result')
const categoryElem = $.querySelector('#category')

function bmiCalculator() {
    let weightInputeValue = weightInpute.value
    let heightInputeValue = heightInpute.value

    weightVal.innerHTML = weightInputeValue
    heightVal.innerHTML = heightInputeValue

    let bmiValue = (weightInputeValue / (Math.pow(heightInputeValue / 100, 2))).toFixed(1)

    bmiResult.innerHTML = bmiValue

    if (bmiValue < 16) {
        categoryElem.innerHTML = 'SERVERE THINNESS'
        bmiResult.style.color = '#d32f2e'
    } else if(bmiValue >= 16 && bmiValue < 17) {
        categoryElem.innerHTML = 'MODERATE THINNESS'
        bmiResult.style.color = '#f5511e'
    } else if (bmiValue >= 17 && bmiValue < 18.5) {
        categoryElem.innerHTML = 'MILD THINNESS'
        bmiResult.style.color = '#ff9f00'
    } else if (bmiValue >= 18.5 && bmiValue < 25){
        categoryElem.innerHTML = 'NORMAL'
        bmiResult.style.color = '#009788'
    } else if (bmiValue >= 25 && bmiValue < 30){
        categoryElem.innerHTML = 'OVERWEIGHT'
        bmiResult.style.color = '#00acc2'
    } else if (bmiValue >= 30 && bmiValue < 35){
        categoryElem.innerHTML = 'OBESE CLASS I'
        bmiResult.style.color = '#ff9f00'
    } else if (bmiValue >= 35 && bmiValue < 40){
        categoryElem.innerHTML = 'OBESE CLASS II'
        bmiResult.style.color = '#f5511e'
    } else if (bmiValue >= 40 && bmiValue < 45){
        categoryElem.innerHTML = 'OBESE CLASS III'
        bmiResult.style.color = '#d32f2e'
    } else {
        categoryElem.innerHTML = 'PROBABLY DEATH'
        bmiResult.style.color = '#000000'
    }
}

weightInpute.addEventListener('input', bmiCalculator)
heightInpute.addEventListener('input', bmiCalculator)