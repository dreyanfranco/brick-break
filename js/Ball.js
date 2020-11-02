class Ball {
    constructor(ctx, canvasSize, ballPosX, ballPosY, ballWidth, ballHeight, ballGravity, ballVelX, ballVelY, ballImage) {
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
            x: ballVelX,
            y: ballVelY
        };
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
            this.ballVel.y *= -1;
        } else if (this.ballPos.y >= this.canvasSize.h - this.ballSize.h) {
            // alert('game over');
            // document.location.reload();
            // clearInterval(interval)
        }
        if (this.ballPos.x >= this.canvasSize.w - this.ballSize.w || this.ballPos.x < 0) {
            this.ballVel.x *= -1;
        }
        this.ballPos.x += this.ballVel.x;
        this.ballPos.y -= this.ballVel.y;
    }

    changeDirection() {
        this.ballVel.y *= -1;
        this.ballVel.x *= -1;
    }
}

// 