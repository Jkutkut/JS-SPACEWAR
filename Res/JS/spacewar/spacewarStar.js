class SpacewarStar {

    static G = 5;
    
    constructor(pos, mass=1) {
        this.pos = pos;

        this.mass = mass;
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
     * Attracts the ship to the given object
     * @param {SpacewarShip} ship - Ship to attract.
     */
    attract(ship) {
        let force = this.pos.minus(ship.pos);

        let dSq = force.mag();
        dSq *= dSq; // Squared

        let strength = SpacewarStar.G * this.mass / dSq;

        console.log(SpacewarStar.G, this.mass, dSq, strength, force);
        
        force.setMagnitude(strength);

        console.log(SpacewarStar.G, this.mass, dSq, strength, force);

        ship.applyForce(force);
    }
}