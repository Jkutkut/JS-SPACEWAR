class Bullet {
    static DEFAULT_SHAPE = {
        shapes: [
            [
                new Point(-S * 0.3, -S * 0.3),
                
                new Point(-S * 0.3, -S * 0.1),
                
                new Point(-S * 1, 0),

                new Point(-S * 0.3, S * 0.1),
                
                new Point(-S * 0.3, S * 0.3),
                new Point(S * 0.5, 0)
            ]
        ],
        lines: [],
        arcs: []
    };

    static V = 0.5;

    constructor(parentShip) {
        this.ship = parentShip;

        this.angle = this.ship.angle;

        this.pos = this.ship.pos.clone();

        let tip = new Point(S, 0);
        tip.rotateBy(this.angle);

        this.pos.advanceWithDirection(tip);

        this.v = new Point(Bullet.V, 0);
        this.v.rotateBy(this.angle);

        this.a = new Point(0, 0);

        this.update();
    }

    get shape() {
        return this._shapeOBJ;
    }

    applyForce(force) {}

    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);
        this.a.moveTo(0, 0);

        // Update shapeOBJ
        this._shapeOBJ = {shapes: [], lines: [], arcs: []};

        for (let i = 0, j; i < Bullet.DEFAULT_SHAPE.shapes.length; i++) {
            this._shapeOBJ.shapes.push([]);

            for (j = 0; j < Bullet.DEFAULT_SHAPE.shapes[i].length; j++) {
                this._shapeOBJ.shapes[i].push(Bullet.DEFAULT_SHAPE.shapes[i][j].clone());
                this._shapeOBJ.shapes[i][j].rotateBy(this.angle);
                this._shapeOBJ.shapes[i][j].advanceWithDirection(this.pos);
            }
        }
    }
}

class FastBullet extends Bullet {
    
    applyForce(force) {
        this.a.advanceWithDirection(force);
    }
}