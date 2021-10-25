class Bullet {
    static DEFAULT_SHAPE = {
        shapes: [
            [
                new Point(-S * 0.3, -S * 0.3),
                
                new Point(-S * 0.3, -S * 0.1),
                
                new Point(-S * 1, 0),

                new Point(-S * 0.3, S * 0.1),
                
                new Point(-S * 0.3, S * 0.3),
                new Point(S * 0.5, 0)
            ]
        ],
        lines: [],
        arcs: []
    };

    constructor(parentShip, pos, v, angle) {
        this.pos = pos;
        this.angle = angle;
        this.v = new Point(v, 0);
        this.v.rotateBy(angle);

        this.update();
    }

    get shape() {
        return this._shapeOBJ;
    }

    update() {
        this.pos.advanceWithDirection(this.v);

        // Update shapeOBJ
        this._shapeOBJ = {shapes: [], lines: [], arcs: []};

        for (let i = 0, j; i < Bullet.DEFAULT_SHAPE.shapes.length; i++) {
            this._shapeOBJ.shapes.push([]);

            for (j = 0; j < Bullet.DEFAULT_SHAPE.shapes[i].length; j++) {
                this._shapeOBJ.shapes[i].push(Bullet.DEFAULT_SHAPE.shapes[i][j].clone());
                this._shapeOBJ.shapes[i][j].rotateBy(this.angle);
                this._shapeOBJ.shapes[i][j].advanceWithDirection(this.pos);
            }
        }
    }
}