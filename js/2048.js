const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let grid = [];
let score = 0;

function init() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    updateDisplay();
    generateRandomTile();
    generateRandomTile();
}

function generateRandomTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateDisplay() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (grid[i][j] > 0) {
                cell.classList.add(`grid-cell-${grid[i][j]}`);
                cell.textContent = grid[i][j];
            }
            gridContainer.appendChild(cell);
        }
    }
    scoreDisplay.textContent = `score: ${score}`;
}

function move(direction) {
    let moved = false;
    let newGrid = grid.map(row => row.slice());

    switch (direction) {
        case 'up':
            for (let col = 0; col < 4; col++) {
                let stack = [];
                for (let row = 0; row < 4; row++) {
                    if (newGrid[row][col] !== 0) {
                        stack.push(newGrid[row][col]);
                    }
                }
                stack = combineTiles(stack);
                for (let row = 0; row < 4; row++) {
                    newGrid[row][col] = stack[row] || 0;
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

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
        grid = newGrid;
        generateRandomTile();
        moved = true;
    }

    if (moved) {
        updateDisplay();
        checkGameOver();
    }
}

function combineTiles(stack) {
    let newStack = [];
    for (let i = 0; i < stack.length; i++) {
        if (stack[i] === stack[i + 1]) {
            newStack.push(stack[i] * 2);
            score += stack[i] * 2;
            i++;
        } else {
            newStack.push(stack[i]);
        }
    }
    return newStack;
}

function checkGameOver() {
    if (grid.flat().every(cell => cell !== 0)) {
        alert('Game over! Final score: ' + score);
        init();
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

restartButton.addEventListener('click', init);

init();