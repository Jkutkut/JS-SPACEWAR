var mainCanvas, canvasContext;
var game;

var offset = 20;

window.addEventListener("load", () => {
    $("#playBtn").click(loadGame);

    mainCanvas = $("mainCanvas");
    canvasContext = document.getElementById("mainCanvas").getContext('2d');

    // Resize window logic
    windowResize();
    $(window).resize(windowResize);
});


function loadGame() {
    let btn = $("#playBtn");

    let cssVar2millis = (id, varName) => {
        let v = $(id).css(varName);
        let reg = new RegExp("^ *([\\.\\d]+)s");
        return parseFloat(reg.exec(v)[1]) * 1000;
    }

    // Update the label of the playButton
    btn.text("LOADING"); // change the label of the btn
    btn.removeClass("playBtn");
    btn.addClass("launchGame");
    
    // Set animation for btn
    setTimeout(
        () => {
            btn.text("LET'S PLAY");
            $(".tableContainer").css("filter", "blur(1.5rem)");
        }, // change the label of the btn after
        cssVar2millis(".launchGame", "--launchOffsetTime") // Time defined by css
    );

    setTimeout(
        startGame,
        cssVar2millis(".launchGame", "--totalAnimationTime") 
    );
}

function startGame(ctx=canvasContext) {
    // Create game
    game = new Spacewar(ctx);

    // canvas refresh logic
    setInterval(update, 1000/120);
    setInterval(show, 1000/30);

    // control logic
    $("body").keydown((e) => {game.keyDown(e)});
    $("body").keyup((e) => {game.keyUp(e)});

    $("body").mousemove((e) => {
        let p = new Point(e.pageX, e.pageY);
        let p2 = distBorderPoint(ctx.canvas.width / 2, ctx.canvas.height / 2, p);

        let d = p.dist(p2);
        d = Math.round(d);
        if (d < 20) {
            ctx.fillStyle = "white"
            ctx.strokeStyle = "white"
            canvas_draw.arc(...p2.pos, 5, 0, 2 * Math.PI);
        }
    });

    // All game ready, show the container:
    $(".setup").css("display", "none");
    $(".game").css("display", "block");
};


function show() {
    game.show();
};

function update() {
    game.update();
}

/**
 * Collection of functions to represent elements on the screen.
 * 
 * It requires a global variable called ctx storing the 2d context of the desired canvas.
 */
const canvas_draw = {
    line: (startPoint, endPoint, ctx=canvasContext) => {
        ctx.beginPath();
        ctx.moveTo(...startPoint.pos);
        ctx.lineTo(...endPoint.pos);
        ctx.closePath();
        ctx.stroke();
    },
    arc: (x, y, radius, startAngle, endAngle, fill=false, ctx=canvasContext) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        if (fill) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    },
    shape: (arr, fill=true, ctx=canvasContext) => {
        ctx.beginPath();
        ctx.moveTo(...arr[0].pos);
        for (let i = 1; i < arr.length; i++) {
            ctx.lineTo(...arr[i].pos);
        }
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    },
    element: (element, fill=false, ctx=canvasContext) => {
        let shape = element.shape;
        let i;

        for (i = 0; i < shape.shapes.length; i++) {
            canvas_draw.shape(shape.shapes[i], fill, ctx);
        }

        for (i = 0; i < shape.lines.length; i++) {
            canvas_draw.line(...shape.lines[i], ctx);
        }
        
        for (i = 0; i < shape.arcs.length; i++) {
            canvas_draw.arc(...shape.arcs[i], fill, ctx);
        }
    },
    array: (arr, ctx=canvasContext) => {
        for (let i = 0; i < arr.length; i++) {
            canvas_draw.element(arr[i]);
    
            for (let j = 0; j < arr[i].IO_SIZE.IN; j++) {
                canvas_draw.element(pointShape(arr[i].getIN_location(j)), true, ctx);
            }
    
            for (let j = 0; j < arr[i].IO_SIZE.OUT; j++) {
                canvas_draw.element(pointShape(arr[i].getOUT_location(j)), true, ctx);
            }
        }
    },
    elementV2: (e, ctx=canvasContext) => {
        for (let i = 0; i < e.length; i++) {
            canvas_draw.subElement(e[i], ctx);
        }
    },
    subElement: (e, ctx=canvasContext) => {
        ctx.fillStyle = e.color;

        for (let i = 0; i < e.shapes.length; i++) {
            canvas_draw.shape(e.shapes[i], e.fill, ctx);
        }
    }
}

/**
 * When screen get resized, this function is called to handle the change.
 */
function windowResize(ctx=canvasContext) {
    ctx.canvas.width = window.innerWidth - offset;
    ctx.canvas.height = window.innerHeight - offset;

    mainCanvas.css("width", window.innerWidth - offset);
    mainCanvas.css("height", window.innerHeight - offset);

    let w, h;
    let halfW = (window.innerWidth - offset) >> 1;
    let halfH = (window.innerHeight - offset) >> 1;

    w = ctx.canvas.width * 0.2;
    h = - halfH / halfW * Math.sqrt(halfW*halfW - (w - halfW)**2) + halfH;

    $(".playerContainer").css("--w", w + "px");
    $(".playerContainer").css("--h", h + "px");

    game = new Spacewar(ctx);
}


/**
 * Get the closest point in a ellipse relative to the given point.
 * 
 * The ellipse is defined as the one contained on the rectangle (0,0), (2a, 2b).
 * 
 * This means:
 * - The center of the ellipse is on the point (a, b).
 * - The ellipse follows the equation: (x - a)^2 / a^2 + (y - b)^2 / b^2 = 1
 * - If we want to generate curves of the ellipse:
 *     - Curve based on x coord: y = +-(b / a * sqrt(a^2 - (x - a)^2)) + b
 *     - Curve based on y coord: x = +-(a / b * sqrt(b^2 - (y - b)^2)) + a
 * - This curves enable us to get the desired coordinate (x or y) using the other one. Therefore, the closest point can be obtained using this method.
 * 
 * @param {Point} p - Point instance with the coordinates of the point to use.
 * @param {number} a - Half the width of the ellipse.
 * @param {number} b - Half the height of the ellipse.
 * @returns New Point with the closest point in the ellipse.
 */
function distBorderPoint(p, a=(ctx.canvas.width >> 1), b=(ctx.canvas.height >> 1)) {
    let cX = Math.abs(p.x - a);
    let cY = Math.abs(p.y - b);

    if (cX < cY) { // Calc the y coordinate (more precise)
        let yCoord = b / a * Math.sqrt(a*a - (p.x - a)**2);

        if (p.y < b) {
            yCoord *= -1;
        }

        yCoord += b;

        return new Point(p.x, yCoord);
    }
    else { // Calc the x coordinate
        let xCoord = a / b * Math.sqrt(b*b - (p.y - b)**2);

        if (p.x < a) {
            xCoord *= -1;
        }

        xCoord += a;

        return new Point(xCoord, p.y);
    }
}