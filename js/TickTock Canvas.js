// انتخاب canvas و context دو‌بعدی آن
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// تنظیم شعاع ساعت و انتقال مبدا به مرکز
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius *= 0.90;

// به‌روزرسانی ساعت هر ثانیه
setInterval(drawClock, 1000);

// رسم ساعت
function drawClock() {
    drawFace(ctx, radius);  // رسم بدنه
    drawNumbers(ctx, radius);  // رسم اعداد
    drawTime(ctx, radius);  // رسم عقربه‌ها
}

// رسم صفحه ساعت
function drawFace(ctx, radius) {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);  // دایره ساعت
    ctx.fillStyle = "White";
    ctx.fill();

    // گرادیان خط دور
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // دایره کوچک مرکز
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

// رسم اعداد ساعت
function drawNumbers(ctx, radius) {
    let ang, num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {  // حلقه اعداد ۱ تا ۱۲
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// رسم عقربه‌ها بر اساس زمان
function drawTime(ctx, radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // موقعیت عقربه ساعت
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    // موقعیت عقربه دقیقه
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

    // موقعیت عقربه ثانیه
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

// رسم عقربه‌ها
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
