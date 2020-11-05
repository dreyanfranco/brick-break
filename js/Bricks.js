class Bricks {
    constructor(ctx, bricksPosX, bricksPosY, bricksWidth, bricksHeight) {
        this.ctx = ctx;
        this.bricksPos = {
            x: bricksPosX,
            y: bricksPosY
        };
        this.bricksSize = {
            w: bricksWidth,
            h: bricksHeight
        };
    }
    draw() {
        this.ctx.fillStyle = '#cc2b5e';
        this.ctx.fillRect(this.bricksPos.x, this.bricksPos.y, this.bricksSize.w, this.bricksSize.h)
    }
    

}