let $ = document
let XXX = '×'

const inputElem = $.querySelector('#input-field')
const btnSaveElem = $.querySelector('#btn-save')
const btnDeleteElem = $.querySelector('#btn-delete')
const colorsBox = $.querySelectorAll('.color-box')
const notesContainer = $.querySelector('#listed')
const XElem = $.querySelector('.X')

colorsBox.forEach(function (colorBox) {
    colorBox.addEventListener('click', function (event) {
        let mainColor = event.target.style.backgroundColor
        inputElem.style.backgroundColor = mainColor
    })
})

function generateNewNote() {
    if (inputElem.value) {
        let newNoteDivElem = $.createElement('div')
        newNoteDivElem.className = 'card shadow-sm rounded'
        let inputBg = inputElem.style.backgroundColor
        newNoteDivElem.style.backgroundColor = inputBg


        let newNotePElem = $.createElement('p')
        newNotePElem.className = 'card-text p-3'
        newNotePElem.innerHTML = inputElem.value

        let newNoteSpanXElem = $.createElement('span')
        newNoteSpanXElem.className = 'X'
        newNoteSpanXElem.innerHTML = XXX
        newNoteSpanXElem.addEventListener('click', removeNote)

        newNoteDivElem.append(newNotePElem)
        newNoteDivElem.append(newNoteSpanXElem)

        notesContainer.append(newNoteDivElem)

        inputElem.value = ''
        inputElem.style.backgroundColor = '#fff'
    }
}


function removeNote(event) {
    event.target.parentElement.remove()
}

btnDeleteElem.addEventListener('click', function () {
    inputElem.value = ''
    inputElem.style.backgroundColor = '#fff'
})

inputElem.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        generateNewNote()
    }
})

btnSaveElem.addEventListener('click', generateNewNote)