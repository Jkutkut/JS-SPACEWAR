class SpacewarStar {
    constructor(pos) {
        this.pos = pos;
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

    getAttractionVector(ship) {
        let G = 0.01;
        let vec = this.pos.minus(ship.pos);
        return vec.times(G / vec.mag());
    }
}