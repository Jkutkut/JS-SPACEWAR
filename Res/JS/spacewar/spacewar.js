class Spacewar {
    constructor(ctx) {
        this.ctx = ctx;

        let mass = 10;
        this.star = new SpacewarStar(
            new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1),
            mass
        );

        this.ships = [
            new SpacewarShip(
                new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 2),
                new Point(0.3, 0)
            ),
            new SpacewarShip(
                new Point((ctx.canvas.width >> 1) - (ctx.canvas.height >> 2), ctx.canvas.height >> 1),
                new Point(0, -0.3)
            ),
            new SpacewarShip(
                new Point(ctx.canvas.width >> 1, 3 * (ctx.canvas.height >> 2)),
                new Point(-0.3, 0)
            ),
            new SpacewarShip(
                new Point((ctx.canvas.width >> 1) + (ctx.canvas.height >> 2), ctx.canvas.height >> 1),
                new Point(0, 0.3)
            )
        ];
        this.show();
    }


    show(color=true) {
        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = 'yellow';
        this.ctx.lineWidth = 3;

        // Show star
        canvas_draw.element(this.star, true);

        this.ctx.fillStyle = 'white';

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].move(this.star);
            canvas_draw.element(this.players[i], true);
        }

        this.ctx.restore();
    }
}