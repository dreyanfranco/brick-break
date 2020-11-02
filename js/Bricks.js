class Bricks {
    constructor(ctx, canvasSize, bricksPosX, bricksPosY, bricksWidth, bricksHeight) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        };
        this.bricksPos = {
            x: bricksPosX,
            y: bricksPosY
        };
        this.bricksSize = {
            w: bricksWidth,
            h: bricksHeight
        };
        this.init();
    }
    init() {
    }
    draw() {
    }

}