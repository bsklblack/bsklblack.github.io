class Rectangle{
    constructor(width, height, left, top, speedX, speedY, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.render();
    }

    render(){
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    move(duration){
        const shiftX = parseFloat(this.speedX * duration);
        const shiftY = parseFloat(this.speedY * duration);
        const newLeft = this.left + shiftX;
        const newTop = this.top + shiftY;
        this.left = newLeft;
        this.top = newTop;
        if(this.onMove){
            this.onMove();
        }
        this.render();
    }

}