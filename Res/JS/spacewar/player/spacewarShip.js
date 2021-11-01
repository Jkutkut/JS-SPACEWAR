class SpacewarShip extends CelestialObject{

    static DEFAULT_SHAPE = [
        {
            name: "body",
            color: 'rgb(255, 255, 255)',
            shapes: [
                [
                    new Point(-S * 0.33, S * 0.5),
                    new Point(-S * 0.33, -S * 0.5),
                    new Point(S * 0.8, 0)
                ]
            ],
            fill: true
        },
        {
            name: "exhaust_red",
            color: "rgb(255, 100, 100)",
            shapes: [
                [
                    new Point(-S * 0.33, S * 0.3),
                    new Point(-S * 1, S * 0.1),
                    new Point(-S * 1.2, 0),
                    new Point(-S * 1, -S * 0.1),
                    new Point(-S * 0.33, -S * 0.3)
                ]
            ],
            fill: true
        },
        {
            name: "exhaust_center",
            color: "rgba(255, 255, 255, 0.5)",
            shapes: [
                [
                    new Point(-S * 0.33, S * 0.2),
                    new Point(-S * 0.9, 0),
                    new Point(-S * 0.33, -S * 0.2)
                ]
            ],
            fill: true
        }
    ];

    static THRUSTER_FORCE = 0.02;

    constructor(pos, v) {
        super(pos, v);

        this._exhaustOn = false;
    }

    // GETTERS

    get exhaustOn() {
        return this._exhaustOn;
    }

    // SETTERS

    rotateBy(angle) {
        this._angle += angle;
    } 

    thrusterOn() {
        this._exhaustOn = true;
    }

    thrusterOff() {
        this._exhaustOn = false;
    }

    update() {
        super.update();

        if (this.exhaustOn) {
            let f = new Point(0, SpacewarShip.THRUSTER_FORCE);
            f.rotate(this.angle);
            this.applyForce(f);
        }
    }
}