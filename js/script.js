"use strict"

let $ = document // دسترسی به document

// انتخاب عناصر ورودی و دکمه
let userNameInput = $.querySelector(`.username`)
let passWordInput = $.querySelector(`.password`)
let modal = $.querySelector(`.modal`)
let togglePasswordButton = $.querySelector(`.toggle-password`) // دکمه نمایش/مخفی کردن پسورد

// اعتبارسنجی داده‌های ورودی
function dataValidation() {
    let userNameValue = userNameInput.value
    let passwordValue = passWordInput.value

    // بررسی وجود کاربر در localStorage
    if (localStorage.getItem(userNameValue, passwordValue)) {
        modal.style.background = `red`
        modal.innerHTML = `قبلاً ثبت‌ نام کرده است ${userNameValue}کاربر با نام`
        modal.style.display = `inline`
        clearInputs()

    // بررسی طول نام کاربری و رمز عبور
    } else if (userNameValue.length < 5 || passwordValue.length < 8) {
        modal.style.background = `red`
        modal.innerHTML = `لطفا اطلاعات را به درستی وارد نمایید`
        modal.style.display = `inline`
    } else {
        // ذخیره اطلاعات در localStorage
        localStorage.setItem(userNameValue, passwordValue)
        modal.style.background = `green`
        modal.innerHTML = `لاگین با موفقیت انجام شد`
        modal.style.display = `inline`
        clearInputs()
    }

    // مخفی کردن مدال بعد از ۳ ثانیه
    setTimeout(function() {
        modal.style.display = `none`
    }, 3000)
}

// افزودن رویداد کلید Enter برای ورودی‌ها
function addEnterKeyListener(inputElement) {
    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            dataValidation()
        }
    })
}

addEnterKeyListener(passWordInput)
addEnterKeyListener(userNameInput)

// پاک کردن ورودی‌ها
function clearInputs() {
    userNameInput.value = ``
    passWordInput.value = ``
}

// نمایش و مخفی کردن پسورد
togglePasswordButton.addEventListener('click', function() {
    passWordInput.type = (passWordInput.type === 'password') ? 'text' : 'password'
    togglePasswordButton.classList.toggle("active");
})

// اعتبارسنجی نام کاربری
function usernameValidation() {
    if (usernameInput.value.length < 13) {
        usernameMessage.style.display = `block`
        userNameInput.style["boxShadow"] = "0px 0px 20px 0px red"
    } else {
        usernameMessage.style.display = `none`
        userNameInput.style["boxShadow"] = "none"
    }
}

// اعتبارسنجی رمز عبور
function passwordValidation() {
    if (passwordInput.value.length < 8) {
        passwordMessage.style.display = `block`
        passWordInput.style["boxShadow"] = "0px 0px 20px 0px red"
    } else {
        passwordMessage.style.display = `none`
        passWordInput.style["boxShadow"] = "none"
    }
}

// تغییر رنگ پس‌زمینه با زمان
let lomp = $.querySelector('.lomp')
setInterval(function() {
    let redValue = Math.floor(Math.random() * 255)
    let greenValue = Math.floor(Math.random() * 255)
    let blueValue = Math.floor(Math.random() * 255)
    lomp.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`
}, 1000)

// افکت انیمیشن دو بار کلیک
lomp.addEventListener('dblclick', function() {
    lomp.classList.add('explode-animation')
})

// پاک کردن عناصر بعد از انیمیشن
lomp.addEventListener('animationend', function() {
    lomp.remove()
})

// شمارش کاراکتر ورودی
const inputElem = $.querySelector(`form input`)
const spanElem = $.querySelector(`.counter`)
const inputMaxLength = inputElem.getAttribute(`maxlength`)

inputElem.addEventListener(`keyup`, function() {
    spanElem.innerHTML = inputMaxLength - inputElem.value.length
})

// مدیریت مدال
const button = $.querySelector(`p button`)
const modalParent = $.querySelector(`.modal-parent`)
const x = $.querySelector(`.X`)
const sectionElem = $.querySelector(`section`)

function showModal() {
    modalParent.style.display = `block`
    sectionElem.style.filter = `blur(10px)` // تاری
}

function hideModalWithX() {
    modalParent.style.display = `none`
    sectionElem.style.filter = `blur(0px)` // حذف تاری
}

// مخفی کردن مدال با کلید Esc
function hideModalWithEsc(event) {
    if (event.keyCode === 27) {
        modalParent.style.display = `none`
        sectionElem.style.filter = `blur(0px)` // حذف تاری
    }
}

button.addEventListener(`click`, showModal)
x.addEventListener(`click`, hideModalWithX)
document.body.addEventListener(`keyup`, hideModalWithEsc)

// تغییر تم
const switchElement = document.querySelector(`.switch`)
switchElement.addEventListener(`click`, function() {
    $.body.classList.toggle(`dark`) // تغییر تم تاریک/روشن
    localStorage.setItem(`theme`, $.body.className.includes(`dark`) ? `dark` : `light`) // ذخیره تم
})

// بارگذاری تم ذخیره شده
window.onload = function() {
    if (localStorage.getItem(`theme`) === `dark`) {
        $.body.classList.add(`dark`) // بارگذاری تم تاریک
    }
}
