class SpacewarStarSystem extends CelestialObject {

    /**
     * Gravitational constant
     */
    static G = 5;

    /**
     * Radius of a star
     */
    static RADIUS = S / 2;

    /**
     * Angular velocity of the system.
     */
    static W = 0.01;

    /**
     * Radius from the center of mass to any star in the system.
     */
    static SYSTEM_RADIUS = 20;
    
    /**
     * Area were all object should burn if they are that close (relative to the center of mass).
     */
    static KILL_RADIUS = 2.5 * SpacewarStarSystem.SYSTEM_RADIUS;

    /**
     * Area were all objects inside will burn (relative to the center of mass).
     */
    static REAL_KILL_RADIUS = 0.7 * SpacewarStarSystem.KILL_RADIUS;
    
    constructor(pos, mass, n=2) {
        super(pos, new Point(0, 0), mass);

        this.n = n;
    }

    get shape() {
        let s = [
            {
                color: "yellow",
                shape: []
            },
            {
                color: "rgba(150, 150, 0, 0.15)",
                shape: [
                    [...this.pos.pos, SpacewarStarSystem.KILL_RADIUS, 0, Math.PI * 2]
                ]
            }
        ];

        let deltaAngle = Math.PI / this.n * 2;
        for (let i = 0; i < this.n; i++) {
            s[0].shape.push([
                this.pos.x + (SpacewarStarSystem.SYSTEM_RADIUS * Math.cos(deltaAngle * i + this.angle)),
                this.pos.y + (SpacewarStarSystem.SYSTEM_RADIUS * Math.sin(deltaAngle * i + this.angle)),
                SpacewarStarSystem.RADIUS,
                0,
                Math.PI * 2
            ]);
        }
        return s;
    }

    update() {
        super.update();

        this._angle += SpacewarStarSystem.W;
    }

    /**
     * Attracts the ship to the system.
     * @param {SpacewarShip} ship - Ship to attract.
     */
    attract(ship) {
        let force = this.pos.minus(ship.pos);

        let dSq = force.mag();
        dSq *= dSq; // Squared

        let strength = SpacewarStarSystem.G * this.mass * ship.mass / dSq;

        force.setMagnitude(strength);

        ship.applyForce(force);
    }

    /**
     * @param {CelestialObject} e - Object to check
     * @returns Whenever the given object is on the lethal zone of the star.
     */
    burningElement(e) {
        return this.pos.dist(e.pos) < SpacewarStarSystem.REAL_KILL_RADIUS;
    }
}
