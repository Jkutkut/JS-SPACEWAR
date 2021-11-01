class Bullet extends CelestialObject {
    static DEFAULT_SHAPE = [
        {
            name: "body",
            color: "rgb(255, 255, 255)",
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
            fill: true
        }
    ];

    static V = 0.8;

    constructor(parentShip, mass=0) {
        super(parentShip.pos.clone(), null, mass);

        this.ship = parentShip;
        this._angle = this.ship.angle;
        
        let tip = new Point(S, 0);
        tip.rotateBy(this.angle);

        this.pos.advanceWithDirection(tip);

        this._v = new Point(Bullet.V, 0);
        this._v.rotateBy(this.angle);

        this.update();
    }
}

class FastBullet extends Bullet {
    static V = 2 * Bullet.V;
    static MASS = 1;

    constructor(parentShip) {
        super(parentShip, FastBullet.MASS);

        this._v = new Point(FastBullet.V, 0);
        this._v.rotateBy(this.angle);
    }
}