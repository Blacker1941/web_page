"use strict" // فعال‌سازی حالت سخت‌گیرانه جاوااسکریپت

let $ = document // ارجاع به document

// وارد کردن حالت‌های مختلف بازیکن
import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from './stete.js'

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth // عرض بازی
        this.gameHeight = gameHeight // ارتفاع بازی
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)] // تعریف حالت‌ها
        this.currentState = this.states[0] // حالت اولیه
        this.image = $.getElementById("dogImage") // بارگذاری تصویر بازیکن
        this.width = 200 // عرض تصویر
        this.height = 181.83 // ارتفاع تصویر
        this.x = this.gameWidth / 2 - this.width / 2 // موقعیت افقی بازیکن
        this.y = this.gameHeight - this.height // موقعیت عمودی بازیکن
        this.vy = 0 // سرعت عمودی
        this.weight = 1 // وزن (برای جاذبه)
        this.frameX = 0 // فریم فعلی در انیمیشن
        this.frameY = 0 // فریم عمودی
        this.maxFrame = 5 // حداکثر فریم‌ها
        this.speed = 0 // سرعت حرکت
        this.maxSpeed = 10 // حداکثر سرعت
        this.fps = 10 // فریم در ثانیه
        this.frameTimer = 0 // تایمر فریم
        this.frameInterval = 1000 / this.fps // فاصله زمانی بین فریم‌ها
    }

    // تابع رسم بازیکن
    draw(context, deltaTime) {
        if (this.frameTimer > this.frameInterval) { // بررسی زمان بین فریم‌ها
            if (this.frameX < this.maxFrame) this.frameX++ // افزایش فریم
            else this.frameX = 0 // بازگشت به فریم اول
            this.frameTimer = 0 // ریست تایمر
        } else {
            this.frameTimer += deltaTime // افزایش تایمر
        }

        // رسم تصویر بازیکن بر روی کانتکست
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    // تابع بروزرسانی وضعیت بازیکن
    update(input) {
        this.currentState.handleInput(input) // مدیریت ورودی برای تغییر حالت
        this.x += this.speed // بروزرسانی موقعیت افقی

        // محدود کردن حرکت بازیکن در راستای افقی
        if (this.x < 0) this.x = 0
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width

        this.y += this.vy // بروزرسانی موقعیت عمودی
        if (!this.onGround()) { // اگر در زمین نیست
            this.vy += this.weight // اعمال وزن
        } else {
            this.vy = 0 // ریست سرعت عمودی
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height // محدود کردن موقعیت عمودی
    }

    // تغییر حالت بازیکن
    setState(state) {
        this.currentState = this.states[state] // تغییر حالت فعلی
        this.currentState.enter() // ورود به حالت جدید
    }

    // بررسی وضعیت ایستادن بر روی زمین
    onGround() {
        return this.y >= this.gameHeight - this.height // اگر در زمین است
    }
}
