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
        h: 900
    },
    keys: {
        arrowLeft: 'ArrowLeft',
        arrowRight: 'ArrowRight'
    },
    ball: undefined,
    bar: undefined,
    bricks: [],
    powerUps: [],
    

    init() {
        this.canvasTag = document.getElementById('canvas');
        this.ctx = this.canvasTag.getContext('2d');
        this.ctx
        this.setDimensions();
        this.start();
        this.createBall();
        this.createBar();
        this.createBackground();
        this.createBrick();
        this.setEventListener();
        
    },

    createBar() {
        this.bar = new Bar(this.ctx, this.canvasSize, this.canvasSize.w /2 - 65, 845, 130, 40, 10, 'paddle-pink.png');
    },

    createBall() {
        this.ball = new Ball(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 18, 810, 36, 36, .4, 5, 5, 'german.png');
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, 0,0, 1000, 900, 'ironhack-logo.png');
    },

    createBrick() {
        for (let i = 0; i < 5; i++) {
            this.bricks[i] = [];
            for (let j = 0; j < 6; j++) {
                this.bricks[i].push(new Bricks (this.ctx, 150 * j + 90, 70 * i + 40, 80, 30))
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
        this.interval = setInterval(() => {
            // como hacer para que algo ocurra cada x tiempo
            // que quiero mas multiplo de 20, que quiero menos multiplo de 150 
            if (this.frames % 900 === 0) {
                this.generatepowerUp()
            }
            this.frames++; 
            this.clearScreen();
            
            this.drawAll();
            this.ballBarCollision();
            this.ballBrickCollision();
            this.barPowerUpCollision();
           
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

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },

    generatepowerUp() {
        const powerUpType = Math.round(Math.random());
        const randomPosX = Math.random() * this.canvasSize.w;
        switch (powerUpType) {
            case 0:
                this.powerUps.push(new Lives(this.ctx, randomPosX, -20, 20, 20, 2, 'lives.png', powerUpType));
                break;
            case 1:
                this.powerUps.push(new LongerBar(this.ctx, randomPosX, -125, 125, 125, 1, 'salsota.png', powerUpType));
                break;
            default:
        }
    },

    barPowerUpCollision() {
        for (let i = 0; i < this.powerUps.length; i++){
            if (this.powerUps[i].powerUpPos.x < this.bar.barPos.x + this.bar.barSize.w &&
                this.powerUps[i].powerUpPos.x + this.powerUps[i].powerUpSize.w > this.bar.barPos.x &&
                this.powerUps[i].powerUpPos.y < this.bar.barPos.y + this.bar.barSize.h &&
                this.powerUps[i].powerUpSize.h + this.powerUps[i].powerUpPos.y > this.bar.barPos.y) {
                // switch (this.powerUps[i].typePowerUp) {
                //     case 0:
                //         lives++;
                //     case 1:
                //        this.bar setTimeout
                // }
            }
        }
    },

    ballBarCollision() {
        if (this.ball.ballPos.x < this.bar.barPos.x + this.bar.barSize.w &&
            this.ball.ballPos.x + this.ball.ballSize.w > this.bar.barPos.x &&
            this.ball.ballPos.y < this.bar.barPos.y + this.bar.barSize.h &&
            this.ball.ballSize.h + this.ball.ballPos.y > this.bar.barPos.y) {
            this.ball.changeDirectionY(); // direccion Y va bien falta solucionar la direccion X
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
                    this.bricks[i].splice(j, 1);
                    this.ball.changeDirectionY();
                    this.ball.changeDirectionX();
                }
            }
        }
    }
}