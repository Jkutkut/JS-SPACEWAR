/**
 * Class to create ships.
 */
class SpacewarShip extends CelestialObject {

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

    /**
     * The power of the thruster as a force.
     */
    static THRUSTER_FORCE = 0.005;

    /**
     * Maximum amount of bullets that can be fired at the same time.
     */
    static MAX_BULLETS = 3;

    constructor(pos, v) {
        super(pos, v);

        this._bullets_on_screen = 0;

        this._exhaustOn = false;

        this._init_settings = {pos: pos.clone(), v: v.clone()};
    }

    // GETTERS

    /**
     * @returns Whenever the thruster is on.
     */
    get exhaustOn() {
        return this._exhaustOn;
    }

    get canFire() {
        return this._bullets_on_screen < SpacewarShip.MAX_BULLETS;
    }

    // SETTERS
    /**
     * Rotates the given amount relative to the current angle of the ship.
     * @param {number} angle - Angle of rotation
     */
    rotateBy(angle) {
        this._angle += angle;
    } 

    /**
     * Turns on the Thruster.
     */
    thrusterOn() {
        this._exhaustOn = true;
    }

    /**
     * Turns off the Thruster.
     */
    thrusterOff() {
        this._exhaustOn = false;
    }

    /**
     * This method is executed when a bullet has been fired.
     */
    bulletFired() {
        this._bullets_on_screen++;
    }

    /**
     * This method is executed when a bullet has been destroyed.
     */
    bulletDestroyed() {
        this._bullets_on_screen--;
    }

    update() {
        super.update();

        if (this.exhaustOn) { // If thruster on, impulse the ship
            let f = new Point(0, SpacewarShip.THRUSTER_FORCE);
            f.rotate(this.angle);
            this.applyForce(f); // Apply the force in the direction oposite of the exhaust.
        }
    }

    /**
     * Move ship to the location (and velocity) given at the creation of the instance.
     */
    go_to_init() {
        this._pos = this._init_settings.pos.clone();
        this._v = this._init_settings.v.clone();
    }
}