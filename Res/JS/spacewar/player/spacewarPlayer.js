$.getJSON(
    "Res/JS/spacewar/player/controls.json",
    (json) => {
        SpacewarPlayer.CONTROLS = json.controls;
    }
);

class SpacewarPlayer {

    static CONTROLS;

    constructor(index, ship) {
        this.ship = ship;

        this.controls = SpacewarPlayer.CONTROLS[index];

        this.state = {
            right: false,
            left: false,
            forward: false,
            shoot: false
        }
    }

    update() {
        let deltaA = 0.02;
        if (this.state.right) {
            this.ship.angle += deltaA;
        }
        if (this.state.left) {
            this.ship.angle -= deltaA;
        }
        if (this.state.forward) {
            this.ship.pushForward();
        }
        if (this.state.shoot) {
            // TODO shoot
            this.shoot = false;
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
                this.ship.endPush();
                break;
            case this.controls.shoot:
                this.state.shoot = false;
                break;
        }
    }
}