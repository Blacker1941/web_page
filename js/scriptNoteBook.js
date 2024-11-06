"use strict"

// دسترسی به عناصر HTML و متغیرهای ثابت
let $ = document
let XXX = `×` // نماد حذف یادداشت

// تعریف عناصر ورودی، دکمه‌ها و سایر بخش‌های صفحه
const inputElem = $.querySelector(`#input-field`) // فیلد ورودی یادداشت
const btnSaveElem = $.querySelector(`#btn-save`) // دکمه ذخیره یادداشت
const btnDeleteElem = $.querySelector(`#btn-delete`) // دکمه پاک کردن فیلد ورودی
const colorsBox = $.querySelectorAll(`.color-box`) // جعبه‌های انتخاب رنگ
const notesContainer = $.querySelector(`#listed`) // بخش نمایش یادداشت‌ها
const XElem = $.querySelector(`.X`) // عنصر حذف یادداشت

// انتخاب رنگ برای پس‌زمینه یادداشت از روی جعبه‌های رنگ
colorsBox.forEach(function(colorBox) {
    colorBox.addEventListener(`click`, function(event) {
        let mainColor = event.target.style.backgroundColor // گرفتن رنگ انتخابی
        inputElem.style.backgroundColor = mainColor // تنظیم رنگ پس‌زمینه فیلد ورودی
    })
})

// تابع ایجاد و نمایش یادداشت جدید
function generateNewNote() {
    if (inputElem.value) { // بررسی خالی نبودن فیلد ورودی
        let newNoteDivElem = $.createElement(`div`) // ایجاد بخش جدید برای یادداشت
        newNoteDivElem.className = `card shadow-sm rounded` // افزودن کلاس‌های CSS
        let inputBg = inputElem.style.backgroundColor
        newNoteDivElem.style.backgroundColor = inputBg // تنظیم رنگ پس‌زمینه یادداشت

        let newNotePElem = $.createElement(`p`) // ایجاد پاراگراف برای متن یادداشت
        newNotePElem.className = `card-text p-3`
        newNotePElem.innerHTML = inputElem.value // قرار دادن متن فیلد ورودی در یادداشت

        let newNoteSpanXElem = $.createElement(`span`) // ایجاد دکمه حذف یادداشت
        newNoteSpanXElem.className = `X`
        newNoteSpanXElem.innerHTML = XXX
        newNoteSpanXElem.addEventListener(`click`, removeNote) // افزودن رویداد کلیک برای حذف یادداشت

        newNoteDivElem.append(newNotePElem)
        newNoteDivElem.append(newNoteSpanXElem)

        notesContainer.append(newNoteDivElem) // اضافه کردن یادداشت به بخش نمایش

        saveNoteToLocalStorage(inputElem.value, inputBg) // ذخیره یادداشت در Local Storage

        inputElem.value = `` // خالی کردن فیلد ورودی
        inputElem.style.backgroundColor = `#fff` // بازنشانی رنگ فیلد ورودی
    }
}

// تابع حذف یادداشت از صفحه و Local Storage
function removeNote(event) {
    if (event.target.tagName === `SPAN`) {
        const noteElement = event.target.parentElement // پیدا کردن یادداشت مورد نظر
        noteElement.remove() // حذف یادداشت از صفحه
        removeNoteFromLocalStorage(noteElement) // حذف یادداشت از Local Storage
    }
}

// تابع ذخیره یادداشت در Local Storage
function saveNoteToLocalStorage(noteContent, noteColor) {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || [] // دریافت یادداشت‌های ذخیره شده قبلی
    notes.push({ content: noteContent, color: noteColor }) // افزودن یادداشت جدید
    localStorage.setItem(`notes`, JSON.stringify(notes)) // ذخیره یادداشت‌ها در Local Storage
}

// تابع حذف یادداشت از Local Storage
function removeNoteFromLocalStorage(noteElement) {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || []
    const noteContent = noteElement.querySelector(`p`).innerText // دریافت متن یادداشت
    const updatedNotes = notes.filter(note => note.content !== noteContent) // فیلتر یادداشت‌ها برای حذف
    localStorage.setItem(`notes`, JSON.stringify(updatedNotes)) // ذخیره یادداشت‌های به‌روزرسانی‌شده
}

// تابع بارگذاری یادداشت‌ها از Local Storage
function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || []
    notes.forEach(note => {
        let newNoteDivElem = $.createElement(`div`)
        newNoteDivElem.className = `card shadow-sm rounded`
        newNoteDivElem.style.backgroundColor = note.color

        let newNotePElem = $.createElement(`p`)
        newNotePElem.className = `card-text p-3`
        newNotePElem.innerHTML = note.content

        let newNoteSpanXElem = $.createElement(`span`)
        newNoteSpanXElem.className = `X`
        newNoteSpanXElem.innerHTML = XXX
        newNoteSpanXElem.addEventListener(`click`, removeNote)

        newNoteDivElem.append(newNotePElem)
        newNoteDivElem.append(newNoteSpanXElem)

        notesContainer.append(newNoteDivElem)
    })
}

// رویداد کلیک برای پاک کردن فیلد ورودی
btnDeleteElem.addEventListener(`click`, function() {
    inputElem.value = ``
    inputElem.style.backgroundColor = `#fff`
})

// رویداد فشردن کلید Enter برای ایجاد یادداشت
inputElem.addEventListener(`keydown`, function(event) {
    if (event.keyCode === 13) {
        generateNewNote()
    }
})

// رویداد کلیک برای ذخیره یادداشت
btnSaveElem.addEventListener(`click`, generateNewNote)

// تنظیم حالت تاریک و روشن برای پس‌زمینه
const switchElement = document.querySelector(`.switch`)

switchElement.addEventListener(`click`, function() {
    $.body.classList.toggle(`dark`)

    if (document.body.className.includes(`dark`)) {
        localStorage.setItem(`theme`, `dark`) // ذخیره حالت تاریک در Local Storage
    } else {
        localStorage.setItem(`theme`, `light`) // ذخیره حالت روشن در Local Storage
    }
})

// بارگذاری حالت ذخیره‌شده و یادداشت‌ها هنگام بارگذاری صفحه
window.onload = function() {
    let localStorageTheme = localStorage.getItem(`theme`)

    if (localStorageTheme === `dark`) {
        $.body.classList.add(`dark`) // تنظیم حالت تاریک اگر ذخیره شده بود
    } else {
        $.body.classList.remove(`dark`) // تنظیم حالت روشن اگر ذخیره شده بود
    }

    loadNotesFromLocalStorage() // بارگذاری یادداشت‌های ذخیره شده
}
