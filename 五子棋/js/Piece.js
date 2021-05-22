export default class Piece{
    constructor(left, top, color, ctx){
        this.left = left;
        this.top = top;
        this.color = color;
        this.ctx = ctx;
        this.r = 17
    }

    rander(){
        this.ctx.beginPath();
        this.ctx.arc(this.left, this.top,this.r,0,2*Math.PI,1)
        this.ctx.strokeStyle="#fff";
        this.ctx.fillStyle = this.color;
        this.ctx.fill()
        this.ctx.stroke()
        console.log(this.color);
    }

}