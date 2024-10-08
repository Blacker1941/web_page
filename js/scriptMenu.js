`use strict`

let $ = document

let box = $.querySelector("box"),
    input = $.querySelector("input")

input.addEventListener("input", () => {
    box.style.borderRadius = input.value
    box.style.background = input.value
});


(function() {
    `use strict`
    window.addEventListener(`load`, function() {
            var canvas = $.getElementById(`canvas`)
            if (!canvas || !canvas.getContext) {
                return false
            }

            /********************
              Random Number
            ********************/

            function rand(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            /********************
              Var
            ********************/
            var ctx = canvas.getContext(`2d`)
            var X = canvas.width = window.innerWidth
            var Y = canvas.height = window.innerHeight
            var mouseX = null
            var mouseY = null
            var dist = 80
            var lessThan = Math.sqrt(dist * dist + dist * dist)
            var mouseDist = 150
            var shapeNum
            var shapes = []
            var ease = 0.3
            var friction = 0.9
            var lineWidth = 5
            X > Y ? shapeNum = X / dist : shapeNum = Y / dist
            if (X < 768) {
                lineWidth = 2
                dist = 40
                lessThan = Math.sqrt(dist * dist + dist * dist)
                mouseDist = 50
                X > Y ? shapeNum = X / dist : shapeNum = Y / dist
            }

            /********************
              Animation
            ********************/
            window.requestAnimationFrame =
                window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(cb) {
                    setTimeout(cb, 17)
                }
                /********************
                  Shape
                ********************/
            function Shape(ctx, x, y, i) {
                this.ctx = ctx
                this.init(x, y, i)
            }

            Shape.prototype.init = function(x, y, i) {
                this.x = x
                this.y = y
                this.xi = x
                this.yi = y
                this.i = i
                this.r = 1
                this.v = {
                    x: 0,
                    y: 0
                }
                this.c = rand(0, 360)
            }
            Shape.prototype.draw = function() {
                var ctx = this.ctx
                ctx.save()
                ctx.fillStyle = `hsl(` + this.c + `, ` + `80%, 60%)`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
                ctx.fill()
                ctx.restore()
            }
            Shape.prototype.mouseDist = function() {
                var x = mouseX - this.x
                var y = mouseY - this.y
                var d = x * x + y * y
                var dist = Math.sqrt(d)
                if (dist < mouseDist) {
                    this.v.x = +this.v.x
                    this.v.y = +this.v.y
                    var colAngle = Math.atan2(mouseY - this.y, mouseX - this.x)
                    this.v.x = -Math.cos(colAngle) * 5
                    this.v.y = -Math.sin(colAngle) * 5
                    this.x += this.v.x
                    this.y += this.v.y
                } else if (dist > mouseDist && dist < mouseDist + 10) {
                    this.v.x = 0
                    this.v.y = 0
                } else {
                    this.v.x += (this.xi - this.x) * ease
                    this.v.y += (this.yi - this.y) * ease
                    this.v.x *= friction
                    this.v.y *= friction
                    this.x += this.v.x
                    this.y += this.v.y
                }
            }
            Shape.prototype.drawLine = function(i) {
                var j = i
                for (var i = 0; i < shapes.length; i++) {
                    if (j !== i) {
                        var x = this.x - shapes[i].x
                        var y = this.y - shapes[i].y
                        var d = x * x + y * y
                        var dist = Math.floor(Math.sqrt(d))
                        if (dist <= lessThan) {
                            ctx.save()
                            ctx.lineWidth = lineWidth
                            ctx.strokeStyle = `hsl(` + this.c + `, ` + `80%, 60%)`
                            ctx.beginPath()
                            ctx.moveTo(this.x, this.y)
                            ctx.lineTo(shapes[i].x, shapes[i].y)
                            ctx.stroke()
                            ctx.restore()
                        }
                    }
                }
            }
            Shape.prototype.render = function(i) {
                this.drawLine(i)
                if (mouseX !== null) this.mouseDist()
                this.draw()
            }
            for (var i = 0; i < shapeNum + 1; i++) {
                for (var j = 0; j < shapeNum + 1; j++) {
                    if (j * dist - dist > Y) break
                    var s = new Shape(ctx, i * dist, j * dist, i, j)
                    shapes.push(s)
                }
            }

            /********************
              Render
            ********************/

            function render() {
                ctx.clearRect(0, 0, X, Y)
                for (var i = 0; i < shapes.length; i++) {
                    shapes[i].render(i)
                }
                requestAnimationFrame(render)
            }

            render()

            /********************
              Event
            ********************/

            function onResize() {
                X = canvas.width = window.innerWidth
                Y = canvas.height = window.innerHeight
                shapes = []
                if (X < 768) {
                    lineWidth = 2
                    dist = 40
                    lessThan = Math.sqrt(dist * dist + dist * dist)
                    mouseDist = 50
                    X > Y ? shapeNum = X / dist : shapeNum = Y / dist
                } else {
                    lineWidth = 5
                    dist = 80
                    lessThan = Math.sqrt(dist * dist + dist * dist)
                    mouseDist = 150
                    X > Y ? shapeNum = X / dist : shapeNum = Y / dist
                }
                for (var i = 0; i < shapeNum + 1; i++) {
                    for (var j = 0; j < shapeNum + 1; j++) {
                        if (j * dist - dist > Y) break
                        var s = new Shape(ctx, i * dist, j * dist, i, j)
                        shapes.push(s)
                    }
                }
            }

            window.addEventListener(`resize`, function() {
                onResize()
            })

            window.addEventListener(`mousemove`, function(e) {
                mouseX = e.clientX
                mouseY = e.clientY
            }, false)

            canvas.addEventListener(`touchmove`, function(e) {
                var touch = e.targetTouches[0]
                mouseX = touch.pageX
                mouseY = touch.pageY
            })

        })
        // Author
    console.log(`File Name / scriptMenu.js\nCreated Date / August 19, 2024\nAuthor / Blacker `)
})()

const contextMenu = $.getElementById(`contextMenu`)


function contextHandler(event) {
    event.preventDefault()

    if (contextMenu.style.display === `none`) {

        contextMenu.style.left = event.pageX + `px`
        contextMenu.style.top = event.pageY + `px`

        contextMenu.style.display = `block`
    } else {
        contextMenu.style.left = event.pageX + `px`
        contextMenu.style.top = event.pageY + `px`
    }
}

function clickConTextMenu() {
    contextMenu.style.display = `none`
}

function keyDownHandler(event) {
    if (event.keyCode === 27)
        contextMenu.style.display = `none`
}

$.body.addEventListener(`contextmenu`, contextHandler)
$.body.addEventListener(`click`, clickConTextMenu)
$.body.addEventListener(`keydown`, keyDownHandler)

const switchElement = $.querySelector(`.switch`)

switchElement.addEventListener(`click`, function() {
    $.body.classList.toggle(`dark`)

    if ($.body.className.includes(`dark`)) {
        localStorage.setItem(`theme`, `dark`)
    } else {
        localStorage.setItem(`theme`, `light`)
    }
})



const mbiElem = $.querySelector(`.mbi`)
const XElem = $.querySelector(`.X`)
const DElem = $.querySelector(`.d`)

function setAnimation() {
    mbiElem.style.animation = `move 1s 1`
}

function animationXHandler() {
    mbiElem.style.animation = `moveend 1s 1`
    mbiElem.addEventListener("animationend", e => e.target.remove())
}

window.addEventListener(`load`, setAnimation)
XElem.addEventListener(`click`, animationXHandler)

const button = document.querySelector(`.profile`)
const modalParent = document.querySelector(`.modal-parent`)
const x = document.querySelector(`.XProfile`)

let isModalOpen = false
let isAnimating = false

function showModal() {
    if (!isAnimating) {
        isAnimating = true
        disableClick()

        modalParent.className = `modal-parent1`
        modalParent.style.animation = `moveProfile 1s 1`

        modalParent.addEventListener('animationend', function() {
            enableClick()
            isAnimating = false
        }, { once: true })
    }
}

function hideModalWithX() {
    if (!isAnimating) {
        isAnimating = true
        disableClick()

        modalParent.style.animation = `moveendProfile 1s 1`

        modalParent.addEventListener('animationend', function() {
            modalParent.className = `modal-parent`
            enableClick() // فعال کردن کلیک پس از پایان انیمیشن
            isAnimating = false
        }, { once: true })
    }
}

function disableClick() {
    button.style.pointerEvents = 'none'
    x.style.pointerEvents = 'none'
}

function enableClick() {
    button.style.pointerEvents = 'auto'
    x.style.pointerEvents = 'auto'
}

function toggleModal() {
    if (!isAnimating) {
        if (isModalOpen) {
            hideModalWithX()
        } else {
            showModal()
        }
        isModalOpen = !isModalOpen
    }
}

button.addEventListener(`click`, toggleModal)
x.addEventListener(`click`, toggleModal)


button.addEventListener(`click`, toggleModal)
x.addEventListener(`click`, toggleModal)


const colorBtns = $.querySelectorAll(`.btn`)

colorBtns.forEach(function(colorBtn) {

    colorBtn.addEventListener(`click`, function(event) {
        let btnColor = event.target.dataset.color

        $.documentElement.style.setProperty(`--theme-color`, btnColor)
        localStorage.setItem(`color`, btnColor)
    })
})
window.onload = function() {
    let localStorageColor = localStorage.getItem(`color`)

    if (localStorageColor === `#3498db`) {
        $.documentElement.style.setProperty(`--theme-color`, `#3498db`)
    } else if (localStorageColor === `#ff1756`) {
        $.documentElement.style.setProperty(`--theme-color`, `#ff1756`)
    } else if (localStorageColor === `#ff1756`) {
        $.documentElement.style.setProperty(`--theme-color`, `#ff1756`)
    } else if (localStorageColor === `#1cb65d`) {
        $.documentElement.style.setProperty(`--theme-color`, `#1cb65d`)
    } else if (localStorageColor === `#8e44ad`) {
        $.documentElement.style.setProperty(`--theme-color`, `#8e44ad`)
    } else if (localStorageColor === `#f4b932`) {
        $.documentElement.style.setProperty(`--theme-color`, `#f4b932`)
    }
    let localStorageTheme = localStorage.getItem(`theme`)

    if (localStorageTheme === `dark`) {
        $.body.classList.add(`dark`)
    } else {
        $.body.classList.remove(`dark`)
    }

}

const MainNav = $.getElementById(`mainNav`)
const blackerElem = $.querySelector(`.h1Blacker`)
const scrollElem = $.querySelector(`.scroll`)

$.addEventListener(`scroll`, function() {
    if ($.documentElement.scrollTop > 0) {
        MainNav.style.height = `0px`
        button.style.height = `0px`
        button.style.width = `0px`
        button.style.border = `0px`

        const buttonChildren = button.children
        for (let child of buttonChildren) {
            child.style.height = `0px`
            child.style.width = `0px`
            child.style.border = `0px`
        }
        blackerElem.style.fontSize = `0px`
        switchElement.style.height = `0px`
        switchElement.style.width = `0px`
        switchElement.style.border = `0px`

        const switchChildren = switchElement.children
        for (let child of switchChildren) {
            child.style.height = `0px`
            child.style.width = `0px`
            child.style.border = `0px`
            child.style.boxShadow = `0px 0px 0px 0px #00000000`
        }

        scrollElem.style.display = `block`
    } else {
        MainNav.style.height = `50px`
        button.style.height = ``
        button.style.width = ``
        button.style.border = ``

        const buttonChildren = button.children
        for (let child of buttonChildren) {
            child.style.height = ``
            child.style.width = ``
            child.style.border = ``
        }
        blackerElem.style.fontSize = ``
        switchElement.style.height = ``
        switchElement.style.width = ``
        switchElement.style.border = ``

        const switchChildren = switchElement.children
        for (let child of switchChildren) {
            child.style.height = ``
            child.style.width = ``
            child.style.border = ``
            child.style.boxShadow = ``
        }

        scrollElem.style.display = `none`
    }
})

let customScroll = $.querySelector(`.scroll`)

window.addEventListener(`scroll`, function() {

    let scrollTop = window.scrollY

    let documentHeight = $.body.clientHeight

    let windowHeight = window.innerHeight

    let scrollPercent = scrollTop / (documentHeight - windowHeight)

    let scrollPercentRounded = Math.round(scrollPercent * 100)

    customScroll.style.width = scrollPercentRounded + `%`

})