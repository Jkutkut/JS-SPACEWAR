

class CelestialObject {
    /**
     * Default shape of the object. It contains a Array containing the shape-clusters of the same color.
     * Each cluster is made by a color and a Array with Array(s) of points denoting the vertices of each shape.
     * This allows to have multiple shapes of the same color on the same cluster.
     * 
     * [
     * 
     *      {
     *          color: "",
     *          shape: [
     *              [Point, Point...],
     *              ...
     *          ]
     *      },
     *      ...
     * ];
     */
    static DEFAULT_SHAPE = [
        {
            color: "",
            shape: []
        }
    ];

    constructor(pos, v, mass=1, angle=0) {
        this._pos = pos;

        this._mass = mass;
        this._angle = angle;

        this._v = v;
        this._a = new Point(0, 0);
    }

    // GETTERS

    /**
     * Position of the object
     */
    get pos() {
        return this._pos;
    }

    /**
     * Mass of the object
     */
    get mass() {
        return this._mass;
    }

    /**
     * Applies the given force to the Object.
     * @param {Point} force - Vector with the force applied to the Object.
     */
    applyForce(force) {
        this.a.advanceWithDirection(force.times(1 / this.mass));
    }

    /**
     * Updates the position and the shape of the player
     */
    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);

        this.a.moveTo(0, 0); // Empty acceleration
    }
}