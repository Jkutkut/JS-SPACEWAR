class FastBullet extends CelestialObject {
    static DEFAULT_SHAPE = [
        {
            name: "body",
            color: "rgb(255, 255, 255)",
            shapes: [
                [
                    new Point(-S * 0.3, -S * 0.3),                    
                    new Point(-S * 0.3, S * 0.3),
                    new Point(S * 0.5, 0)
                ]
            ],
            fill: true
        },
        {
            name: "exhaust",
            color: "rgb(255, 100, 100)",
            shapes: [
                [
                    new Point(-S * 0.3, -S * 0.2),
                    new Point(-S * 1.4, 0),
                    new Point(-S * 0.3, S * 0.2)
                ]
            ],
            fill: true
        },
        {
            name: "exhaust",
            color: "rgba(40, 100, 255, 0.5)",
            shapes: [
                [
                    new Point(-S * 0.3, -S * 0.15),
                    new Point(-S, 0),
                    new Point(-S * 0.3, S * 0.15)
                ]
            ],
            fill: true
        }
    ];

    static LIFE_TIME = 1800;
    static V = 1.2;
    static MASS = 10;

    constructor(parentShip, v=new Point(FastBullet.V, 0), mass=FastBullet.MASS) {
        super(parentShip.pos.clone(), v, mass, parentShip.angle);

        this.ship = parentShip;
        
        // Initial pos is the tip of the ship.
        let tip = new Point(S, 0);
        tip.rotateBy(this.angle);

        this.pos.advanceWithDirection(tip);

        // Fix velocity vector
        this._v.rotateBy(this.angle);

        this.life_time = 0;
    }


    update() {
        super.update();
        this.life_time++; // Update life time
        this._angle = this.v.angle; // Make the bullet aim the same way it's moving to.
    }

    /**
     * @returns Whether the bullet is still alive (not destroyed).
     */
    isAlive() {
        return this.life_time < FastBullet.LIFE_TIME;
    }

    /**
     * This is the function that is called when the bullet is destroyed.
     */
    kill() {
        this.ship.bulletDestroyed();
    }
}

class Bullet extends FastBullet {
    static V = FastBullet.V * 0.7;

    constructor(parentShip) {
        super(parentShip, new Point(Bullet.V, 0));
    }

    applyForce() {}
}