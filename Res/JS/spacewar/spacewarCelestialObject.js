

class CelestialObject {
    /**
     * Default shape of the object. It contains a Array containing the shape-clusters of the same color.
     * Each cluster is made by a color and a Array with Array(s) of points denoting the vertices of each shape.
     * This allows to have multiple shapes of the same color on the same cluster.
     * 
     * [
     * 
     *      {
     *          name: "opcional argument"
     *          color: "",
     *          shapes: [
     *              [Point, Point...],
     *              ...
     *          ],
     *          fill: bool
     *      },
     *      ...
     * ];
     */
    static DEFAULT_SHAPE = [
        {
            name: "name of the shape of the object",
            color: "",
            shapes: [],
            fill: true
        }
    ];

    constructor(pos, v, mass=1, angle=0) {
        this._pos = pos;

        this._mass = mass;
        this._angle = angle;

        this._v = v;
        this._a = new Point(0, 0);

        this._shapeOBJ = [];
    }

    // GETTERS

    get shape() {
        return this._shapeOBJ;
    }

    /**
     * Position of the object.
     */
    get pos() {
        return this._pos;
    }

    /**
     * Position of the object.
     */
    get position() {
        return this.pos;
    }

    /**
     * Velocity of the object.
     */
     get v() {
        return this._v;
    }

    /**
     * Velocity of the object.
     */
    get velocity() {
        return this.v;
    }

    /**
     * Acceleration of the object.
     */
    get a() {
        return this._a;
    }

    /**
     * Acceleration of the object.
     */
    get acceleration() {
        return this.a;
    }

    /**
     * Mass of the object.
     */
    get mass() {
        return this._mass;
    }

    /**
     * Angle of rotation of the object relative to the center of the object.
     */
    get angle() {
        return this._angle;
    }

    /**
     * Applies the given force to the Object.
     * @param {Point} force - Vector with the force applied to the Object.
     */
    applyForce(force) {
        this.a.advanceWithDirection(force.times(1 / this.mass));
    }

    /**
     * Updates the position and the shape of the object
     */
    update() {
        this.v.advanceWithDirection(this.a);
        this.pos.advanceWithDirection(this.v);

        this.a.moveTo(0, 0); // Empty acceleration

        // Update object shape
        this._shapeOBJ = [];

        let s = this.constructor.DEFAULT_SHAPE;
        let i, j, k, shape, shapes, p;

        for (i = 0; i < s.length; i++) {
            shape = {
                name: s[i].name,
                color: s[i].color,
                shapes: [],
                fill: s[i].fill
            };

            for (j = 0; j < s[i].shapes.length; j++) {
                shapes = [];

                for(k = 0; k < s[i].shapes[j].length; k++) {
                    p = s[i].shapes[j][k].clone();
                    p.rotateBy(this.angle);
                    p.advanceWithDirection(this.pos);
                    shapes.push(p);
                }
                shape.shapes.push(shapes);
            }

            this._shapeOBJ.push(shape);
        }
    }
}