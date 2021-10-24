class Spacewar {
    static COLOR = {
        BG: 'rgba(37, 37, 37, 1)',
        SHIP: 'rgb(255, 255, 255)',
        STAR: 'yellow'
    };

    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.lineWidth = 3;

        let mass = 10;
        this.star = new SpacewarStar(
            new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1),
            mass
        );

        this.ships = [
            new SpacewarShip(
                new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 2),
                new Point(0.4, 0)
            )
        ];

        this.players = [
            new SpacewarPlayer(0, this.ships[0])
        ];

        this.update();
    }

    update() {
        let i;
        for (i = 0; i < this.ships.length; i++) {
            this.star.attract(this.ships[i]);
            this.ships[i].update();
        }

        for (i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }
    }

    show() {
        let i;

        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = Spacewar.COLOR.STAR;
        this.ctx.lineWidth = 3;

        // Show star
        canvas_draw.element(this.star, true);

        // Clear ships
        this.ctx.fillStyle = Spacewar.COLOR.BG;

        let radius = S + 2;
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        for (i = 0; i < this.ships.length; i++) {
            canvas_draw.element(
                {
                    shape: {
                        shapes: [],
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
        this.ctx.strokeStyle = Spacewar.COLOR.SHIP;

        for (i = 0; i < this.ships.length; i++) {
            canvas_draw.element(this.ships[i], true);
        }

        this.ctx.restore();
    }

    keyDown(e) {
        let keyCode = e.keyCode;
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].keyDown(keyCode);
        }
    }

    keyUp(e) {
        let keyCode = e.keyCode;
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].keyUp(keyCode);
        }
    }
}