"use strict"

export class InputHandler {
    constructor(game) {
        this.game = game // ارجاع به شیء بازی
        this.keys = [] // آرایه‌ای برای ذخیره کلیدهای فشرده شده
        window.addEventListener("keydown", e => {
            // اضافه کردن رویداد برای کلیدهای فشرده شده
            if ((e.keyCode === 40 || e.keyCode === 38 ||  // کلیدهای Arrow Down و Arrow Up
                e.keyCode === 37 || e.keyCode === 39 ||  // کلیدهای Arrow Left و Arrow Right
                e.keyCode === 13 || e.keyCode === 87 ||  // کلیدهای Enter و W
                e.keyCode === 65 || e.keyCode === 83 ||  // کلیدهای A و S
                e.keyCode === 68 || e.keyCode === 32) && // کلیدهای D و Space
                this.keys.indexOf(e.keyCode) === -1) { // بررسی اینکه آیا کلید قبلاً فشرده نشده است
                this.keys.push(e.keyCode) // اضافه کردن کلید به آرایه
            } else if (e.key === 'd') this.game.debug = !this.game.debug // تغییر وضعیت حالت اشکال‌زدایی
        })

        window.addEventListener("keyup", e => {
            // اضافه کردن رویداد برای کلیدهای رها شده
            if (e.keyCode === 40 || e.keyCode === 38 ||  // کلیدهای Arrow Down و Arrow Up
                e.keyCode === 37 || e.keyCode === 39 ||  // کلیدهای Arrow Left و Arrow Right
                e.keyCode === 13 || e.keyCode === 87 ||  // کلیدهای Enter و W
                e.keyCode === 65 || e.keyCode === 83 ||  // کلیدهای A و S
                e.keyCode === 68 || e.keyCode === 32) {  // کلیدهای D و Space
                this.keys.splice(this.keys.indexOf(e.keyCode), 1) // حذف کلید از آرایه
            }
        })
    }
}
