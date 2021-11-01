class FastBullet extends CelestialObject {
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

    static V = 1.2;
    static MASS = 10;

    constructor(parentShip, v=new Point(FastBullet.V, 0), mass=FastBullet.MASS) {
        super(parentShip.pos.clone(), v, mass, parentShip.angle);

        this.ship = parentShip;
        
        let tip = new Point(S, 0);
        tip.rotateBy(this.angle);

        this.pos.advanceWithDirection(tip);

        this.update();
    }
}

class Bullet extends FastBullet {
    static V = FastBullet.V * 0.7;

    constructor(parentShip) {
        super(parentShip, new Point(Bullet.V, 0));
    }

    applyForce() {}
}