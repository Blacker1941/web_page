"use strict"

let $ = document

let userNameInput = $.querySelector(`.username`)
let passWordInput = $.querySelector(`.password`)
let modal = $.querySelector(`.modal`)
let togglePasswordButton = $.querySelector(`.toggle-password`) // دکمه تغییر نمایش پسورد

function dataValidation() {
    let userNameValue = userNameInput.value
    let passwordValue = passWordInput.value

    if (localStorage.getItem(userNameValue, passwordValue)) {
        modal.style.background = `red`
        modal.innerHTML = `قبلاً ثبت‌ نام کرده است ${userNameValue}کاربر با نام`
        modal.style.display = `inline`
        clearInputs()

    } else if (userNameValue.length < 5 || passwordValue.length < 8) {
        modal.style.background = `red`
        modal.innerHTML = `لطفا اطلاعات را به درستی وارد نمایید`
        modal.style.display = `inline`

    } else {
        localStorage.setItem(userNameValue, passwordValue)

        modal.style.background = `green`
        modal.innerHTML = `لاگین با موفقیت انجام شد`
        modal.style.display = `inline`
        clearInputs()
    }

    setTimeout(function() {
        modal.style.display = `none`
    }, 3000)
}

function addEnterKeyListener(inputElement) {
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            dataValidation()
        }
    })
}

addEnterKeyListener(passWordInput)
addEnterKeyListener(userNameInput)

function clearInputs() {
    userNameInput.value = ``
    passWordInput.value = ``
}

togglePasswordButton.addEventListener('click', function() {
    if (passWordInput.type === 'password') {
        passWordInput.type = 'text'
        togglePasswordButton.classList.add("active");
    } else {
        passWordInput.type = 'password'
        togglePasswordButton.classList.remove("active");
    }
})

let usernameInput = $.querySelector(`.username`)
let passwordInput = $.querySelector(`.password`)
let usernameMessage = $.querySelector(`.username-validation`)
let passwordMessage = $.querySelector(`.password-validation`)

function usernameValidation() {
    if (usernameInput.value.length < 13) {
        usernameMessage.style.display = `block`
        userNameInput.style["boxShadow"] = "0px 0px 20px 0px red"
        usernameMessage.style["padding-bottom"] = "13px"
    } else {
        usernameMessage.style.display = `none`
        userNameInput.style["boxShadow"] = "0px 0px 0px 0px red"
        passwordMessage.style["padding-bottom"] = "13px"
    }
}

function passwordValidation() {
    if (passwordInput.value.length < 8) {
        passwordMessage.style.display = `block`
        passWordInput.style["boxShadow"] = "0px 0px 20px 0px red"
    } else {
        passwordMessage.style.display = `none`
        passWordInput.style["boxShadow"] = "0px 0px 0px 0px red"
    }
}

let lomp = $.querySelector('.lomp')
let box = $.querySelector('.box')

setInterval(function() {
    let redValue = Math.floor(Math.random() * 255)
    let greenValue = Math.floor(Math.random() * 255)
    let blueValue = Math.floor(Math.random() * 255)
    lomp.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
}, 1000)

lomp.addEventListener('dblclick', function() {
    lomp.classList.add('explode-animation')
    box.classList.add('explode-animation')
})

lomp.addEventListener('animationend', function() {
    lomp.remove()
    box.remove()
})

const inputElem = $.querySelector(`form input`)
const spanElem = $.querySelector(`.counter`)
const inputMaxLength = inputElem.getAttribute(`maxlength`)

inputElem.addEventListener(`keyup`, function() {
    spanElem.innerHTML = inputMaxLength - inputElem.value.length
})

const button = $.querySelector(`p button`)
const modalParent = $.querySelector(`.modal-parent`)
const x = $.querySelector(`.X`)
const sectionElem = $.querySelector(`section`)

function showModal() {
    modalParent.style.display = `block`
    sectionElem.style.filter = `blur(10px)`
}

function hideModalWithX() {
    modalParent.style.display = `none`
    sectionElem.style.filter = `blur(0px)`
}

function hideModalWithEsc(event) {
    if (event.keyCode === 27) {
        modalParent.style.display = `none`
        sectionElem.style.filter = `blur(0px)`
    }
}

button.addEventListener(`click`, showModal)
x.addEventListener(`click`, hideModalWithX)
document.body.addEventListener(`keyup`, hideModalWithEsc)

const switchElement = document.querySelector(`.switch`)

switchElement.addEventListener(`click`, function() {
    $.body.classList.toggle(`dark`)

    if (document.body.className.includes(`dark`)) {
        localStorage.setItem(`theme`, `dark`)
    } else {
        localStorage.setItem(`theme`, `light`)
    }
})

window.onload = function() {
    let localStorageTheme = localStorage.getItem(`theme`)

    if (localStorageTheme === `dark`) {
        $.body.classList.add(`dark`)
    }
}