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
    constructor(pos, mass, n=3, r=18, w=0.01) {
        super(pos, mass);

        this.n = n;

        this.systemRadius = r;

        this.angularV = w;
    }

    get shape() {
        let s = [{
            color: "yellow",
            shape: []
        }];

        let deltaAngle = Math.PI / this.n * 2;
        for (let i = 0; i < this.n; i++) {
            s[0].shape.push([
                this.pos.x + (this.systemRadius * Math.cos(deltaAngle * i + this.angle)),
                this.pos.y + (this.systemRadius * Math.sin(deltaAngle * i + this.angle)),
                SpacewarStar.RADIUS,
                0,
                Math.PI * 2
            ]);
        }
        return s;
    }

    update() {
        super.update();

        this._angle += this.angularV;
    }
}