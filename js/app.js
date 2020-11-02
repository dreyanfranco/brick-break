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
        this.bar = new Bar(this.ctx, this.canvasSize, this.canvasSize.w /2 - 20, 845, 150, 40, 10, 'paddle-pink.png');
    },

    createBall() {
        this.ball = new Ball(this.ctx, this.canvasSize, 500, 810, 35, 35, .4, 5, 5, 'beach-ball.png');
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, 0,0, 100, 100, 'redsun.jpeg');
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

        setInterval(() => {
            // como hacer para que algo ocurra cada x tiempo
            // que quiero mas multiplo de 20, que quiero menos multiplo de 150 
            // this.frames++; 
            // this.frames % 50 === 0 ? this.generatepowerUp() console.log('nuevo obstaculo o power up?') : null 
            this.clearScreen();
            this.drawAll();
            this.ballBarCollision();
            this.ballBrickCollision()
           
            // this.clearAll();
        }, 1000 / this.fps);
    },

    drawAll() {
        this.background.draw();
        this.ball.draw();
        this.bar.draw();
        this.drawBricks(); // recorrer el array bricks 


    },
    drawBricks() {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = 0; j < this.bricks[i].length; j++) {
                this.bricks[i][j].draw();
            }
        }
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },
    // generatepowerUp() {

    // },

    ballBarCollision() {
        if (this.ball.ballPos.x < this.bar.barPos.x + this.bar.barSize.w && this.ball.ballPos.x + this.ball.ballSize.w > this.bar.barPos.x && this.ball.ballPos.y < this.bar.barPos.y + this.bar.barSize.h && this.ball.ballSize.h + this.ball.ballPos.y > this.bar.barPos.y) {
            this.ball.changeDirectionY();
        }
    },

    ballBrickCollision() {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = 0; j < this.bricks[i].length; j++) {
                this.bricks[i][j].draw();
                if (this.ball.ballPos.x > this.bricks.bricksPos.x && this.ball.ballPos.x < this.bricks.bricksPos.x + this.bricks.bricksSize.w + this.ball.ballPos.y > this.bricks.bricksPos.y && this.ball.ballPos.y < this.bricks.bricksPos.y + this.bricks.bricksSize.h) {
                    console.log('ha colisionado');
                    this.ball.changeDirectionY();
                }
            }
        }
    }
}