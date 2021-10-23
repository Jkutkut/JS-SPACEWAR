class SpacewarShip {

    static DEFAULT_SHAPE = {
        lines: [],
        arcs: [
            [0, 0, 5, 0, Math.PI * 2]
        ]
    };

    constructor(pos, v) {
        this._pos = pos;

        this.v = v;
        this.a = new Point(0, 0);
    }

    get pos() {
        return this._pos;
    }

    get shape() {
        return this._shapeOBJ;
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
            lines: [],
            arcs: []
        };
        // Update lines
        for (let i = 0; i < SpacewarShip.DEFAULT_SHAPE.lines.length; i++) {
            this._shapeOBJ.lines.push([]);
            for (let j = 0; j < 2; j++) {
                this._shapeOBJ.lines[i].push(SpacewarShip.DEFAULT_SHAPE.lines[i][j].plus(this.pos));
            }
        }
        // Update arcs
        for (let i = 0; i < SpacewarShip.DEFAULT_SHAPE.arcs.length; i++) {
            this._shapeOBJ.arcs.push([...SpacewarShip.DEFAULT_SHAPE.arcs[i]]);
            for (let k = 0; k < 2; k++) {
                this._shapeOBJ.arcs[i][k] = this._shapeOBJ.arcs[i][k] + this.pos.pos[k];
            }
        }
    }
}