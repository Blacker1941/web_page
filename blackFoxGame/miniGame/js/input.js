"use strict"

export class InputHandler {
    constructor() {
        this.keys = []
        window.addEventListener("keydown", e => {
            if ((e.keyCode === 40 || e.keyCode === 38 ||
                 e.keyCode === 37 || e.keyCode === 39 ||
                 e.keyCode === 13 || e.keyCode === 87 ||
                 e.keyCode === 65 || e.keyCode === 83 ||
                 e.keyCode === 68 || e.keyCode === 32) &&
                this.keys.indexOf(e.keyCode) === -1) {
                this.keys.push(e.keyCode)
            }
        })

        window.addEventListener("keyup", e => {
            if (e.keyCode === 40 || e.keyCode === 38 ||
                e.keyCode === 37 || e.keyCode === 39 ||
                e.keyCode === 13 || e.keyCode === 87 ||
                e.keyCode === 65 || e.keyCode === 83 ||
                e.keyCode === 68 || e.keyCode === 32) {
                this.keys.splice(this.keys.indexOf(e.keyCode), 1)
            }
        })
    }
}
