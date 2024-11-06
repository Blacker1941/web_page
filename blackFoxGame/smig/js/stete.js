export const states = { // تعریف حالت‌های مختلف بازیکن
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
}

class State { // کلاس پایه برای حالت‌ها
    constructor(state) {
        this.state = state; // نام حالت
    }
}

export class StandingLeft extends State { // حالت ایستاده به چپ
    constructor(player) {
        super(`STANDING LEFT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 1; // تعیین فریم انیمیشن
        this.player.speed = 0; // سرعت ۰
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT); // تغییر به حالت دویدن به راست
        else if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT); // تغییر به حالت دویدن به چپ
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT); // تغییر به حالت نشسته به چپ
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_LEFT); // تغییر به حالت پرش به چپ
    }
}

export class StandingRight extends State { // حالت ایستاده به راست
    constructor(player) {
        super(`STANDING_RIGHT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 0; // تعیین فریم انیمیشن
        this.player.speed = 0; // سرعت ۰
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS left') this.player.setState(states.STANDING_LEFT); // تغییر به حالت ایستاده به چپ
        else if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT); // تغییر به حالت دویدن به راست
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT); // تغییر به حالت نشسته به راست
        else if (input === 'PRESS up') this.player.setState(states.JUMPING_RIGHT); // تغییر به حالت پرش به راست
    }
}

export class SittingLeft extends State { // حالت نشسته به چپ
    constructor(player) {
        super(`SITTING LEFT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 9; // تعیین فریم انیمیشن
        this.player.speed = 0; // سرعت ۰
        this.player.maxFrame = 4; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS right') this.player.setState(states.SITTING_RIGHT); // تغییر به حالت نشسته به راست
        else if (input === 'PRESS up') this.player.setState(states.STANDING_LEFT); // تغییر به حالت ایستاده به چپ
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_LEFT); // تغییر به حالت ایستاده به چپ
    }
}

export class SittingRight extends State { // حالت نشسته به راست
    constructor(player) {
        super(`SITTING RIGHT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 8; // تعیین فریم انیمیشن
        this.player.speed = 0; // سرعت ۰
        this.player.maxFrame = 4; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS left') this.player.setState(states.SITTING_LEFT); // تغییر به حالت نشسته به چپ
        else if (input === 'PRESS up') this.player.setState(states.STANDING_RIGHT); // تغییر به حالت ایستاده به راست
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_RIGHT); // تغییر به حالت ایستاده به راست
    }
}

export class RunningLeft extends State { // حالت دویدن به چپ
    constructor(player) {
        super(`RUNNING LEFT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 7; // تعیین فریم انیمیشن
        this.player.speed = -this.player.maxSpeed; // تعیین سرعت منفی
        this.player.maxFrame = 8; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS right') this.player.setState(states.SITTING_RIGHT); // تغییر به حالت نشسته به راست
        else if (input === 'RELEASE left') this.player.setState(states.STANDING_LEFT); // تغییر به حالت ایستاده به چپ
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT); // تغییر به حالت نشسته به چپ
    }
}

export class RunningRight extends State { // حالت دویدن به راست
    constructor(player) {
        super(`RUNNING RIGHT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 6; // تعیین فریم انیمیشن
        this.player.speed = this.player.maxSpeed; // تعیین سرعت مثبت
        this.player.maxFrame = 8; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS left') this.player.setState(states.SITTING_LEFT); // تغییر به حالت نشسته به چپ
        else if (input === 'RELEASE right') this.player.setState(states.STANDING_RIGHT); // تغییر به حالت ایستاده به راست
        else if (input === 'PRESS down') this.player.setState(states.STANDING_RIGHT); // تغییر به حالت ایستاده به راست
    }
}

export class JumpingLeft extends State { // حالت پرش به چپ
    constructor(player) {
        super(`JUMPING LEFT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 3; // تعیین فریم انیمیشن
        if (this.player.onGround()) this.player.vy -= 40; // کاهش شتاب در صورت برخورد با زمین
        this.player.speed = -this.player.maxSpeed * 0.5; // تعیین سرعت منفی
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS right') this.player.setState(states.JUMPING_RIGHT); // تغییر به حالت پرش به راست
        else if (this.player.onGround()) this.player.setState(states.FALLING_LEFT); // تغییر به حالت سقوط
        else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT); // تغییر به حالت سقوط
    }
}

export class JumpingRight extends State { // حالت پرش به راست
    constructor(player) {
        super(`JUMPING RIGHT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 2; // تعیین فریم انیمیشن
        if (this.player.onGround()) this.player.vy -= 40; // کاهش شتاب در صورت برخورد با زمین
        this.player.speed = this.player.maxSpeed * 0.5; // تعیین سرعت مثبت
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS left') this.player.setState(states.JUMPING_LEFT); // تغییر به حالت پرش به چپ
        else if (this.player.onGround()) this.player.setState(states.FALLING_RIGHT); // تغییر به حالت سقوط
        else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT); // تغییر به حالت سقوط
    }
}

export class FallingLeft extends State { // حالت سقوط به چپ
    constructor(player) {
        super(`FALLING LEFT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 5; // تعیین فریم انیمیشن
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS right') this.player.setState(states.FALLING_RIGHT); // تغییر به حالت سقوط به راست
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT); // تغییر به حالت ایستاده به چپ
    }
}

export class FallingRight extends State { // حالت سقوط به راست
    constructor(player) {
        super(`FALLING RIGHT`); // نام حالت
        this.player = player; // ارجاع به بازیکن
    }
    enter() { // وارد شدن به حالت
        this.player.frameY = 4; // تعیین فریم انیمیشن
        this.player.maxFrame = 6; // حداکثر فریم‌ها
    }
    handleInput(input) { // مدیریت ورودی‌ها
        if (input === 'PRESS left') this.player.setState(states.FALLING_LEFT); // تغییر به حالت سقوط به چپ
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT); // تغییر به حالت ایستاده به راست
    }
}
