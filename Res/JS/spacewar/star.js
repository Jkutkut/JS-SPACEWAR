class Star {
    constructor(ctx) {
        this.ctx = ctx;

        this.pos = new Point(ctx.canvas.width >> 1, ctx.canvas.height >> 1);
    }

    show() {
        this.ctx.save(); // save previous styles & set our current styles
    
        this.ctx.fillStyle = 'white';
        this.ctx.lineWidth = 3;

        this.ctx.beginPath();
        
        let radius = 5;
        let startAngle = 0;
        let endAngle = Math.PI * 2;
        let fill = true; 
        
        this.ctx.arc(...this.pos.pos, radius, startAngle, endAngle);

        if (fill) {
            this.ctx.fill();
        }
        else {
            this.ctx.stroke();
        }

        this.ctx.restore();
    }
}