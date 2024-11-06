export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game // مرجع به بازی
        this.image = document.getElementById('collisionAnimation') // بارگذاری تصویر انیمیشن برخورد
        this.spriteWidth = 100 // عرض هر فریم انیمیشن
        this.spriteHeight = 90 // ارتفاع هر فریم انیمیشن
        this.sizeModifier = Math.random() + 0.5 // تنظیم اندازه تصادفی
        this.width = this.spriteWidth * this.sizeModifier // محاسبه عرض نهایی
        this.height = this.spriteHeight * this.sizeModifier // محاسبه ارتفاع نهایی
        this.x = x - this.width * 0.5 // موقعیت افقی انیمیشن
        this.y = y - this.height * 0.5 // موقعیت عمودی انیمیشن
        this.framex = 0 // فریم فعلی انیمیشن
        this.maxFrame = 4 // حداکثر فریم‌های انیمیشن
        this.markedForDeletion = false // نشانه‌گذاری برای حذف انیمیشن
        this.fps = Math.random() * 10 + 5 // فریم در ثانیه تصادفی
        this.frameInterval = 1000 / this.fps // زمان بین فریم‌ها
        this.frameTimer = 0 // زمان‌سنج برای فریم‌ها
    }

    // رسم انیمیشن برخورد
    draw(context) {
        context.drawImage(this.image, this.framex * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

    // به‌روزرسانی وضعیت انیمیشن
    update(deltaTime) {
        this.x -= this.game.speed // به‌روزرسانی موقعیت افقی بر اساس سرعت بازی
        // به‌روزرسانی فریم انیمیشن
        if (this.frameTimer > this.frameInterval) {
            this.framex++ // رفتن به فریم بعدی
            this.frameTimer = 0 // بازنشانی زمان‌سنج
        } else {
            this.frameTimer += deltaTime // افزایش زمان‌سنج
        }
        // اگر فریم‌ها تمام شده باشند، نشانه‌گذاری برای حذف
        if (this.framex > this.maxFrame) this.markedForDeletion = true
    }
}
