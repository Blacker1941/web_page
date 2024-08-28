let $ = document

let userNameInput = $.querySelector('.username')
let passWordInput = $.querySelector('.password')
let modal = $.querySelector('.modal')


function dataValidation() {
    let userNameValue = userNameInput.value
    let passwordValue = passWordInput.value

    if (userNameValue.length < 12 || passwordValue.length < 8) {
        // alert('Error')
        modal.style.background = 'rgb(223, 28, 28)'
        modal.innerHTML = 'لطفا اطلاعات را به درستی وارد نمایید'
        modal.style.display = 'inline'

    } else {
        modal.style.background = 'green'
        modal.innerHTML = 'لاگین با موفقیت انجام شد'
        modal.style.display = 'inline'
    }

    setTimeout(function () {
        modal.style.display = 'none'
    }, 3000)
}

// let usernameMessage = document.querySelector('.username-validation')
// let passwordMessage = document.querySelector('.password-validation')

// let usernameInput = document.querySelector('.username')
// let passwordInput = document.querySelector('.password')

// function usernameValidathion() {
//     //alert('pidaRET')
//     if (usernameInput.value.length < 8) {
//         usernameMessage.innerHTML = 'At least 12 characters'
//         usernameMessage.style.display = 'block'
//     } else {
//         usernameMessage.style.display = 'none'
//     }
// }
// function passwordValidation() {
//     //alert('PIODAREYWE')
//     if (passWordInputInput.value.length < 8) {
//         passwordMessage.innerHTML = 'At least 8 characters'
//         passwordMessage.style.display = 'block'
//     } else {
//         passwordMessage.style.display = 'none'
//     }
// }

let usernameInput = $.querySelector('.username')
let passwordInput = $.querySelector('.password')

let usernameMessage = $.querySelector('.username-validation')
let passwordMessage = $.querySelector('.password-validation')


function usernameValidation() {
    if (usernameInput.value.length < 12) {
        usernameMessage.style.display = 'block'
        userNameInput.style["boxShadow"] = "0px 0px 20px 0px red"
        usernameMessage.style["padding-bottom"] = "13px"

    } else {
        usernameMessage.style.display = 'none'
        userNameInput.style["boxShadow"] = "0px 0px 0px 0px red"
        passwordMessage.style["padding-bottom"] = "13px"
    }
}
function passwordValidation() {
    if (passwordInput.value.length < 8) {
        passwordMessage.style.display = 'block'
        passWordInput.style["boxShadow"] = "0px 0px 20px 0px red"
    }else {
        passwordMessage.style.display = 'none'
        passWordInput.style["boxShadow"] = "0px 0px 0px 0px red"

    }
}

let redValue, greenValue, BlueValue
let lomp = $.querySelector('.lomp')

setInterval(function () {

    redValue = Math.floor(Math.random() * 255)
    greenValue = Math.floor(Math.random() * 255)
    BlueValue = Math.floor(Math.random() * 255)

    lomp.style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + BlueValue + ')'
}, 1000)

function _id(id_name) {
  return $.getElementById(id_name);
}

function _class(class_name) {
  return $.getElementsByClassName(class_name);
}

// Select Elems
var togglePassword = _class("toggle-password");
var passwordField = _id("password-field");

// Fire click event on eye icon
togglePassword[0].addEventListener("click", function () {
  if (passwordField.type == "text") {
    passwordField.type = "password";
    togglePassword[0].classList.remove("active");
  } else {
    passwordField.type = "text";
    togglePassword[0].classList.add("active");
  }
})

let btn = $.querySelector('lomp')
let lompElem = $.getElementById('titel')
let boxElem = $.getElementsByClassName('box')

btn.addEventListener('dblclick', function () {
    boxElem[0].remove()
})