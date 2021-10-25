

class CelestialObject {
    static DEFAULT_SHAPE = [
        {
            color: "",
            shape: [

            ]
        }
    ];

    constructor(pos, v, mass=1) {
        this.pos = pos;

        this.mass = mass;

        this.v = v;
        this.a = new Point(0, 0);
    }

    /**
     * Applies the given force to the Object.
     * @param {Point} force - Vector with the force applied to the Object.
     */
    applyForce(force) {
        this.a.advanceWithDirection(force.times(1 / this.mass));
    }

    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);

        this.a.moveTo(0, 0); // Empty acceleration
    }

}

class OrientableCelestialObject extends CelestialObject {
    constructor(pos, angle, v, mass=1) {
        super(pos, v, mass);

        this.angle = angle;
    }
}