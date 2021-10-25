class SpacewarStar {

    static G = 5;
    
    constructor(pos, mass) {
        this.pos = pos;

        this.mass = mass;

        this.a = new Point(0, 0);
    }

    get shape() {
        let radius = 5;
        let startAngle = 0;
        let endAngle = Math.PI * 2;

        return {
            shapes: [],
            lines: [],
            arcs: [
                [...this.pos.pos, radius, startAngle, endAngle]
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