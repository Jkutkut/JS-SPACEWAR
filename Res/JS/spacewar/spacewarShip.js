class SpacewarShip {
    constructor(pos) {
        this.pos = pos;

        this.v = new Point(0.6, 0);
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

    move(star) {
        let a = star.getAttractionVector(this);
        this.v = this.v.plus(a);

        this.pos = this.pos.plus(this.v);
        // console.log(this.pos, a);
    }
}