class SpacewarShip {
    constructor(pos, v) {
        this._pos = pos;

        this.v = v;
        this.a = new Point(0, 0);
    }

    get pos() {
        return this._pos;
    }

    get shape() {
        let radius = 5;
        let startAngle = 0;
        let endAngle = Math.PI * 2;

        return {
            lines: [],
            arcs: [
                [...this.pos.pos, radius, startAngle, endAngle]
            ]
        };
    }


    /**
     * Applies the given force to the ship.
     * @param {Point} force - Vector with the force applied to the ship.
     * 
     * @see ships doesn't have mass yet. Therefore, the force is technically an acceleration.
     */
    applyForce(force) {
        this.a.advanceWithDirection(force);
        // console.log(this.a, force);
    }

    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);

        this.a.moveTo(0, 0); // Empty acceleration
    }
}