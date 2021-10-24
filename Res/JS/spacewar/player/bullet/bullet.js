class Bullet {
    static DEFAULT_SHAPE = {
        shapes: [

        ],
        lines: [],
        arcs: []
    };

    constructor(pos, angle, v) {
        this.pos = pos;
        this.angle = angle;
        this.v = v;
    }
}