var mainCanvas, ctx;

var offset = 20;

window.onload = () => {
    mainCanvas = $("mainCanvas");
    ctx = document.getElementById("mainCanvas").getContext('2d');
    ctx.fillStyle = "black";

    windowResize();
    $(window).resize(windowResize)
};


function show() {
    ctx.clearRect(0, 0, gateEditorCanvas.width, gateEditorCanvas.height);
};


function windowResize() {
    ctx.canvas.width = window.innerWidth - offset;
    ctx.canvas.height = window.innerHeight - offset;

    mainCanvas.css("width", window.innerWidth - offset);
    mainCanvas.css("height", window.innerHeight - offset);
}