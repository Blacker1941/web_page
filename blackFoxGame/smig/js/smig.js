import Player from './player.js' // وارد کردن کلاس Player
import InputHandler from './input.js' // وارد کردن کلاس InputHandler
import { drawStatusText } from './utils.js' // وارد کردن تابع برای رسم متن وضعیت

"use strict" // فعال‌سازی حالت سخت‌گیرانه جاوااسکریپت

let $ = document // ارجاع به document

// اجرای تابع پس از بارگذاری صفحه
window.addEventListener('load', function() {
    const loading = $.getElementById('loading') // دریافت عنصر بارگذاری
    loading.style.display = 'none' // پنهان کردن بارگذاری

    const canvas = $.getElementById('canvas1') // دریافت کانواس
    const context = canvas.getContext('2d') // تنظیم زمینه کانواس
    canvas.width = window.innerWidth // تنظیم عرض کانواس
    canvas.height = window.innerHeight // تنظیم ارتفاع کانواس

    const player = new Player(canvas.width, canvas.height) // ایجاد بازیکن
    const input = new InputHandler() // مدیریت ورودی

    let lastTime = 0 // زمان آخرین فریم

    // تابع انیمیشن برای بروزرسانی و رسم فریم‌ها
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime // زمان بین فریم‌ها
        lastTime = timestamp // به‌روزرسانی زمان آخرین فریم
        context.clearRect(0, 0, canvas.width, canvas.height) // پاک کردن کانواس

        player.update(input.lastKey) // بروزرسانی بازیکن
        player.draw(context, deltaTime) // رسم بازیکن
        drawStatusText(context, input, player) // رسم متن وضعیت بازی

        requestAnimationFrame(animate) // درخواست فریم بعدی
    }
    animate(0) // شروع انیمیشن
})

