const canvas = document.getElementById('canvas1') // انتخاب کانواس
const ctx = canvas.getContext('2d') // دریافت context
canvas.width = window.innerWidth // تنظیم عرض به اندازه پنجره
canvas.height = window.innerHeight // تنظیم ارتفاع به اندازه پنجره

// ایجاد گرادیان برای پس‌زمینه
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, 'white')
gradient.addColorStop(0.5, 'gold')
gradient.addColorStop(1, 'orangered')
ctx.fillStyle = gradient // رنگ پرکننده
ctx.strokeStyle = '#EE82EE' // رنگ خط

class Particle { // تعریف کلاس ذره
    constructor(effect) {
        this.effect = effect
        this.radius = Math.floor(Math.random() * 10 + 1) // اندازه تصادفی
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2) // موقعیت تصادفی x
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2) // موقعیت تصادفی y
        this.vx = Math.random() * 1 - 0.5 // سرعت تصادفی x
        this.vy = Math.random() * 1 - 0.5 // سرعت تصادفی y
        this.pushX = 0 // نیروی اضافی x
        this.pushY = 0 // نیروی اضافی y
        this.friction = 0.95 // اصطکاک
    }
    draw(context) { // رسم ذره
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
    }
    update() { // به‌روزرسانی موقعیت ذره
        if (this.effect.mouse.pressed) {
            const dx = this.x - this.effect.mouse.x // فاصله x
            const dy = this.y - this.effect.mouse.y // فاصله y
            const distance = Math.hypot(dx, dy) // فاصله کل
            const force = (this.effect.mouse.radius / distance) // محاسبه نیروی جذب
            if (distance < this.effect.mouse.radius) {
                const angle = Math.atan2(dy, dx) // زاویه نسبت به ماوس
                this.pushX += Math.cos(angle) * force // محاسبه نیروی x
                this.pushY += Math.sin(angle) * force // محاسبه نیروی y
            }
        }

        // به‌روزرسانی موقعیت با نیروی اضافی و سرعت
        this.x += (this.pushX *= this.friction) + this.vx
        this.y += (this.pushY *= this.friction) + this.vy

        // برخورد با دیوارها
        if (this.x < this.radius) {
            this.x = this.radius
            this.vx *= -1 // تغییر جهت
        } else if (this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius
            this.vx *= -1 // تغییر جهت
        }
        if (this.y < this.radius) {
            this.y = this.radius
            this.vy *= -1 // تغییر جهت
        } else if (this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius
            this.vy *= -1 // تغییر جهت
        }
    }
    reset() { // ریست موقعیت ذره
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
    }
}

class Effect { // تعریف کلاس اثر
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = [] // آرایه ذرات
        this.numberOfParticles = 666 // تعداد ذرات
        this.createParticles() // ایجاد ذرات

        this.mouse = { // اطلاعات ماوس
            x: 0,
            y: 0,
            pressed: false,
            radius: 200 // شعاع جذب
        }

        // لیسنر برای تغییر اندازه پنجره
        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
        })
        // لیسنر برای حرکت ماوس
        window.addEventListener('mousemove', e => {
            if (this.mouse.pressed) {
                this.mouse.x = e.x
                this.mouse.y = e.y
            }
        })
        // لیسنر برای کلیک ماوس
        window.addEventListener('mousedown', e => {
            this.mouse.pressed = true
            this.mouse.x = e.x
            this.mouse.y = e.y
        })
        window.addEventListener('mouseup', e => {
            this.mouse.pressed = false
        })
    }
    createParticles() { // ایجاد ذرات
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this)) // افزودن ذره جدید
        }
    }
    handleParticles(context) { // مدیریت ذرات
        this.connectParticles(context) // اتصال ذرات نزدیک
        this.particles.forEach(particle => {
            particle.draw(context) // رسم هر ذره
            particle.update() // به‌روزرسانی هر ذره
        })
    }
    connectParticles(context) { // اتصال ذرات نزدیک
        const maxDistance = 80 // حداکثر فاصله برای اتصال
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x // فاصله x
                const dy = this.particles[a].y - this.particles[b].y // فاصله y
                const distance = Math.hypot(dx, dy) // فاصله کل
                if (distance < maxDistance) { // اگر فاصله کمتر از حد مجاز باشد
                    context.save()
                    const opacity = 1 - (distance / maxDistance) // محاسبه شفافیت
                    context.globalAlpha = opacity // تنظیم شفافیت
                    context.beginPath()
                    context.moveTo(this.particles[a].x, this.particles[a].y) // شروع خط
                    context.lineTo(this.particles[b].x, this.particles[b].y) // انتهای خط
                    context.stroke() // رسم خط
                    context.restore()
                }
            }
        }
    }
    resize(width, height) { // تغییر اندازه کانواس
        this.canvas.width = width
        this.canvas.height = height
        this.width = width
        this.height = height

        // ایجاد گرادیان جدید
        const gradient = this.context.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(0.5, 'gold')
        gradient.addColorStop(1, 'orangered')
        this.context.fillStyle = gradient
        this.context.strokeStyle = '#EE82EE'

        // ریست ذرات
        this.particles.forEach(particle => {
            particle.reset()
        })
    }
}

const effect = new Effect(canvas, ctx) // ایجاد اثر

function animate() { // انیمیشن
    ctx.clearRect(0, 0, canvas.width, canvas.height) // پاک‌کردن کانواس
    effect.handleParticles(ctx) // مدیریت ذرات
    requestAnimationFrame(animate) // درخواست فریم بعدی
}
animate() // شروع انیمیشن

