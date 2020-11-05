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
        switch (dir) {
            case "left":
                if (this.barPos.x - this.barSpeed < 0) {
                    this.barPos.x = 0;
                } else {
                    this.barPos.x -= this.barSpeed;
                }
                break;
            case "right":
                if (this.barPos.x + this.barSpeed + this.barSize.w > this.canvasSize.w) {
                    this.barPos.x = this.canvasSize.w - this.barSize.w;
                } else {
                    this.barPos.x += this.barSpeed;
                }
                break;
        }
    }

    changeLarge(newLarge) {
        this.barSize.w = newLarge;
        if (this.barPos.x + newLarge > this.canvasSize.w) {
            this.barPos.x = this.canvasSize.w - this.barSize.w
        }
    }
}