nPlayers=2;
ships = [];
bullets = [];
ctxs = [];

// When the page is loaded
$(document).ready(function() {
    // When the user enters a name, verify it
    // for (let i = 1; i <= 4; i++) {
    //     $(`#p${i}Name`).on('input', () => {
    //         console.log(`hey ${i}`);
    //         verifyName(i);
    //     });
    // }
  
    let p = new Point(100, 75);
    let v = new Point(0, 0);
    for (let i = 0, j; i < 4; i++) {
        ctxs[i] = document.getElementById(`p${i+1}Canvas`).getContext('2d');

        ships[i] = new SpacewarShip(p.clone(), v.clone());
        ships[i].update();
        bullets[i] = new FastBullet(ships[i]);

        bullets[i]._pos.advance(100, 0);
        bullets[i].update();
    }

    for (i = 0; i < ships.length; i++) {
        // Draw ship's full body
        for (j = 0; j < ships[i].shape.length; j++) {
            canvas_draw.subElement(ships[i].shape[j], ctxs[i]);
        }
    }

    // Show bullets
    for (i = 0; i < bullets.length; i++) {
        for (j = 0; j < bullets[i].shape.length; j++) {
            canvas_draw.subElement(bullets[i].shape[j], ctxs[i]);
        }      
    }
});


// function verifyName(index) {
//     let nameId = `#p${index}Name`;
//     let errorId = `#p${index}NameError`;

//     // Get the name
//     let name = $(nameId).val();
    
//     // If the name is not empty, check if it is already taken
//     for (let i = 1; i <= 4; i++) {
//         if (i != index) {
//             if (name == $(`#p${i}Name`).val()) {
//                 $(errorId).addClass('invalidInput');
//                 return;
//             }
//         }
//     }
//     // If the name is not taken, set the error message to empty
//     $(errorId).addClass('validInput');
// };