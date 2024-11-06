import { Dust , Fire ,Splash} from './particles.js' // وارد کردن ذرات مختلف

// تعریف حالت‌های مختلف
const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}

// کلاس پایه برای وضعیت‌ها
class State {
    constructor(state, game) {
        this.state = state // نام وضعیت
        this.game = game // ارجاع به شی بازی
    }
}

// وضعیت نشسته
export class Sitting extends State {
    constructor(game) {
        super('SITTING', game) // فراخوانی سازنده کلاس پایه
    }

    enter() {
        this.game.player.frameX = 0 // تنظیم فریم فعلی
        this.game.player.maxFrame = 4 // حداکثر فریم
        this.game.player.frameY = 5 // فریم عمودی
    }

    handleInput(input) {
        // مدیریت ورودی و تغییر به حالت‌های دیگر
        if (input.includes(37) || input.includes(39) || input.includes(68) || input.includes(65)) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (input.includes(38) || input.includes(32) || input.includes(87)) {
            this.game.player.setState(states.JUMPING, 1)
        } else if (input.includes(13)) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}

// وضعیت در حال دویدن
export class Running extends State {
    constructor(game) {
        super('RUNNING', game)
    }

    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 3
    }

    handleInput(input) {
        // ایجاد ذره خاک در حال دویدن
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height))
        // مدیریت ورودی و تغییر وضعیت
        if (input.includes(40) || input.includes(83)) {
            this.game.player.setState(states.SITTING, 0)
        } else if (input.includes(38) || input.includes(32) || input.includes(87)) {
            this.game.player.setState(states.JUMPING, 1)
        } else if (input.includes(13)) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}

// وضعیت در حال پرش
export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game)
    }

    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 27 // افزایش سرعت عمودی در هنگام پرش
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 1
    }

    handleInput(input) {
        // مدیریت ورودی و تغییر به حالت سقوط
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1)
        } else if (input.includes(13)) {
            this.game.player.setState(states.ROLLING, 2)
        } else if (input.includes(40) || input.includes(83)) {
            this.game.player.setState(states.DIVING, 0)
        }
    }
}

// وضعیت در حال سقوط
export class Falling extends State {
    constructor(game) {
        super('FALLING', game)
    }

    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 2
    }

    handleInput(input) {
        // مدیریت ورودی و تغییر به حالت‌های دیگر
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (input.includes(40) || input.includes(83)) {
            this.game.player.setState(states.DIVING, 0)
        }
    }
}

// وضعیت در حال غلتیدن
export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game)
    }

    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
    }

    handleInput(input) {
        // ایجاد ذره آتش در هنگام غلتیدن
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))
        // مدیریت ورودی و تغییر به حالت‌های دیگر
        if (!input.includes(13) && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
        } else if (!input.includes(13) && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1)
        } else if (input.includes(13) && (input.includes(38) || input.includes(32) || input.includes(87)) && this.game.player.onGround()) {
            this.game.player.vy -= 27 // پرش هنگام غلتیدن
        } else if (input.includes(40) || input.includes(83)) {
            this.game.player.setState(states.DIVING, 0)
        }
    }
}

// وضعیت در حال غوطه‌وری
export class Diving extends State {
    constructor(game) {
        super('DIVING', game)
    }

    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
        this.game.player.vy = 15 // تنظیم سرعت عمودی
    }

    handleInput(input) {
        // ایجاد ذره آتش در هنگام غوطه‌وری
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5))
        // مدیریت ورودی و تغییر به حالت‌های دیگر
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1)
            for (let i=0; i < 30; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width *0.5, this.game.player.y + this.game.player.height))
            }
        } else if (input.includes(13) && !this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}

// وضعیت آسیب دیده
export class Hit extends State {
    constructor(game) {
        super('HIT', game)
    }

    enter() {
        this.game.player.frameX = 0
        this.game.player.maxFrame = 10
        this.game.player.frameY = 4
    }

    handleInput(input) {
        // تغییر به حالت‌های دیگر پس از اتمام انیمیشن آسیب
        if (this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1)
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2)
        }
    }
}
