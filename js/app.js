const App = {
    name: 'Brick Breaker Game',
    description: 'Canvas game app of brick breaker',
    version: '1.0.0',
    license: undefined,
    authors: 'Dreyan Franco y Adrián Monzón',
    canvasTag: undefined,
    ctx: undefined,
    fps: 60,
    frames: 0,
    canvasSize: {
        w: 1000,
        h: 700
    },
    keys: {
        arrowLeft: 'ArrowLeft',
        arrowRight: 'ArrowRight'
    },
    ball: undefined,
    bar: undefined,
    bricks: [],
    powerUps: [],
    livesCounter: 3,
    scoreCounter: 0,
    

    init() {
        this.canvasTag = document.getElementById('canvas');
        this.ctx = this.canvasTag.getContext('2d');
        this.ctx
        this.setDimensions();
        this.start();
        this.createAll();
        this.setEventListener();
       
        
    },

    createAll() {
        // this.createBall();
        // this.createBar();
        // this.createBackground();
        this.createBrick();
    },

    // createBar() {
        
    // },

    // createBall() {

    // },
    // createBackground() {

    // },

    createBrick() {
        for (let i = 0; i < 4; i++) {
            this.bricks[i] = [];
            for (let j = 0; j < 6; j++) {
                this.bricks[i].push(new Bricks(this.ctx, 150 * j + 80, 70 * i + 40, 90, 30))
            }
        }
    },

    setDimensions() {
        this.canvasTag.width = this.canvasSize.w;
        this.canvasTag.height = this.canvasSize.h;
    },

    setEventListener() {
        document.onkeydown = event => {
            if (event.key === this.keys.arrowRight) {
                this.bar.move('right');
            }
            if (event.key === this.keys.arrowLeft) {
                this.bar.move('left');
            }
        }

    },

    start() {
        this.audioBackground = new Audio('audio/background-sound.mp3');
        this.audioGameover = new Audio('audio/gameover.mp3');
        this.audioSalsota = new Audio('audio/salsota-sound.mp3');
        this.audioLive = new Audio('audio/vida-sound.mp3');
        this.audioWinning = new Audio('audio/winning-sound.mp3');
        // this.audioBackground.play();
        this.partialReset();
        this.interval = setInterval(() => {
            // que quiero mas multiplo de 20, que quiero menos multiplo de 150 
            if (this.frames % 1000 === 0) {
                this.generatepowerUp()
            }
            this.frames++; 
            this.clearScreen();
            this.drawAll();
            this.ballBarCollision();
            this.ballBrickCollision();
            this.barPowerUpCollision();
            this.liveControl();
            
            if (this.livesCounter === 2) {
                this.gameOver();
            }
            
            // this.clearAll();
        }, 1000 / this.fps);
    },

    drawAll() {
        this.background.draw();
        this.ball.draw();
        this.bar.draw();
        this.drawBricks(); 
        if (this.powerUps.length > 0) {
            this.drawPowerUps();
        }
        this.drawText();
    },

    drawBricks() {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = 0; j < this.bricks[i].length; j++) {
                this.bricks[i][j].draw();

            }
        }
    },

    drawPowerUps() {
        this.powerUps.forEach(element => {
            element.draw();
        });
    },

    drawText() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText(`Lives: ${this.livesCounter}`, 850, 30)
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText(`Score: ${this.scoreCounter}`, 50, 30)
    },


    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },

    generatepowerUp() {
        const powerUpType = Math.round(Math.random());
        const randomPosX = Math.random() * this.canvasSize.w;
        switch (powerUpType) {
            case 0:
                this.powerUps.push(new Lives(this.ctx, randomPosX, -20, 20, 20, 2, 'heart.png', powerUpType));
                break;
            case 1:
                this.powerUps.push(new LongerBar(this.ctx, randomPosX, -125, 125, 30, 1, 'salsota.png', powerUpType));
                break;
            default:
        }
    },
    partialReset() {
        this.bar = new Bar(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 65, 645, 130, 40, 20, 'paddle-pink.png');
        this.ball = new Ball(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 18, 610, 36, 36, .4, 3, 'german.png');
        this.background = new Background(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 350, 0, 700, 700, 'ironhack-logo.png');
        
    },
    // totalReset() {
    //     this.createAll();
    // },
    liveControl() {
        if (this.ball.ballPos.y >= this.canvasSize.h  && this.ball.ballPos.y <= this.canvasSize.h + 1 ) {
            // document.location.reload();
            this.livesCounter--;
            // this.partialReset();
        } 

    },

    barPowerUpCollision() {
        for (let i = 0; i < this.powerUps.length; i++){
            if (this.powerUps[i].powerUpPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                this.powerUps[i].powerUpPos.x + this.powerUps[i].powerUpSize.w > this.bar.barPos.x &&
                this.powerUps[i].powerUpPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                this.powerUps[i].powerUpSize.h + this.powerUps[i].powerUpPos.y > this.bar.barPos.y) {
                switch (this.powerUps[i].typePowerUp) {
                    case 0:
                        this.audioLive.play();
                        this.powerUps.splice(i, 1);
                        this.livesCounter++;
                        
                        break;
                    case 1:
                        this.bar.changeLarge(200);
                        this.audioSalsota.play();
                        this.powerUps.splice(i, 1);
                        const longerBar = setTimeout(() => {
                            this.bar.changeLarge(130)
                        }, 10000);
                        break;

                }
            }
        }
    },

    ballBarCollision() {
        if (this.ball.ballPos.x < this.bar.barPos.x + this.bar.barSize.w &&
            this.ball.ballPos.x + this.ball.ballSize.w > this.bar.barPos.x &&
            this.ball.ballPos.y < this.bar.barPos.y + this.bar.barSize.h &&
            this.ball.ballSize.h + this.ball.ballPos.y > this.bar.barPos.y) {
            this.ball.changeDirectionY();
            this.ball.changeAngleX(this.bar.barPos.x + this.bar.barSize.w / 2, this.bar.barSize.w / 2);
        }
    },

    ballBrickCollision() {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = 0; j < this.bricks[i].length; j++) {

                if (this.ball.ballPos.x < this.bricks[i][j].bricksPos.x +
                    this.bricks[i][j].bricksSize.w &&
                    this.ball.ballPos.x + this.ball.ballSize.w > this.bricks[i][j].bricksPos.x &&
                    this.ball.ballPos.y < this.bricks[i][j].bricksPos.y + this.bricks[i][j].bricksSize.h && 
                    this.ball.ballPos.y + this.ball.ballSize.h > this.bricks[i][j].bricksPos.y) {
                    const distanceBtwCenters = (this.bricks[i][j].bricksPos.x + this.bricks[i][j].bricksSize.w / 2) - (this.ball.ballPos.x + this.ball.ballSize.w / 2);
                    
                    this.scoreCounter += 10;

                    if (distanceBtwCenters < this.bricks[i][j].bricksSize.w / 2 && distanceBtwCenters > -this.bricks[i][j].bricksSize.w / 2 ) {
                        this.ball.changeDirectionY();
                    } else {
                        this.ball.changeDirectionX()
                    }
                    this.bricks[i].splice(j, 1);
                }
            }
        }
    },

    gameOver() {
        clearInterval(this.interval)
    }
}