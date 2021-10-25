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
        let starV = 3.7;
        let dist = 10;
        this.stars = [
            new SpacewarStar(
                new Point((ctx.canvas.width >> 1) - dist, ctx.canvas.height >> 1),
                mass,
                new Point(0, 0)
            )
        ];

        this.ships = [];
        this.players = [];
        this.bullets = [];

        this.addPlayer();
        this.addPlayer();
        this.addPlayer();

        this.update();
    }

    update() {
        let i, j, d, ship, star;
        for (j = 0; j < this.stars.length; j++) {
            star = this.stars[j];
            for (i = 0; i < this.stars.length; i++) {
                if (i == j) continue;

                star.attract(this.stars[i]);
            }

            star.update();

            for (i = 0; i < this.ships.length; i++) {
                ship = this.ships[i];
                star.attract(ship);
                ship.update();

                d = star.pos.dist(ship.pos);

                if (d < (S >> 1)) { // if star near
                    this.ships.splice(i, 1); // destroy ship
                    this.players.splice(i, 1); // destroy player
                }

                if (this.players[i].bulletCreation) { // If bullet created by player
                    this.bullets.push(this.players[i].bulletCreation);
                    this.players[i].bulletCreation = undefined;
                }
            }
        }

        for (i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }

        for (i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        }
    }

    show() {
        let i;

        let radius = S * 2;
        let startAngle = 0;
        let endAngle = Math.PI * 2;

        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.lineWidth = 3;

        // Clear star
        this.ctx.fillStyle = Spacewar.COLOR.BG;
        for (i = 0; i < this.stars.length; i++) {
            canvas_draw.element({
                    shape: {shapes: [], lines: [],
                        arcs: [
                            [...this.stars[i].pos.pos, radius, startAngle, endAngle]
                        ]
                    }
                },
                true
            );
        }
        // Show star
        this.ctx.fillStyle = Spacewar.COLOR.STAR;
        for (i = 0; i < this.stars.length; i++) {
            canvas_draw.element(this.stars[i], true);
        }


        // Clear ships and bullets
        this.ctx.fillStyle = Spacewar.COLOR.BG;

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

    // Player creation/deletion
    addPlayer() {
        let index = this.ships.length;

        this.ships.push(
            new SpacewarShip(
                new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 2),
                new Point(0.4, 0)
            )
        );

        
        this.players.push(
            new SpacewarPlayer(index, this.ships[index])
        );
    }
}