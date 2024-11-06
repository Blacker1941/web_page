"use strict"

class Particle {
    constructor(game) {
        this.game = game // ارجاع به شی بازی
        this.markedForDeletion = false // علامت‌گذاری ذرات برای حذف
    }

    update() {
        // بروزرسانی موقعیت ذره
        this.x -= this.speedX + this.game.speed // حرکت افقی
        this.y -= this.speedY // حرکت عمودی
        this.size *= 0.95 // کاهش اندازه ذره
        if (this.size < 0.5) this.markedForDeletion = true // حذف ذره در صورت کوچک شدن
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game) // فراخوانی سازنده کلاس پدر
        this.size = Math.random() * 10 + 10 // اندازه تصادفی ذره
        this.x = x // موقعیت افقی ذره
        this.y = y // موقعیت عمودی ذره
        this.speedX = Math.random() // سرعت افقی تصادفی
        this.speedY = Math.random() // سرعت عمودی تصادفی
        this.color = `black` // رنگ ذره
    }

    draw(context) {
        // رسم ذره
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2) // رسم دایره
        context.fillStyle = this.color // رنگ دایره
        context.fill() // پر کردن دایره
        this.color = `rgba(0,0,0,0.2)`; // تغییر رنگ به نیمه شفاف
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game) // فراخوانی سازنده کلاس پدر
        this.size = Math.random() * 100 + 100 // اندازه تصادفی ذره
        this.x = x - this.size * 0.4 // موقعیت افقی ذره
        this.y = y - this.size * 0.5 // موقعیت عمودی ذره
        this.speedX = Math.random() * 6 - 4 // سرعت افقی تصادفی
        this.speedY = Math.random() * 2 + 1 // سرعت عمودی تصادفی
        this.gravity = 0 // جاذبه اولیه
        this.image = document.getElementById('fire') // بارگذاری تصویر
    }

    update() {
        super.update() // بروزرسانی ویژگی‌های ذره
        this.gravity = 0.1 // تنظیم جاذبه
        this.y += this.gravity // اعمال جاذبه به موقعیت عمودی
    }

    draw(context) {
        // رسم ذره
        context.drawImage(this.image, this.x, this.y, this.size, this.size) // رسم تصویر ذره
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game) // فراخوانی سازنده کلاس پدر
        this.image = document.getElementById('fire') // بارگذاری تصویر
        this.size = Math.random() * 100 + 100 // اندازه تصادفی ذره
        this.x = x // موقعیت افقی ذره
        this.y = y // موقعیت عمودی ذره
        this.speedX = 1 // سرعت افقی
        this.speedY = 1 // سرعت عمودی
        this.angle = 0 // زاویه چرخش
        this.va = Math.random() * 0.5 - 0.1; // تغییر زاویه تصادفی
    }

    update() {
        super.update() // بروزرسانی ویژگی‌های ذره
        this.angle += this.va // تغییر زاویه
        this.x += Math.sin(this.angle * 5) // حرکت افقی بر اساس زاویه
    }

    draw(context) {
        // رسم ذره
        context.save() // ذخیره وضعیت کنونی کانتکست
        context.translate(this.x, this.y) // جابجایی به موقعیت ذره
        context.rotate(this.angle) // چرخش بر اساس زاویه
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size) // رسم تصویر
        context.restore() // بازگرداندن وضعیت قبلی کانتکست
    }
}
