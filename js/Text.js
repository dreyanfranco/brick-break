class Text {
    constructor(ctx, textWord, textPosX, textPosY,) {
        this.ctx = ctx;
        this.textWord = textWord;
        this.textPos = {
            x: textPosX,
            y: textPosY
        }
    }
    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText(this.textWord, this.textPos.x, this.textPos.y)
    }
}

class LivesText  {
    constructor(ctx, livesWord, livesPosX, livesPosY,) {
        this.ctx = ctx;
        this.livesWord = livesWord;
        this.livesPos = {
            x: livesPosX,
            y: livesPosY
        }
    }
}

class ScoreText {
    constructor(ctx, livesWord, livesPosX, livesPosY,) {
        this.ctx = ctx;
        this.livesWord = livesWord;
        this.livesPos = {
            x: livesPosX,
            y: livesPosY
        }
    }
}