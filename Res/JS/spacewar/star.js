class Star {
    constructor(ctx) {
        this.ctx = ctx;

        this.pos = new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1);
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