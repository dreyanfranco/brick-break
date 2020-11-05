class Ball {
    constructor(ctx, canvasSize, ballPosX, ballPosY, ballWidth, ballHeight, ballGravity, ballSpeed, ballImage) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        };
        this.ballPos = {
            x: ballPosX,
            y: ballPosY
        };
        this.ballSize = {
            w: ballWidth,
            h: ballHeight
        }
        this.ballVel = {
            x: ballSpeed,
            y: ballSpeed
        };
        this.ballSpeed = ballSpeed;
        this.ballGravity = ballGravity;
        this.ballImageName = ballImage;
        this.ballImageInstance = undefined;
        this.init();
    }
    init() {
        this.ballImageInstance = new Image();
        this.ballImageInstance.src = `img/${this.ballImageName}`;
    }
    draw() {
        this.moveBall();
        this.ctx.drawImage(this.ballImageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h);
    }
    
    moveBall() {
        if (this.ballPos.y < 0) {
            this.changeDirectionY();
        } else if (this.ballPos.y >= this.canvasSize.h) {
            // alert('game over');
            // document.location.reload();
            // clearInterval(interval)
        }
        if (this.ballPos.x >= this.canvasSize.w - this.ballSize.w || this.ballPos.x < 0) {
            this.changeDirectionX();
        }
        this.ballPos.x += this.ballVel.x;
        this.ballPos.y -= this.ballVel.y;
    }

    changeDirectionY() {
        this.ballVel.y *= -1;
    }

    changeDirectionX() {
        this.ballVel.x *= -1;
    }

    changeAngleX(centerCollision, maxDistance ) {
        this.ballVel.x = (((this.ballPos.x + this.ballSize.w / 2) - centerCollision) / maxDistance) * this.ballSpeed;
    }
    // changeAngleY(centerCollision, maxDistance) {
    //     console.log(`antes es ${this.ballVel.x}`);
    //     this.ballVel.y = (((this.ballPos.y + this.ballSize.h / 2) - centerCollision) / maxDistance) * this.ballSpeed;
    //     console.log(`ahora es ${this.ballVel.x}`);
    // }

    



}
