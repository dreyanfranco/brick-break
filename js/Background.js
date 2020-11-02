class Background {
    constructor(ctx, canvasSize, backgroundPosX, backgroundPosY, backgroundWidth, backgroundHeight, backgroundImage) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        };
        this.backgroundSize = {
            w: backgroundWidth,
            h: backgroundHeight
        }
        this.backgroundPos = {
            x: backgroundPosX,
            y: backgroundPosY
        }
        this.backgroundImageName = backgroundImage;
        this.backgroundImageInstance = undefined;
        this.init();
    }
    init() {
        this.backgroundImageInstance = new Image();
        this.backgroundImageInstance.src = `img/${this.backgroundImageName}`;
    }
    draw() {
        this.ctx.drawImage(this.backgroundImageInstance, this.backgroundPos.x, this.backgroundPos.y, this.backgroundSize.w, this.backgroundSize.h );
    }
}