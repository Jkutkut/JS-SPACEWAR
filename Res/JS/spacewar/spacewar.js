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

        this._elements2clear = [];

        this.update();
    }

    update() {
        let i, j, d, e, p;

        this.star.update();

        for (i = 0; i < this.ships.length; i++) {
            e = this.ships[i];
            
            this.star.attract(e);
            
            e.update();

            d = this.star.pos.dist(e.pos);

            if (d < S) { // if star near
                this.ships.splice(i, 1); // destroy ship
                this.players.splice(i, 1); // destroy player
                i--;
                continue;
            }
        }

        for (i = 0; i < this.players.length; i++) {
            e = this.players[i];
            e.update();

            if (e.bulletCreation) { // If bullet created by player
                this.bullets.push(e.bulletCreation);
                e.bulletCreation = undefined;
            }
        }

        for (i = 0; i < this.bullets.length; i++) {
            e = this.bullets[i];

            this.star.attract(e);

            e.update();

            d = this.star.pos.dist(e.pos);
            p = distBorderPoint(e.pos);

            if (d < S || // if star near or
                p.dist(e.pos) < S) { // on the border of the screen
                
                this.bullets.splice(i--, 1); // destroy bullet
                continue;
            }


            for(j = i + 1; j < this.bullets.length; j++) {
                if (e.pos.dist(this.bullets[j].pos) < S) {
                    this.bullets.splice(j, 1); // destroy bullet
                    this.bullets.splice(i--, 1); // destroy bullet
                    break;
                }
            }
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

        // Show bullets
        for (i = 0; i < this.bullets.length; i++) {
            // Draw ship's body
            canvas_draw.subElement(this.bullets[i].shape[0]);
            this.addElement2Clear(this.bullets[i].pos);
        }

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