const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle{
    constructor(height, top, speedX, dom){
        super(52, height, gameWidth, top, speedX, 0, dom)
    }
    onMove(){
        if(this.left < -this.width){
            this.dom.remove();
        }
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min )
}

class PipePair{
    constructor(speed){

        const spaceHeight = 150;
        const minHeight = 80;
        const maxHeight = landTop - spaceHeight - minHeight;
        const upPipeHeight = getRandom(minHeight ,maxHeight);
        const downPipeHeight = landTop - upPipeHeight - spaceHeight;
        const downPipeTop = landTop - downPipeHeight;
        const upPipeDom = document.createElement("div");
        upPipeDom.className = "pipe up";

        const downPipeDom = document.createElement("div");
        downPipeDom.className = "pipe down";

        this.upPipe = new Pipe(upPipeHeight, 0, speed, upPipeDom);
        this.downPipe = new Pipe(downPipeHeight, downPipeTop, speed, downPipeDom );

        gameDom.appendChild(upPipeDom);
        gameDom.appendChild(downPipeDom);
    }
    // 判断该柱子对是否已经移除视野
    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    

}

// 用于生产柱子对
class PipePairProducer{
    constructor(speed){
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 1500
    }
    startProduce(){
        if(this.timer){
            return
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePair(this.speed))
            for(let i = 0; i < this.pairs.length; i ++){
                if(this.pairs[i].useLess){
                    this.pairs.splice(i, 1);
                }
            }
        }, this.tick);
    }
    stopProduce(){
        clearInterval(this.timer)
        this.timer = null;
    }
}

