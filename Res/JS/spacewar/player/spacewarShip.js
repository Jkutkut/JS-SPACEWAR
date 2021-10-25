var S = 10;

class SpacewarShip {
    static DEFAULT_SHAPE = {
        shapes: [
            [
                new Point(-S * 0.33, S * 0.5),
                new Point(-S * 0.33, -S * 0.5),
                new Point(S * 0.8, 0)
            ]
        ],
        lines: [],
        arcs: []
    };

    static EXHAUST = [
        {
            shapes: [
                [
                    new Point(-S * 0.33, S * 0.3),
                    new Point(-S * 1, S * 0.1),
                    new Point(-S * 1.2, 0),
                    new Point(-S * 1, -S * 0.1),
                    new Point(-S * 0.33, -S * 0.3)
                ]
            ],
            lines: [],
            arcs: []
        },
        {
            shapes: [
                [
                    new Point(-S * 0.33, S * 0.2),
                    new Point(-S * 0.9, 0),
                    new Point(-S * 0.33, -S * 0.2)
                ]
            ],
            lines: [],
            arcs: []
        }
    ];

    constructor(pos, v) {
        this._pos = pos;

        this.v = v;
        this.a = new Point(0, 0);

        this.angle = 0;

        this._shapeOBJ = null;

        this.exhaustOn = false;
        this._exhaustOBJ = [];
    }

    get pos() {
        return this._pos;
    }

    get shape() {
        return this._shapeOBJ;
    }

    get exhaust() {
        return this._exhaustOBJ;
    }

    get mass() {
        return 1;
    }

    pushForward() {
        this.exhaustOn = true;

        let mF = 0.002;
        let f = new Point(0, mF);
        f.rotate(this.angle);
        this.applyForce(f);
    }

    endPush() {
        this.exhaustOn = false;
        this._exhaustOBJ = [];
    }

    /**
     * Applies the given force to the ship.
     * @param {Point} force - Vector with the force applied to the ship.
     * 
     * @see ships doesn't have mass yet. Therefore, the force is technically an acceleration.
     */
    applyForce(force) {
        this.a.advanceWithDirection(force);
    }

    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);

        this.a.moveTo(0, 0); // Empty acceleration

        this._shapeOBJ = {
            shapes:[],
            lines: [],
            arcs: []
        };
        
        
        // Update shapes
        for (let i = 0, j, l; i < SpacewarShip.DEFAULT_SHAPE.shapes.length; i++) {
            this._shapeOBJ.shapes.push([]);

            l = SpacewarShip.DEFAULT_SHAPE.shapes[i].length;
            for (j = 0; j < l; j++) {
                this._shapeOBJ.shapes[i].push(SpacewarShip.DEFAULT_SHAPE.shapes[i][j].clone()),
                this._shapeOBJ.shapes[i][j].rotateBy(this.angle);
                this._shapeOBJ.shapes[i][j].advanceWithDirection(this.pos);
            }
        }

        // Update lines
        for (let i = 0, j; i < SpacewarShip.DEFAULT_SHAPE.lines.length; i++) {
            this._shapeOBJ.lines.push([]);

            for (j = 0; j < 2; j++) {
                this._shapeOBJ.lines[i][j] = SpacewarShip.DEFAULT_SHAPE.lines[i][j].clone(),
                this._shapeOBJ.lines[i][j].rotateBy(this.angle);
                this._shapeOBJ.lines[i][j].advanceWithDirection(this.pos);
            }
        }

        // Update arcs
        for (let i = 0, k; i < SpacewarShip.DEFAULT_SHAPE.arcs.length; i++) {
            this._shapeOBJ.arcs.push([...SpacewarShip.DEFAULT_SHAPE.arcs[i]]);
            for (k = 0; k < 2; k++) {
                this._shapeOBJ.arcs[i][k] = this._shapeOBJ.arcs[i][k] + this.pos.pos[k];
            }
        }

        if (this.exhaustOn) {
            this._exhaustOBJ = [];

            for (let i = 0; i < SpacewarShip.EXHAUST.length; i++) {
                this._exhaustOBJ.push({shapes: [], lines: [], arcs: []});

                for (let j = 0; j < SpacewarShip.EXHAUST[i].shapes.length; j++) {
                    this._exhaustOBJ[i].shapes.push([]);

                    for (let k = 0; k < SpacewarShip.EXHAUST[i].shapes[j].length; k++) {
                        this._exhaustOBJ[i].shapes[j].push(SpacewarShip.EXHAUST[i].shapes[j][k].clone());
                        this._exhaustOBJ[i].shapes[j][k].rotateBy(this.angle);
                        this._exhaustOBJ[i].shapes[j][k].advanceWithDirection(this.pos);
                    }
                }
            }
        }
    }
}