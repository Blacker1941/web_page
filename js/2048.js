const gridContainer = document.getElementById('grid-container'); // انتخاب عنصر کانتینر گرید
const scoreDisplay = document.getElementById('score'); // انتخاب عنصر نمایش امتیاز
const restartButton = document.getElementById('restart-button'); // انتخاب دکمه ریست

let grid = []; // گرید بازی
let score = 0; // امتیاز بازی

function init() {
    grid = [ // ایجاد گرید اولیه ۴x۴ با مقادیر صفر
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0; // ریست امتیاز
    updateDisplay(); // به‌روزرسانی نمایش
    generateRandomTile(); // تولید یک کاشی تصادفی
    generateRandomTile(); // تولید کاشی تصادفی دوم
}

function generateRandomTile() { // تولید کاشی جدید در گرید
    let emptyCells = []; // آرایه برای ذخیره خانه‌های خالی
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j }); // افزودن خانه خالی به آرایه
            }
        }
    }
    if (emptyCells.length > 0) { // اگر خانه خالی وجود دارد
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4; // قرار دادن ۲ یا ۴ در خانه تصادفی
    }
}

function updateDisplay() { // به‌روزرسانی نمایش گرید و امتیاز
    gridContainer.innerHTML = ''; // پاک‌کردن کانتینر گرید
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div'); // ایجاد خانه جدید
            cell.classList.add('grid-cell'); // افزودن کلاس
            if (grid[i][j] > 0) {
                cell.classList.add(`grid-cell-${grid[i][j]}`); // افزودن کلاس بر اساس مقدار
                cell.textContent = grid[i][j]; // نمایش مقدار
            }
            gridContainer.appendChild(cell); // افزودن خانه به کانتینر
        }
    }
    scoreDisplay.textContent = `score: ${score}`; // نمایش امتیاز
}

function move(direction) { // حرکت بر اساس جهت
    let moved = false; // آیا حرکتی انجام شده است؟
    let newGrid = grid.map(row => row.slice()); // ایجاد کپی از گرید

    switch (direction) { // حرکت به بالا، پایین، چپ یا راست
        case 'up':
            for (let col = 0; col < 4; col++) {
                let stack = []; // آرایه برای ذخیره کاشی‌ها
                for (let row = 0; row < 4; row++) {
                    if (newGrid[row][col] !== 0) {
                        stack.push(newGrid[row][col]); // افزودن کاشی غیر صفر به استک
                    }
                }
                stack = combineTiles(stack); // ترکیب کاشی‌ها
                for (let row = 0; row < 4; row++) {
                    newGrid[row][col] = stack[row] || 0; // قرار دادن مقادیر در گرید
                }
            }
            break;
        case 'down':
            for (let col = 0; col < 4; col++) {
                let stack = [];
                for (let row = 3; row >= 0; row--) {
                    if (newGrid[row][col] !== 0) {
                        stack.push(newGrid[row][col]);
                    }
                }
                stack = combineTiles(stack);
                for (let row = 3; row >= 0; row--) {
                    newGrid[row][col] = stack[3 - row] || 0;
                }
            }
            break;
        case 'left':
            for (let row = 0; row < 4; row++) {
                let stack = [];
                for (let col = 0; col < 4; col++) {
                    if (newGrid[row][col] !== 0) {
                        stack.push(newGrid[row][col]);
                    }
                }
                stack = combineTiles(stack);
                for (let col = 0; col < 4; col++) {
                    newGrid[row][col] = stack[col] || 0;
                }
            }
            break;
        case 'right':
            for (let row = 0; row < 4; row++) {
                let stack = [];
                for (let col = 3; col >= 0; col--) {
                    if (newGrid[row][col] !== 0) {
                        stack.push(newGrid[row][col]);
                    }
                }
                stack = combineTiles(stack);
                for (let col = 3; col >= 0; col--) {
                    newGrid[row][col] = stack[3 - col] || 0;
                }
            }
            break;
    }

    // بررسی تغییرات گرید
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
        grid = newGrid; // به‌روزرسانی گرید
        generateRandomTile(); // تولید کاشی جدید
        moved = true; // حرکتی انجام شده است
    }

    if (moved) {
        updateDisplay(); // به‌روزرسانی نمایش
        checkGameOver(); // بررسی پایان بازی
    }
}

function combineTiles(stack) { // ترکیب کاشی‌ها در استک
    let newStack = [];
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] === stack[i + 1]) { // اگر دو کاشی برابر بودند
            newStack.push(stack[i] * 2); // ترکیب و افزایش امتیاز
            score += stack[i] * 2; // به‌روزرسانی امتیاز
            i++; // پرش به کاشی بعدی
        } else {
            newStack.push(stack[i]); // افزودن کاشی به استک جدید
        }
    }
    return newStack; // بازگشت استک جدید
}

function checkGameOver() { // بررسی پایان بازی
    if (grid.flat().every(cell => cell !== 0)) { // اگر هیچ خانه خالی وجود نداشته باشد
        alert('Game over! Final score: ' + score); // نمایش پیام پایان بازی
        init(); // ریست بازی
    }
}

// مدیریت ورودی کیبورد
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move('up'); // حرکت به بالا
            break;
        case 'ArrowDown':
            move('down'); // حرکت به پایین
            break;
        case 'ArrowLeft':
            move('left'); // حرکت به چپ
            break;
        case 'ArrowRight':
            move('right'); // حرکت به راست
            break;
    }
});

// ریست بازی با کلیک دکمه
restartButton.addEventListener('click', init);

init(); // شروع بازی
