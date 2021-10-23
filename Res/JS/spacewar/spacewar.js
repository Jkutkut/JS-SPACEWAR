class Spacewar {

    static COLOR = {
        BG: 'rgba(37, 37, 37, 1)',
        SHIP: 'rgb(255, 255, 255)',
        STAR: 'yellow'
    };

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


    show() {
        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = Spacewar.COLOR.STAR;
        this.ctx.lineWidth = 3;

        // Show star
        canvas_draw.element(this.star, true);

        // Clear ships
        this.ctx.fillStyle = Spacewar.COLOR.BG;

        let radius = 6;
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        for (let i = 0; i < this.ships.length; i++) {
            canvas_draw.element(
                {
                    shape: {
                        lines: [],
                        arcs: [
                            [...this.ships[i].pos.pos, radius, startAngle, endAngle]
                        ]
                    }
                },
                true
            );
        }

        // Show ships in their new position
        this.ctx.fillStyle = Spacewar.COLOR.SHIP;

        for (let i = 0; i < this.ships.length; i++) {
            this.star.attract(this.ships[i]);
            this.ships[i].update();
            canvas_draw.element(this.ships[i], true);
        }

        this.ctx.restore();
    }
}