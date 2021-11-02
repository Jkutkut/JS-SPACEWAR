$.getJSON(
    "Res/JS/spacewar/player/controls.json",
    (json) => {
        SpacewarPlayer.CONTROLS = json.controls;
    }
);

/**
 * Logic to handle the controls of a user and control their ship. 
 */
class SpacewarPlayer {

    /**
     * Array with controls (loaded from json file.).
     */
    static CONTROLS;

    /**
     * Cool down between shots.
     */
    static COOL_DOWN = 100;

    /**
     * Amount to rotate (in radians) each time the rotation keys are pressed.
     */
    static DELTA_ROTATION = 0.02;

    /**
     * @param {number} index - Index of the desired controls (from the CONTROLS static var)
     * @param {SpacewarShip} ship - Ship to control.
     */
    constructor(index, ship) {
        this.ship = ship;

        // Get controls
        this.controls = SpacewarPlayer.CONTROLS[index];

        /**
         * If undefined, the player does not want to create a bullet. Else, the content is the bullet to add to the game.
         */
        this.bulletCreation = undefined;

        /**
         * The state of the keys pressed.
         */
        this.state = {
            right: false,
            left: false,
            forward: false,
            shoot: false
        }

        /**
         * Time remaining until I can shoot again
         */
        this.coolDown = 0;
    }

    update() {
        if (this.coolDown > 0) { // If cooling down
            this.coolDown--;
        }

        if (this.state.right) { // Right key pressed
            this.ship.rotateBy(SpacewarShip.DELTA_ROTATION);
        }
        if (this.state.left) { // Left key pressed
            this.ship.rotateBy(-SpacewarShip.DELTA_ROTATION);
        }
        if (this.state.forward) { // Forward key pressed
            this.ship.thrusterOn();
        }
        if (this.state.shoot) { // Shoot key pressed
            if (this.coolDown == 0) { // If not cooling down
                this.bulletCreation = new FastBullet(this.ship);
                // this.bulletCreation = new Bullet(this.ship);
                this.coolDown = SpacewarPlayer.COOL_DOWN;
            }
        }
    }

    /**
     * Handle a key pressed down
     * @param {number} keyCode - Code associated with the key
     */
    keyDown(keyCode) {
        switch(keyCode) {
            case this.controls.right:
                this.state.right = true;
                break;
            case this.controls.left:
                this.state.left = true;
                break;
            case this.controls.forward:
                this.state.forward = true;
                break;
            case this.controls.shoot:
                this.state.shoot = true;
                break;
        }
    }

    /**
     * Handle a key pressed up.
     * @param {number} keyCode - Code associated with the key
     */
    keyUp(keyCode) {
        switch(keyCode) {
            case this.controls.right:
                this.state.right = false;
                break;
            case this.controls.left:
                this.state.left = false;
                break;
            case this.controls.forward:
                this.state.forward = false;
                this.ship.thrusterOff();
                break;
            case this.controls.shoot:
                this.state.shoot = false;
                break;
        }
    }
}