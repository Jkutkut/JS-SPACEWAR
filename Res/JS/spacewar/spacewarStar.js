class SpacewarStar extends CelestialObject {

    static G = 5;

    static RADIUS = S / 2;
    
    constructor(pos, mass) {
        super(pos, new Point(0, 0), mass);
    }

    get shape() {
        return [
            {
                color: "yellow",
                shape: [
                    [...this.pos.pos, SpacewarStar.RADIUS, 0, Math.PI * 2]
                ]
            }
        ];
    }

    /**
     * Attracts the ship to the given object
     * @param {SpacewarShip} ship - Ship to attract.
     */
    attract(ship) {
        let force = this.pos.minus(ship.pos);

        let dSq = force.mag();
        dSq *= dSq; // Squared

        let strength = SpacewarStar.G * this.mass * ship.mass / dSq;

        force.setMagnitude(strength);

        ship.applyForce(force);
    }

    update() {
        
    }
}

class SpacewarStarSystem extends SpacewarStar {

    /**
     * Angular velocity of the system.
     */
    static W = 0.01;

    /**
     * Radius from the center of mass to any star in the system.
     */
    static SYSTEM_RADIUS = 20;

    constructor(pos, mass, n=3) {
        super(pos, mass);

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
                    [...this.pos.pos, SpacewarStarSystem.SYSTEM_RADIUS * 2.5, 0, Math.PI * 2]
                ]
            }
        ];

        let deltaAngle = Math.PI / this.n * 2;
        for (let i = 0; i < this.n; i++) {
            s[0].shape.push([
                this.pos.x + (SpacewarStarSystem.SYSTEM_RADIUS * Math.cos(deltaAngle * i + this.angle)),
                this.pos.y + (SpacewarStarSystem.SYSTEM_RADIUS * Math.sin(deltaAngle * i + this.angle)),
                SpacewarStar.RADIUS,
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
}