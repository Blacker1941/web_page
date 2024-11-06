"use strict"

let $ = document // ارجاع به شی document

import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerState.js' // وارد کردن کلاس‌های وضعیت‌های مختلف بازیکن
import { CollisionAnimation } from './CollisionAnimation.js' // وارد کردن کلاس انیمیشن برخورد

export class player {
    constructor(game) {
        this.game = game // ارجاع به شی بازی
        this.width = 100 // عرض بازیکن
        this.height = 91.3 // ارتفاع بازیکن
        this.x = 0 // موقعیت افقی بازیکن
        this.y = this.game.height - this.height - this.game.groundMargin // موقعیت عمودی بازیکن
        this.vy = 0 // سرعت عمودی
        this.weight = 1 // وزن
        this.image = $.getElementById('player') // بارگذاری تصویر بازیکن
        this.frameX = 0 // فریم افقی
        this.frameY = 0 // فریم عمودی
        this.fps = 20 // فریم در ثانیه
        this.frameInterval = 1000 / this.fps // فاصله زمانی بین فریم‌ها
        this.frameTimer = 0 // تایمر فریم
        this.speed = 0 // سرعت افقی
        this.maxSpeed = 10 // حداکثر سرعت
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)] // حالت‌های مختلف بازیکن
    }

    update(input, deltaTime) {
        this.checkCollision() // بررسی برخورد با دشمنان
        this.currentState.handleInput(input) // مدیریت ورودی بر اساس وضعیت فعلی
        this.x += this.speed // بروزرسانی موقعیت افقی

        // تنظیم سرعت بر اساس ورودی
        if (input.includes(39) || input.includes(68)) {
            this.speed = this.maxSpeed // حرکت به سمت راست
        } else if (input.includes(37) || input.includes(65)) {
            this.speed = -this.maxSpeed // حرکت به سمت چپ
        } else {
            this.speed = 0 // توقف
        }

        // محدود کردن موقعیت افقی
        if (this.x < 0) this.x = 0
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

        this.y += this.vy // بروزرسانی موقعیت عمودی
        if (!this.onGround()) {
            this.vy += this.weight // اعمال وزن در صورت عدم برخورد با زمین
        } else {
            this.vy = 0 // ریست کردن سرعت عمودی
        }
        // محدود کردن موقعیت عمودی
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

        // بروزرسانی فریم
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) {
                this.frameX++ // افزایش فریم افقی
            } else {
                this.frameX = 0 // ریست فریم
            }
        } else {
            this.frameTimer += deltaTime // افزایش تایمر فریم
        }
    }

    draw(context) {
        // رسم بازیکن
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height) // رسم مستطیل برای اشکال‌زدایی
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height) // رسم تصویر بازیکن
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin // بررسی برخورد با زمین
    }

    setState(state, speed) {
        this.currentState = this.states[state] // تنظیم وضعیت فعلی
        this.game.speed = this.game.maxSpeed * speed // تنظیم سرعت بازی
        this.currentState.enter() // ورود به وضعیت جدید
    }

    checkCollision() {
        // بررسی برخورد با دشمنان
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true // علامت‌گذاری دشمن برای حذف
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)) // اضافه کردن انیمیشن برخورد
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++ // افزایش امتیاز در صورت غلتیدن یا غوطه‌وری
                } else {
                    this.setState(6, 0) // تغییر به وضعیت آسیب دیده
                }
            }
        })
    }
}
