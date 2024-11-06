"use strict"

let $ = document

// کلاس لایه برای پس‌زمینه
class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game // مرجع به بازی
        this.width = width // عرض لایه
        this.height = height // ارتفاع لایه
        this.speedModifier = speedModifier // میزان تأثیر سرعت بر حرکت لایه
        this.image = image // تصویر لایه
        this.x = 0 // موقعیت افقی لایه
        this.y = 0 // موقعیت عمودی لایه
    }

    // به‌روزرسانی موقعیت لایه
    update() {
        // اگر لایه از صفحه خارج شود، به ابتدا برمی‌گردد
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier // به‌روزرسانی موقعیت بر اساس سرعت بازی
    }

    // رسم لایه
    draw(context) {
        // رسم لایه اصلی
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        // رسم لایه در سمت راست برای تکرار بی‌نهایت
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

// کلاس پس‌زمینه برای مدیریت لایه‌های مختلف
export class Background {
    constructor(game) {
        this.game = game // مرجع به بازی
        this.width = 1667 // عرض پس‌زمینه
        this.height = 500 // ارتفاع پس‌زمینه
        // بارگذاری تصاویر لایه‌های مختلف
        this.layer1image = $.getElementById('layer1')
        this.layer2image = $.getElementById('layer2')
        this.layer3image = $.getElementById('layer3')
        this.layer4image = $.getElementById('layer4')
        this.layer5image = $.getElementById('layer5')
        // ایجاد لایه‌ها با سرعت‌های مختلف
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image)
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image)
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image)
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image)
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image)
        // ذخیره لایه‌ها در آرایه
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5]
    }

    // به‌روزرسانی تمام لایه‌ها
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update() // به‌روزرسانی هر لایه
        })
    }

    // رسم تمام لایه‌ها
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context) // رسم هر لایه
        })
    }
}
