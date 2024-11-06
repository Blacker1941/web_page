// فعال کردن "use strict" برای جلوگیری از خطاهای رایج
`use strict`

let $ = document

// انتخاب عناصر HTML مورد نیاز
let box = $.querySelector("box"),
    input = $.querySelector("input")

// افزودن رویداد ورودی به input
input.addEventListener("input", () => {
    // تغییر میزان انحنای کادر و رنگ پس‌زمینه با مقدار ورودی
    box.style.borderRadius = input.value
    box.style.background = input.value
});

// خودکار اجرا شده پس از بارگذاری صفحه
(function() {
    `use strict`
    window.addEventListener(`load`, function() {
        let canvas = $.getElementById(`canvas`)
        if (!canvas || !canvas.getContext) return false

        // تولید عدد تصادفی بین دو مقدار
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        // تعریف و تنظیم متغیرهای اولیه
        let ctx = canvas.getContext(`2d`)
        let X = canvas.width = window.innerWidth
        let Y = canvas.height = window.innerHeight
        let mouseX = null, mouseY = null
        let dist = 80
        let lessThan = Math.sqrt(dist * dist + dist * dist)
        let mouseDist = 150
        let shapeNum
        let shapes = []
        let ease = 0.3
        let friction = 0.9
        let lineWidth = 5
        X > Y ? shapeNum = X / dist : shapeNum = Y / dist
        if (X < 768) {
            lineWidth = 2
            dist = 40
            lessThan = Math.sqrt(dist * dist + dist * dist)
            mouseDist = 50
            X > Y ? shapeNum = X / dist : shapeNum = Y / dist
        }

        // پشتیبانی از requestAnimationFrame برای نمایش انیمیشن
        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(cb) {
                setTimeout(cb, 17)
            }

        // تعریف و تنظیم ویژگی‌های اشکال
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
            this.v = { x: 0, y: 0 }
            this.c = rand(0, 360)
        }
        Shape.prototype.draw = function() {
            let ctx = this.ctx
            ctx.save()
            ctx.fillStyle = `hsl(` + this.c + `, 80%, 60%)`
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.restore()
        }
        Shape.prototype.mouseDist = function() {
            // رفتار اشکال نسبت به فاصله تا موشواره
            let x = mouseX - this.x
            let y = mouseY - this.y
            let d = x * x + y * y
            let dist = Math.sqrt(d)
            if (dist < mouseDist) {
                this.v.x = +this.v.x
                this.v.y = +this.v.y
                let colAngle = Math.atan2(mouseY - this.y, mouseX - this.x)
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
            // رسم خط بین اشکال نزدیک به هم
            let j = i
            for (let i = 0; i < shapes.length; i++) {
                if (j !== i) {
                    let x = this.x - shapes[i].x
                    let y = this.y - shapes[i].y
                    let d = x * x + y * y
                    let dist = Math.floor(Math.sqrt(d))
                    if (dist <= lessThan) {
                        ctx.save()
                        ctx.lineWidth = lineWidth
                        ctx.strokeStyle = `hsl(` + this.c + `, 80%, 60%)`
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
            // اجرا و به روزرسانی شکل و خط‌ها
            this.drawLine(i)
            if (mouseX !== null) this.mouseDist()
            this.draw()
        }
        for (let i = 0; i < shapeNum + 1; i++) {
            for (let j = 0; j < shapeNum + 1; j++) {
                if (j * dist - dist > Y) break
                let s = new Shape(ctx, i * dist, j * dist, i, j)
                shapes.push(s)
            }
        }

        // اجرای انیمیشن اصلی
        function render() {
            ctx.clearRect(0, 0, X, Y)
            for (let i = 0; i < shapes.length; i++) {
                shapes[i].render(i)
            }
            requestAnimationFrame(render)
        }
        render()

        // مدیریت تغییر اندازه صفحه و تنظیم مجدد اشکال
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
            for (let i = 0; i < shapeNum + 1; i++) {
                for (let j = 0; j < shapeNum + 1; j++) {
                    if (j * dist - dist > Y) break
                    let s = new Shape(ctx, i * dist, j * dist, i, j)
                    shapes.push(s)
                }
            }
        }

        window.addEventListener(`resize`, onResize)

        // افزودن رویداد موشواره برای به دست آوردن موقعیت
        window.addEventListener(`mousemove`, function(e) {
            mouseX = e.clientX
            mouseY = e.clientY
        }, false)

        // مدیریت حرکت لمس
        canvas.addEventListener(`touchmove`, function(e) {
            let touch = e.targetTouches[0]
            mouseX = touch.pageX
            mouseY = touch.pageY
        })

        // نویسنده
        console.log(`File Name / scriptMenu.js\nCreated Date / August 19, 2024\nAuthor / Blacker `)
    })
})();
