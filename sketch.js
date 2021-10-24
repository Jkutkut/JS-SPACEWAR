var mainCanvas, ctx;
var game;

var offset = 20;

window.onload = () => {
    mainCanvas = $("mainCanvas");
    ctx = document.getElementById("mainCanvas").getContext('2d');

    // Resize window logic
    windowResize();
    $(window).resize(windowResize);

    // Create game
    game = new Spacewar(ctx);

    // canvas refresh logic
    setInterval(update, 60/1000);
    setInterval(show, 30/1000);

    // control logic
    $("body").keydown((e) => {game.keyUp(e)});
    $("body").keyup((e) => {game.keyUp(e)});
};


function show() {
    game.show();
};
function update() {
    game.update();
}

const canvas_draw = {
    line: (startPoint, endPoint) => {
        ctx.beginPath();
        ctx.moveTo(...startPoint.pos);
        ctx.lineTo(...endPoint.pos);
        ctx.closePath();
        ctx.stroke();
    },
    arc: (x, y, radius, startAngle, endAngle, fill=false) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        if (fill) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    },
    element: (element, fill=false) => {
        let shape = element.shape;

        for (let i = 0; i < shape.lines.length; i++) {
            canvas_draw.line(...shape.lines[i]);
        }
        
        for (let i = 0; i < shape.arcs.length; i++) {
            canvas_draw.arc(...shape.arcs[i], fill);
        }
    },
    array: (arr) => {
        for (let i = 0; i < arr.length; i++) {
            canvas_draw.element(arr[i]);
    
            for (let j = 0; j < arr[i].IO_SIZE.IN; j++) {
                canvas_draw.element(pointShape(arr[i].getIN_location(j)), true);
            }
    
            for (let j = 0; j < arr[i].IO_SIZE.OUT; j++) {
                canvas_draw.element(pointShape(arr[i].getOUT_location(j)), true);
            }
        }
    }
}


function windowResize() {
    ctx.canvas.width = window.innerWidth - offset;
    ctx.canvas.height = window.innerHeight - offset;

    mainCanvas.css("width", window.innerWidth - offset);
    mainCanvas.css("height", window.innerHeight - offset);

    game = new Spacewar(ctx);
}