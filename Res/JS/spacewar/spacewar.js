class Spacewar {
    constructor(ctx) {
        this.ctx = ctx;

        this.star = new Star(new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1));
        this.players = [
            new SpacewarPlayer(new Point(100, 100))
        ];
        this.show();
    }


    show() {
        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = 'yellow';
        this.ctx.lineWidth = 3;

        // Show star
        canvas_draw.element(this.star, true);

        this.ctx.fillStyle = 'white';

        for (let i = 0; i < this.players.length; i++) {
            canvas_draw.element(this.players[i], true);
        }

        this.ctx.restore();
    }
}