"use strict"

let $ = document

// کلاس اصلی برای دشمنان
class Enemy {
    constructor() {
        this.frameX = 0 // فریم فعلی در انیمیشن
        this.fps = 11 // فریم در ثانیه
        this.frameY = 0 // فریم عمودی
        this.frameInterval = 1000 / this.fps // زمان بین فریم‌ها
        this.frameTimer = 0 // زمان‌سنج برای فریم‌ها
        this.markedForDeletion = false // نشانه‌گذاری برای حذف دشمن
    }

    // به‌روزرسانی موقعیت و وضعیت دشمن
    update(deltaTime) {
        this.x -= this.speedX + this.game.speed // به‌روزرسانی موقعیت افقی
        this.y += this.speedY // به‌روزرسانی موقعیت عمودی

        // به‌روزرسانی فریم انیمیشن
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) this.frameX++ // به فریم بعدی بروید
            else this.frameX = 0 // به فریم اول بروید
        } else {
            this.frameTimer += deltaTime // زمان‌سنج را افزایش دهید
        }

        // اگر دشمن از صفحه خارج شود، نشانه‌گذاری برای حذف
        if (this.x + this.width < 0) this.markedForDeletion = true
    }

    // رسم دشمن
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height) // نمایش مستطیل اطراف دشمن در حالت اشکال‌زدایی
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height) // رسم تصویر دشمن
    }
}

// کلاس دشمن پرنده
export class FlyingEnemy extends Enemy {
    constructor(game) {
        super() // فراخوانی سازنده کلاس پدر
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width + Math.random() * this.game.width * 0.5 // موقعیت اولیه
        this.y = Math.random() * this.game.height * 0.5 // موقعیت اولیه
        this.speedX = Math.random() + 1 // سرعت افقی
        this.speedY = 0 // سرعت عمودی
        this.maxFrame = 5 // حداکثر فریم‌های انیمیشن
        this.image = $.getElementById(`enemy_fly`) // بارگذاری تصویر
        this.angle = 0 // زاویه برای انیمیشن
        this.va = Math.random() * 0.1 + 0.1 // تغییر زاویه
    }

    // به‌روزرسانی موقعیت و انیمیشن
    update(deltaTime) {
        super.update(deltaTime)
        this.angle += this.va // به‌روزرسانی زاویه
        this.y += Math.sin(this.angle) // ایجاد حرکت سینوسی
    }
}

// کلاس دشمن زمینی
export class GroundEnemy extends Enemy {
    constructor(game) {
        super() // فراخوانی سازنده کلاس پدر
        this.game = game
        this.width = 60
        this.height = 87
        this.x = this.game.width // موقعیت اولیه
        this.y = this.game.height - this.height - this.game.groundMargin // موقعیت بر اساس حاشیه زمین
        this.speedX = 0 // سرعت افقی
        this.speedY = 0 // سرعت عمودی
        this.maxFrame = 1 // حداکثر فریم‌های انیمیشن
        this.image = $.getElementById(`enemy_plant`) // بارگذاری تصویر
    }
}

// کلاس دشمن صعودی
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super() // فراخوانی سازنده کلاس پدر
        this.game = game
        this.width = 120
        this.height = 144
        this.x = this.game.width // موقعیت اولیه
        this.y = Math.random() * this.game.height * 0.5 // موقعیت اولیه
        this.speedX = 0 // سرعت افقی
        this.speedY = Math.random() > 0.5 ? 1 : -1; // تعیین جهت حرکت عمودی
        this.maxFrame = 5 // حداکثر فریم‌های انیمیشن
        this.image = $.getElementById(`enemy_spider_big`) // بارگذاری تصویر
    }

    // به‌روزرسانی موقعیت و وضعیت دشمن
    update(deltaTime) {
        super.update(deltaTime)
        // جلوگیری از خروج دشمن از زمین
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1
        if (this.y < -this.height) this.markedForDeletion = true // نشانه‌گذاری برای حذف
    }

    // رسم دشمن
    draw(context) {
        super.draw(context) // رسم با استفاده از متد کلاس پدر
        context.beginPath()
        context.moveTo(this.x + this.width / 2, 0) // خط عمودی برای نشان دادن حرکت
        context.lineTo(this.x + this.width / 2, this.y + 50)
        context.stroke()
    }
}
