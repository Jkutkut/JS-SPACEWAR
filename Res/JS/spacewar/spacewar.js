var S = 10;

class Spacewar {
    static COLOR = {
        BG: 'rgba(37, 37, 37, 1)'
    };

    static CLEAR_RADIUS = 2 * S;

    constructor(ctx, configuration) {
        this.ctx = ctx;

        let mass = 50;
        this.star = new SpacewarStarSystem(
            new Point((ctx.canvas.width >> 1), ctx.canvas.height >> 1),
            mass
        );

        this.players = [];
        this.bullets = [];
        
        this._elements2clear = []; // Array of elements to clear

        this._configuration = configuration;
        for (let i = 0; i < configuration.length; i++) {
            this.addPlayer(configuration[i]);
        }

        this.scoreSystem = new ScoreSystem(configuration);

        this.update();
    }

    update() {
        let i, j, e, p;

        this.star.update();

        // Update players and ships
        for (i = 0; i < this.players.length; i++) {
            if (!this.players[i].isAlive) { // if ship is alive
                this.players[i].respawn(); // Attempt to respawn
                continue;
            }

            e = this.players[i].ship; // get ship
            this.star.attract(e);
            e.update();
            p = distBorderPoint(e.pos); // Distance ship to border
            if (this.star.burningElement(e) || // if star near
                p.dist(e.pos) < 2) { // or ship near border
                this.players[i].kill();
                this.scoreSystem.addKill(i, i);
                continue;
            }

            // Check if bullet hit player
            for (j = 0; j < this.bullets.length; j++) {
                if (e.pos.dist(this.bullets[j].pos) < S) { // If bullet close
                    if (this.bullets[j].ship == e && this.bullets[j].lifeTime < FastBullet.LIFE_TIME * 0.3) {
                        // If bullet was fired recently, don't kill player
                        continue;
                    }
                    
                    this.players[i].kill();
                    
                    // Find the bullet owner
                    for (let k = (this.bullets[j].ship == e) ? i : 0; k < this.players.length; k++) {
                        if (this.players[k].ship == this.bullets[j].ship) {
                            this.scoreSystem.addKill(k, i);
                            this.scoreSystem.addBulletHit(k);
                            break;
                        }
                    }
                    this.bullets[j].kill();
                    this.bullets.splice(j--, 1); // destroy bullet
                    break;
                }
            }

            // Get player if alive
            if (!this.players[i].isAlive) {
                break;
            }
            e = this.players[i];
            e.update();
            if (e.bulletCreation) { // If bullet created by player
                this.bullets.push(e.bulletCreation);
                e.bulletCreation = undefined;
                this.scoreSystem.addShot(i);
            }

        }

        // Update bullets
        for (i = 0; i < this.bullets.length; i++) {
            e = this.bullets[i]; // get bullet

            this.star.attract(e);

            e.update();

            if (!e.isAlive()) { // If bullet is not alive (life time is over)
                e.kill();
                this.bullets.splice(i--, 1); // destroy bullet
                continue;
            }

            p = distBorderPoint(e.pos); // Distance bullet to border

            if (this.star.burningElement(e) || // if star near or
                p.dist(e.pos) < S) { // bullet on the border of the screen
                
                e.kill();
                this.bullets.splice(i--, 1); // destroy bullet
                continue;
            }

            // Check if bullet bullet collision
            for(j = i + 1; j < this.bullets.length; j++) {
                if (e.pos.dist(this.bullets[j].pos) < S) {
                    this.scoreSystem.addBulletHit(i);
                    this.scoreSystem.addBulletHit(j);
                    e.kill();
                    this.bullets[j].kill();
                    this.bullets.splice(j, 1); // destroy bullet
                    this.bullets.splice(i--, 1); // destroy bullet
                    break;
                }
            }
        }
    }

    show() {
        let i, j, e;

        this.ctx.save(); // save previous styles & set our current styles
    
        // Clear star, ships and bullets
        this.ctx.fillStyle = Spacewar.COLOR.BG;;

        for (i = 0; i < this._elements2clear.length; i++) {
            canvas_draw.element(...this._elements2clear[i]);
        }
        this._elements2clear.length = 0;

        // Show star, ships and bullets

        let starShape = this.star.shape;
        for (i = 0; i < starShape.length; i++) {
            this.ctx.fillStyle = starShape[i].color;

            for (j = 0; j < starShape[i].shape.length; j++) {
                canvas_draw.arc(...starShape[i].shape[j], true);
                e = new Point(starShape[i].shape[j][0], starShape[i].shape[j][1]);
                this.addElement2Clear(e, starShape[i].shape[j][2]);
            }
        }

        for (i = 0; i < this.players.length; i++) {
            if (!this.players[i].isAlive) {
                continue;
            }
            e = this.players[i].ship;

            // Draw ship's body
            canvas_draw.subElement(e.shape[0]);
            this.addElement2Clear(e.pos);
            
            if (!e.exhaustOn) {
                continue;
            }

            for (j = 1; j < e.shape.length; j++) {
                canvas_draw.subElement(e.shape[j]);
            }
        }

        for (i = 0; i < this.bullets.length; i++) {
            for (j = 0; j < this.bullets[i].shape.length; j++) {
                canvas_draw.subElement(this.bullets[i].shape[j]);
            }
            this.addElement2Clear(this.bullets[i].pos);            
        }

        this.ctx.restore();
    }

    addElement2Clear(p, radius=Spacewar.CLEAR_RADIUS) {
        this._elements2clear.push([
            {
                shape: {
                    shapes: [], lines: [],
                    arcs: [
                        [...p.pos, radius, 0, 2 * Math.PI]
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
    addPlayer(conf) {
        let index = this.players.length;

        let angleOri;
        switch(index) {
            case 0:
                angleOri = 1;
                break;
            case 1:
                angleOri = 0;
                break;
            case 2:
                angleOri = -0.5;
                break;
            default:
                angleOri = 0.5;
                break;
        }

        let orientation = new Point(0, this.ctx.canvas.height >> 2);
        orientation.rotateBy(Math.PI * angleOri);

        let v = new Point(-1, 0);
        v.rotateBy(Math.PI * angleOri);

        let ship = new SpacewarShip(
            new Point(
                (this.ctx.canvas.width >> 1) + orientation.x,
                (this.ctx.canvas.height >> 1) + orientation.y
            ),
            v
        );

        ship.bodyColor = conf.shipColor;
        
        this.players.push(
            new SpacewarPlayer(
                conf.index - 1,
                ship,
                conf.bulletType,
                conf.bulletColor
            )
        );
    }
}