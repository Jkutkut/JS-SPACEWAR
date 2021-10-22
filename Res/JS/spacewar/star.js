class Star {
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
        let s = this.pos.minus(ship.pos);
        return s.times(3);
    }
}