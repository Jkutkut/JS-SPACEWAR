class Spacewar {
    constructor(ctx) {
        this.ctx = ctx;

        this.star = new Star(ctx);

        this.show();
    }


    show() {
        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 3;

        // Show star
        canvas_draw.element(this.star, true);

        this.ctx.restore();
    }
}