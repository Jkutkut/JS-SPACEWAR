var S = 10;

class Spacewar {
    static COLOR = {
        BG: 'rgba(37, 37, 37, 1)',
        STAR: 'yellow',
        BULLET: 'rgb(255, 255, 255)'
    };

    static CLEAR_RADIUS = 2 * S;

    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.lineWidth = 3;

        let mass = 50;
        this.star = new SpacewarStar(
            new Point((ctx.canvas.width >> 1), ctx.canvas.height >> 1),
            mass
        );

        this.ships = [];
        this.players = [];
        this.bullets = [];

        this.addPlayer();
        // this.addPlayer();
        // this.addPlayer();

        this._elements2clear = [];

        this.update();
    }

    update() {
        let i, d, ship;

        this.star.update();

        for (i = 0; i < this.ships.length; i++) {
            ship = this.ships[i];
            
            this.star.attract(ship);
            
            ship.update();

            d = this.star.pos.dist(ship.pos);

            if (d < (S >> 1)) { // if star near
                this.ships.splice(i, 1); // destroy ship
                this.players.splice(i, 1); // destroy player
                i--;
                continue;
            }

            // if (this.players[i].bulletCreation) { // If bullet created by player
            //     this.bullets.push(this.players[i].bulletCreation);
            //     this.players[i].bulletCreation = undefined;
            // }
        }

        for (i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }

        for (i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        }
    }

    show() {
        let i, j;

        this.ctx.save(); // save previous styles & set our current styles
    
        // Clear star, ships and bullets
        this.ctx.fillStyle = Spacewar.COLOR.BG;;

        for (i = 0; i < this._elements2clear.length; i++) {
            canvas_draw.element(...this._elements2clear[i]);
        }
        this._elements2clear.length = 0;

        // Show star, ships

        this.ctx.fillStyle = Spacewar.COLOR.STAR;
        canvas_draw.element(this.star, true);
        this.addElement2Clear(this.star.pos);

        for (i = 0; i < this.ships.length; i++) {
            // Draw ship's body
            canvas_draw.subElement(this.ships[i].shape[0]);
            this.addElement2Clear(this.ships[i].pos);
            
            if (!this.ships[i].exhaustOn) {
                continue;
            }

            for (j = 1; j < this.ships[i].shape.length; j++) {
                canvas_draw.subElement(this.ships[i].shape[j]);
            }
        }

        // // Show bullets
        // this.ctx.fillStyle = Spacewar.COLOR.BULLET;
        // for (i = 0; i < this.bullets.length; i++) {
        //     canvas_draw.element(this.bullets[i], true);
        // }

        this.ctx.restore();
    }

    addElement2Clear(p) {
        this._elements2clear.push([
            {
                shape: {
                    shapes: [], lines: [],
                    arcs: [
                        [...p.pos, Spacewar.CLEAR_RADIUS, 0, 2 * Math.PI]
                    ]
                }
            },
            true
        ]);
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
                new Point(1, 0)
            )
        );

        
        this.players.push(
            new SpacewarPlayer(index, this.ships[index])
        );
    }
}