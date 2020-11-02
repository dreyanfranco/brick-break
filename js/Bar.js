class Bar {
    constructor(ctx, canvasSize, barPosX, barPosY, barWidth, barHeight, barSpeed, barImage) {
        this.ctx = ctx;
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        };
        this.barPos = {
            x: barPosX,
            y: barPosY
        };
        this.barSize = {
            w: barWidth,
            h: barHeight
        }
        this.barSpeed = barSpeed;
        this.barImageName = barImage;
        this.barImageInstance = undefined;
        this.init();
    }
    init() {
        this.barImageInstance = new Image();
        this.barImageInstance.src = `img/${this.barImageName}`;
    }
    draw() {
        this.ctx.drawImage(this.barImageInstance, this.barPos.x, this.barPos.y, this.barSize.w, this.barSize.h);
    }
    move(dir) {
        if (dir === 'left' && this.barPos.x >= 15) {
            this.barPos.x -= 20;
        }
        if (dir === 'right' && this.barPos.x < 828) {
            this.barPos.x += 20;
        }
    }
}