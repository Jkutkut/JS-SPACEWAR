class Spacewar {
    static COLOR = {
        BG: 'rgba(37, 37, 37, 1)',
        SHIP: 'rgb(255, 255, 255)',
        EXHAUST: [
            'rgb(255, 100, 100)',
            'rgba(255, 255, 255, 0.5)'
        ],
        STAR: 'yellow',
        BULLET: 'rgb(255, 255, 255)'
    };

    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.lineWidth = 3;

        let mass = 10;
        this.star = new SpacewarStar(
            new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1),
            0
            // mass
        );

        this.ships = [];
        this.players = [];
        this.bullets = [
            new Bullet(
                new Point(200, 200),
                1,
                0
            )
        ];

        this.addPlayer();
        this.addPlayer();
        this.addPlayer();

        this.update();
    }

    update() {
        let i, d, ship;
        for (i = 0; i < this.ships.length; i++) {
            ship = this.ships[i];
            this.star.attract(ship);
            ship.update();

            d = this.star.pos.dist(ship.pos);

            if (d < (S >> 1)) { // if star near
                this.ships.splice(i, 1); // destroy ship
                this.players.splice(i, 1); // destroy player
            }
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


        // Clear ships and bullets
        this.ctx.fillStyle = Spacewar.COLOR.BG;

        let radius = S * 2;
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        for (i = 0; i < this.ships.length; i++) {
            canvas_draw.element({
                    shape: {
                        shapes: [], lines: [],
                        arcs: [
                            [...this.ships[i].pos.pos, radius, startAngle, endAngle]
                        ]
                    }
                },
                true
            );
        }

        this.ctx.fillStyle = Spacewar.COLOR.BG;

        for (i = 0; i < this.bullets.length; i++) {
            canvas_draw.element({
                    shape: {shapes: [], lines: [],
                        arcs: [
                            [...this.bullets[i].pos.pos, radius, startAngle, endAngle]
                        ]
                    }
                },
                true
            );
        }

        // Show bullets
        this.ctx.fillStyle = Spacewar.COLOR.BULLET;
        for (i = 0; i < this.bullets.length; i++) {
            canvas_draw.element(this.bullets[i], true);
        }

        // Show ships in their new position
        this.ctx.fillStyle = Spacewar.COLOR.SHIP;

        for (i = 0; i < this.ships.length; i++) {
            // Show ship
            canvas_draw.element(this.ships[i], true);
            
            // Show exhaust if on
            if (this.ships[i].exhaustOn) {                
                this.ctx.save();
                for (let j = 0; j < this.ships[i].exhaust.length; j++) {
                    this.ctx.fillStyle = Spacewar.COLOR.EXHAUST[j];
                    
                    for (let k = 0; k < this.ships[i].exhaust[j].shapes.length; k++) {
                        canvas_draw.shape(this.ships[i].exhaust[j].shapes[k]);
                    }
                }
                this.ctx.restore();
            }
        }

        this.ctx.restore();
    }

    keyDown(e) {
        let keyCode = e.keyCode;
        let bullet;
        for(let i = 0; i < this.players.length; i++) {
            bullet = this.players[i].keyDown(keyCode);
            // TODO add bullet
        }
    }

    keyUp(e) {
        let keyCode = e.keyCode;
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].keyUp(keyCode);
        }
    }

    // Player creation/deletion
    addPlayer() {
        let index = this.ships.length;

        this.ships.push(
            new SpacewarShip(
                new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 2),
                new Point(0, 0)
                // new Point(0.4, 0)
            )
        );

        
        this.players.push(
            new SpacewarPlayer(index, this.ships[index])
        );
    }
}