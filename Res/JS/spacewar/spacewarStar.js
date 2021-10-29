class SpacewarStar extends CelestialObject {

    static G = 5;

    static RADIUS = S / 2;
    
    constructor(pos, mass) {
        super(pos, new Point(0, 0), mass);
    }

    get shape() {
        return {
            shapes: [],
            lines: [],
            arcs: [
                [...this.pos.pos, SpacewarStar.RADIUS, 0, Math.PI * 2]
            ]
        };
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