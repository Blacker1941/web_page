"use strict"

let $ = document

$.addEventListener('DOMContentLoaded', function () {
    const canvas = $.getElementById(`canvas1`)
    const fullScreenButton =$.getElementById('fullScreenButton');
    const ctx = canvas.getContext(`2d`)
    canvas.width = 1400
    canvas.height = 720
    let enemies = []
    let score = 0
    let gameOver=false

    class InputHandler {
        constructor() {
            this.keys = []
            this.touchy = ``
            this.touchTreshold = 30
            window.addEventListener(`keydown`, e => {
                if ((e.keyCode === 40 ||
                    e.keyCode === 38 ||
                    e.keyCode === 37 ||
                    e.keyCode === 39 ||
                    e.keyCode === 87 ||
                    e.keyCode === 65 ||
                    e.keyCode === 83 ||
                    e.keyCode === 68 ||
                    e.keyCode === 32) &&
                    this.keys.indexOf(e.keyCode) === -1) {
                    this.keys.push(e.keyCode)
                }else if (e.keyCode === 13 && gameOver) restartGame()
            })

            window.addEventListener('keyup', e => {
                if (e.keyCode === 40 ||
                    e.keyCode === 38 ||
                    e.keyCode === 37 ||
                    e.keyCode === 39 ||
                    e.keyCode === 87 ||
                    e.keyCode === 65 ||
                    e.keyCode === 83 ||
                    e.keyCode === 68 ||
                    e.keyCode === 32) {
                    this.keys.splice(this.keys.indexOf(e.keyCode), 1)
                }
            })
            window.addEventListener('touchstart', e => {
                this.touchy = e.changedTouches[0].pageY
            })
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchy;
                if (swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) {
                    this.keys.push('swipe up')
                } else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down')
                    if (gameOver) restartGame()
                }
            })
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1)
                this.keys.splice(this.keys.indexOf('swipe down'), 1)
            })
        }
    }




    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 200
            this.height = 200
            this.x = 100
            this.y = this.gameHeight - this.height
            this.image = $.getElementById('playerImage')
            this.frameX = 0
            this.maxFrame = 8
            this.frameY = 0
            this.fps= 20
            this.frameTimer = 0
            this.frameInterval =1000/this.fps
            this.speed = 0
            this.vy = 0
            this.weight = 1
        }
        restart(){
            this.x = 100
            this.y= this.gameHeight-this.height
            this.maxFrame = 8
            this.frameY = 0
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(input, deltaTime, enemies) {
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / 2-20) - (this.x + this.width / 2)
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2+20)
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < enemy.width / 3 + this.width / 3) {
                    gameOver = true;
                }
            })

            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            if (input.keys.indexOf(39) > -1 || input.keys.indexOf(68) > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf(37) > -1 || input.keys.indexOf(65) > -1) {
                this.speed = -5;
            } else {
                this.speed = 0;
            }

            if ((input.keys.indexOf(38) > -1 || input.keys.indexOf(87) > -1 || input.keys.indexOf(32) > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()) {
                this.vy -= 32;
            }

            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxFrame = 5;
                this.frameY = 0;
            }

            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }



        onGround() {
            return this.y >= this.gameHeight - this.height
        }
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 2400
            this.height = 720
            this.x = 0
            this.y = 0
            this.image = $.getElementById('backgroundImage')
            this.speed = 7
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
        }
        update() {
            this.x -= this.speed
            if (this.x < 0 - this.width) this.x = 0
        }
        restart(){
            this.x=0
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.width = 160
            this.height = 119
            this.image = $.getElementById('enemyImage')
            this.x = this.gameWidth
            this.y = this.gameHeight - this.height
            this.frameX = 0
            this.maxFrame= 5
            this.fps= 20
            this.frameTimer = 0
            this.frameInterval =1000/this.fps
            this.speed = 8
            this.markedForDeletion = false;
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.width, 0 , this.width , this.height , this.x, this.y , this.width , this.height )

        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0
                else this.frameX++
                this.frameTimer = 0
            }else{
                this.frameTimer += deltaTime
            }
            this.x-= this.speed
            if (this.x < 0- this.width) {
                this.markedForDeletion =true
                score++
            }
        }
    }

    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height))
            randomEnemyInterval= Math.random() *1000+ 500;
            enemyTimer = 0
        } else {
            enemyTimer += deltaTime
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx)
            enemy.update(deltaTime)
        })
        enemies =enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function displayStatusText(context) {
        context.textAlign = 'left'
        context.font = "40px Helvetica"
        context.fillStyle = 'black'
        context.fillText(`Score: ` + score, 20, 50)
        context.fillStyle = 'white'
        context.fillText(`Score: ` + score, 22, 52)
        if (gameOver) {
            context.textAlign = 'center'
            context.fillStyle = 'black'
            context.fillText('GAME OVER, press Enter or swipe down to restart!',canvas.width/2, 200);
            context.fillStyle = 'white'
            context.fillText('GAME OVER, press Enter or swipe down to restart!',canvas.width/2+2, 202);
        }
    }

    function restartGame() {
        player.restart()
        background.restart()
        enemies = []
        score = 0
        gameOver = false
        lastTime = 0
        animate(0)
    }

    function toggleFullScreen(){
        if (!$.fullscreenElement){
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't enable full-screen mode: ${err.message}`)
            })
        }else{
            $.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen)

    const input = new InputHandler()
    const player = new Player(canvas.width, canvas.height)
    const background = new Background(canvas.width, canvas.height)

    let lastTime = 0
    let enemyTimer = 0
    let enemyInterval = 1000
    let randomEnemyInterval= Math.random() *1000 + 500;

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.update();
        background.draw(ctx);
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);

        displayStatusText(ctx);

        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    }

    animate(0)
})