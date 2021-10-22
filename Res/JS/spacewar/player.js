class SpacewarPlayer {
    constructor(pos) {
        this.pos = pos;

        this.v = new Point(0, 0);
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
}