import Player from './player.js'
import InputHandler from './input.js'
import { drawStatusText } from './utils.js'

"use strict"

let $ = document

window.addEventListener('load', function() {
    const loading = $.getElementById('loading')
    loading.style.display = 'none'
    const canvas = $.getElementById('canvas1')
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const player = new Player(canvas.width, canvas.height)
    const input = new InputHandler()

    let lastTime = 0
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        context.clearRect(0, 0, canvas.width, canvas.height)
        player.update(input.lastKey)
        player.draw(context, deltaTime)
        drawStatusText(context, input, player)
        requestAnimationFrame(animate)
    }
    animate(0)
})

