"use strict";

let $ = document;
let XXX = `×`;

const inputElem = $.querySelector(`#input-field`);
const btnSaveElem = $.querySelector(`#btn-save`);
const btnDeleteElem = $.querySelector(`#btn-delete`);
const colorsBox = $.querySelectorAll(`.color-box`);
const notesContainer = $.querySelector(`#listed`);
const XElem = $.querySelector(`.X`);

colorsBox.forEach(function(colorBox) {
    colorBox.addEventListener(`click`, function(event) {
        let mainColor = event.target.style.backgroundColor;
        inputElem.style.backgroundColor = mainColor;
    });
});

function generateNewNote() {
    if (inputElem.value) {
        let newNoteDivElem = $.createElement(`div`);
        newNoteDivElem.className = `card shadow-sm rounded`;
        let inputBg = inputElem.style.backgroundColor;
        newNoteDivElem.style.backgroundColor = inputBg;

        let newNotePElem = $.createElement(`p`);
        newNotePElem.className = `card-text p-3`;
        newNotePElem.innerHTML = inputElem.value;

        let newNoteSpanXElem = $.createElement(`span`);
        newNoteSpanXElem.className = `X`;
        newNoteSpanXElem.innerHTML = XXX;
        newNoteSpanXElem.addEventListener(`click`, removeNote);

        newNoteDivElem.append(newNotePElem);
        newNoteDivElem.append(newNoteSpanXElem);

        notesContainer.append(newNoteDivElem);

        saveNoteToLocalStorage(inputElem.value, inputBg);

        inputElem.value = ``;
        inputElem.style.backgroundColor = `#fff`;
    }
}

function removeNote(event) {
    if (event.target.tagName === `SPAN`) {
        const noteElement = event.target.parentElement;
        noteElement.remove();
        removeNoteFromLocalStorage(noteElement);
    }
}

function saveNoteToLocalStorage(noteContent, noteColor) {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || [];
    notes.push({ content: noteContent, color: noteColor });
    localStorage.setItem(`notes`, JSON.stringify(notes));
}

function removeNoteFromLocalStorage(noteElement) {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || [];
    const noteContent = noteElement.querySelector(`p`).innerText;
    const updatedNotes = notes.filter(note => note.content !== noteContent);
    localStorage.setItem(`notes`, JSON.stringify(updatedNotes));
}

function loadNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem(`notes`)) || [];
    notes.forEach(note => {
        let newNoteDivElem = $.createElement(`div`);
        newNoteDivElem.className = `card shadow-sm rounded`;
        newNoteDivElem.style.backgroundColor = note.color;

        let newNotePElem = $.createElement(`p`);
        newNotePElem.className = `card-text p-3`;
        newNotePElem.innerHTML = note.content;

        let newNoteSpanXElem = $.createElement(`span`);
        newNoteSpanXElem.className = `X`;
        newNoteSpanXElem.innerHTML = XXX;
        newNoteSpanXElem.addEventListener(`click`, removeNote);

        newNoteDivElem.append(newNotePElem);
        newNoteDivElem.append(newNoteSpanXElem);

        notesContainer.append(newNoteDivElem);
    });
}

btnDeleteElem.addEventListener(`click`, function() {
    inputElem.value = ``;
    inputElem.style.backgroundColor = `#fff`;
});

inputElem.addEventListener(`keydown`, function(event) {
    if (event.keyCode === 13) {
        generateNewNote();
    }
});

btnSaveElem.addEventListener(`click`, generateNewNote);

const switchElement = document.querySelector(`.switch`);

switchElement.addEventListener(`click`, function() {
    $.body.classList.toggle(`dark`);

    if (document.body.className.includes(`dark`)) {
        localStorage.setItem(`theme`, `dark`);
    } else {
        localStorage.setItem(`theme`, `light`);
    }
});

window.onload = function() {
    let localStorageTheme = localStorage.getItem(`theme`);

    if (localStorageTheme === `dark`) {
        $.body.classList.add(`dark`);
    } else {
        $.body.classList.remove(`dark`);
    }

    loadNotesFromLocalStorage();
};