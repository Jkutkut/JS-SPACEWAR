var S = 10;

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

    static thrusterForce = 0.002;

    constructor(pos, v) {
        super(pos, v);

        this._exhaustOn = false;
    }

    // GETTERS

    get exhaustOn() {
        return this._exhaustOn;
    }

    // SETTERS

    thrusterOn() {
        this._exhaustOn = true;

        let f = new Point(0, this.thrusterForce);
        f.rotate(this.angle);
        this.applyForce(f);
    }

    thrusterOff() {
        this._exhaustOn = false;
    }
}