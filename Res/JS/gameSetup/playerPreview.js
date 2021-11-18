nPlayers=2;
ships = [];
bullets = [];
ctxs = [];

// When the page is loaded
window.addEventListener("load", () => {
    // When the user enters a name, verify it
    for (let i = 1; i <= 4; i++) {
        $(`#p${i}Name`).on('input', () => {
            console.log(`hey ${i}`);
            verifyName(i);
        });
    }
  
    for (let i = 0; i < 4; i++) {
        ctxs[i] = document.getElementById(`p${i + 1}Canvas`).getContext('2d');
        updatePlayerScreen(i);

        $(`#p${i+1}ShipColor`).on('input', () => {updateShip(i)});
        $(`#p${i+1}BulletColor`).on('input', () => {updateBullet(i)});
    }
});

/**
 * Updates the screen of the given player
 * @param {number} index - Index of the player (0 based)
 */
function updatePlayerScreen(i) {
    updateShip(i);
    updateBullet(i);
}

function updateShip(i) {
    let p = new Point(100, 75);
    let v = new Point(0, 0);
    
    ships[i] = new SpacewarShip(p, v);

    let c = $(`#p${i+1}ShipColor`).attr("data-current-color");
    c = (c)? c : 'rgb(255, 255, 255)';

    ships[i].bodyColor = c; // set the color of the ship to the one on the menu
    
    // update object to be able to show them on the screen
    ships[i].update();
    
    ctxs[i].fillStyle = Spacewar.COLOR.BG;
    canvas_draw.arc(...p.pos, S * 2, 0, 2 * Math.PI, true, ctxs[i]);

    // Draw ship's full body
    for (j = 0; j < ships[i].shape.length; j++) {
        canvas_draw.subElement(ships[i].shape[j], ctxs[i]);
    }
}

function updateBullet(i) {
    bullets[i] = new FastBullet(ships[i]);

    let c = $(`#p${i+1}BulletColor`).attr("data-current-color");
    c = (c)? c : 'rgb(255, 255, 255)';

    bullets[i].bodyColor = c; // set the color of the ship to the one on the menu

    // update object to be able to show them on the screen
    bullets[i]._pos.advance(100, 0);
    bullets[i].update();

    // Show bullet
    for (j = 0; j < bullets[i].shape.length; j++) {
        canvas_draw.subElement(bullets[i].shape[j], ctxs[i]);
    }
}


function verifyName(index) {
    let nameField = document.getElementById(`p${index}Name`);
    let name = $(nameField).val(); // Get the name

    console.log("name: " + name)
    
    // If the name is not empty, check if it is already taken
    for (let i = 1; i <= 4; i++) {
        if (i != index) {
            if (name == $(`#p${i}Name`).val()) {
                // $(errorId).addClass('invalidInput');
                console.log("Invalid")
                nameField.setCustomValidity(`Invalid name, the ${i}º user has the same name`);
                console.log(nameField.reportValidity());
                return;
            }
        }
    }
    // If the name is not taken, set the error message to empty
    nameField.setCustomValidity('');
}

/**
 * @returns Array of objects with the information of the players playing.
 */
function getPlayersConfiguration() {
    let obj = [];
    for (let i = 1; i <= 4; i++) {
        if ($(`#p${i}Name`).val() == "") {
            continue;
        }

        obj.push({
            index: i,
            name: $(`#p${i}Name`).val(),
            bulletType: $(`#p${i}fastBullet`).is(":checked")? FastBullet : Bullet,
            shipColor: $(`#p${i}ShipColor`).attr("data-current-color"),
            bulletColor: $(`#p${i}BulletColor`).attr("data-current-color")
        });
    }
    return obj;
}