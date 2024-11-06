"use strict"

let $ = document // ارجاع به شی سند

import { player } from './player.js' // بارگذاری کلاس بازیکن
import { InputHandler } from './input.js' // بارگذاری کلاس مدیریت ورودی
import { Background } from './back.js' // بارگذاری کلاس پس‌زمینه
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js' // بارگذاری کلاس‌های دشمنان
import { UI } from './UI.js' // بارگذاری کلاس رابط کاربری

window.addEventListener('load', function () {
    const canvas = $.getElementById('canvas1') // انتخاب عنصر کانواس
    const ctx = canvas.getContext('2d') // گرفتن کانتکست دو بعدی
    canvas.width = 500 // تنظیم عرض کانواس
    canvas.height = 500 // تنظیم ارتفاع کانواس

    class Game {
        constructor(width, height) {
            this.width = width // عرض بازی
            this.height = height // ارتفاع بازی
            this.groundMargin = 80 // حاشیه زمین
            this.speed = 0 // سرعت اولیه
            this.maxSpeed = 6 // حداکثر سرعت
            this.background = new Background(this) // ایجاد شیء پس‌زمینه
            this.player = new player(this) // ایجاد شیء بازیکن
            this.input = new InputHandler(this) // ایجاد شیء مدیریت ورودی
            this.UI = new UI(this) // ایجاد شیء رابط کاربری
            this.enemies = [] // آرایه دشمنان
            this.particles = [] // آرایه ذرات
            this.collisions = [] // آرایه برخوردها
            this.maxParticles = 50 // حداکثر تعداد ذرات
            this.enemyTimer = 0 // تایمر دشمن
            this.enemyInterval = 1000 // فاصله زمانی بین ایجاد دشمنان
            this.debug = false // حالت اشکال‌زدایی
            this.score = 0 // امتیاز
            this.fontColor = 'black' // رنگ فونت
            this.player.currentState = this.player.states[0] // تنظیم وضعیت فعلی بازیکن
            this.player.currentState.enter() // ورود به وضعیت
        }

        update(deltaTime) {
            // بروزرسانی وضعیت بازی
            this.background.update() // بروزرسانی پس‌زمینه
            this.player.update(this.input.keys, deltaTime) // بروزرسانی بازیکن

            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy() // افزودن دشمن
                this.enemyTimer = 0 // بازنشانی تایمر
            } else {
                this.enemyTimer += deltaTime // بروزرسانی تایمر
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime) // بروزرسانی دشمن
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1) // حذف دشمن‌های علامت‌گذاری‌شده
            })

            this.particles.forEach((particle, index) => {
                particle.update() // بروزرسانی ذرات
                if (particle.markedForDeletion) this.particles.splice(index, 1) // حذف ذرات علامت‌گذاری‌شده
            })

            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles) // محدود کردن تعداد ذرات
            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime) // بروزرسانی برخوردها
                if (collision.markedForDeletion) this.collisions.splice(index, 1) // حذف برخوردهای علامت‌گذاری‌شده
            })
        }

        draw(context) {
            // رسم عناصر بازی
            this.background.draw(context); // رسم پس‌زمینه
            this.player.draw(context) // رسم بازیکن
            this.enemies.forEach(enemy => {
                enemy.draw(context) // رسم دشمنان
            })
            this.particles.forEach(particle => {
                particle.draw(context) // رسم ذرات
            })
            this.collisions.forEach(collision => {
                collision.draw(context) // رسم برخوردها
            })
            this.UI.draw(context) // رسم رابط کاربری
        }

        addEnemy() {
            // افزودن دشمن جدید به بازی
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this)) // دشمن زمینی
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this)) // دشمن صعودی
            this.enemies.push(new FlyingEnemy(this)) // دشمن پرنده
        }
    }

    const game = new Game(canvas.width, canvas.height) // ایجاد شیء بازی
    let lastTime = 0 // زمان آخرین فریم

    function animate(timestamp) {
        // تابع انیمیشن
        const deltaTime = timestamp - lastTime // محاسبه زمان بین فریم‌ها
        lastTime = timestamp // به‌روزرسانی زمان آخرین فریم
        ctx.clearRect(0, 0, canvas.width, canvas.height) // پاک کردن کانواس
        game.update(deltaTime) // بروزرسانی بازی
        game.draw(ctx) // رسم بازی
        requestAnimationFrame(animate) // درخواست فریم بعدی
    }

    animate(0) // آغاز انیمیشن
})
