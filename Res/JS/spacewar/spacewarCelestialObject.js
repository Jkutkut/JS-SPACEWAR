

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
            color: "",
            shapes: []
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

    /**
     * Position of the object
     */
    get pos() {
        return this._pos;
    }

    /**
     * Position of the object
     */
    get position() {
        return this._pos;
    }

    /**
     * Velocity of the object
     */
    get velocity() {
        return this._v;
    }

    /**
     * Velocity of the object
     */
    get v() {
        return this._v;
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

        // Update object shape
        this._shapeOBJ = [];
        for (let i = 0, j, k, shape, shapes, p; i < this.DEFAULT_SHAPE.length; i++) {
            shape = {
                color: this.DEFAULT_SHAPE[i].color,
                shapes: []
            };

            for (j = 0; j < this.DEFAULT_SHAPE[i].shapes.length; j++) {
                shapes = [];

                for(k = 0; k < this.DEFAULT_SHAPE[i].shapes[j].length; k++) {
                    p = this.DEFAULT_SHAPE[i].shapes[j][k].clone();
                    
                }
                this._shapeOBJ[i].shapes.push(shapes);
            }

            this._shapeOBJ.push(shape);
        }
    }
}