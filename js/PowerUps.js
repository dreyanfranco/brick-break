class PowerUps {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpWidth, powerUpHeight, powerUpSpeed, powerUpImage, typePowerUp) {
        this.ctx = ctx;
        this.powerUpPos = {
            x: powerUpPosX,
            y: powerUpPosY
        }
        this.powerUpSize = {
            w: powerUpWidth,
            h: powerUpHeight
        }
        this.powerUpSpeed = powerUpSpeed;
        this.powerUpImageName = powerUpImage;
        this.powerUpImageInstance = undefined;
        this.typePowerUp = typePowerUp;
        this.init();
    }

    init() {
        this.powerUpImageInstance = new Image();
        this.powerUpImageInstance.src = `img/${this.powerUpImageName}`;
    }
    draw() {
        this.dropPowerUp();
        this.ctx.drawImage(this.powerUpImageInstance, this.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h);
    }
    dropPowerUp() {
    
        this.powerUpPos.y += this.powerUpSpeed;
    }
    // changeSize() {

    // }
}

class Lives extends PowerUps {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpWidth, powerUpHeight, powerUpSpeed, livesImage, typePowerUp) {
        super(ctx, powerUpPosX, powerUpPosY, powerUpWidth, powerUpHeight, powerUpSpeed, livesImage, typePowerUp);
    }

}

class LongerBar extends PowerUps {
    constructor(ctx, powerUpPosX, powerUpPosY, powerUpWidth, powerUpHeight, powerUpSpeed, longerBarImage, typePowerUp) {
        super(ctx, powerUpPosX, powerUpPosY, powerUpWidth, powerUpHeight, powerUpSpeed, longerBarImage, typePowerUp);
        this.longerBarImageName = longerBarImage;
        this.longerBarImageInstance = undefined;
    }

}