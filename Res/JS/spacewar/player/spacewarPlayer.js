$.getJSON(
    "Res/JS/spacewar/player/controls.json",
    (json) => {
        SpacewarPlayer.CONTROLS = json.controls;
    }
);

class SpacewarPlayer {

    static CONTROLS;
    static COOL_DOWN = 100;

    constructor(index, ship) {
        this.ship = ship;

        this.controls = SpacewarPlayer.CONTROLS[index];

        this.bulletCreation = undefined;

        this.state = {
            right: false,
            left: false,
            forward: false,
            shoot: false
        }

        this.coolDown = 0; // Time remaining until I can shoot again
    }

    update() {
        if (this.coolDown > 0) {
            this.coolDown--;
        }

        let deltaA = 0.02;
        if (this.state.right) {
            this.ship.rotateBy(deltaA);
        }
        if (this.state.left) {
            this.ship.rotateBy(-deltaA);
        }
        if (this.state.forward) {
            this.ship.thrusterOn();
        }
        if (this.state.shoot) {
            if (this.coolDown == 0) {
                this.bulletCreation = new Bullet(this.ship);
                this.coolDown = SpacewarPlayer.COOL_DOWN;
            }
        }
    }

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