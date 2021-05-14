const overDom = document.querySelector(".over")
const scoreDom = document.querySelector(".score")
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipePairProducer = new PipePairProducer(-100);
        this.timer = null;
        this.tick = 12
        this.speed = this.tick / 1000;
        this.gameOver = false;
        this.score = 0;
    }

    // 开始游戏
    start() {
        if (this.timer) {
            return
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.bird.startSwing();
        this.pipePairProducer.startProduce()
        this.timer = setInterval(() => {
            this.sky.move(this.speed);
            this.land.move(this.speed);
            this.bird.move(this.speed);
            this.score += this.speed;
            scoreDom.innerHTML = `分数:${parseInt(this.score)}`
            for (let i = 0; i < this.pipePairProducer.pairs.length; i++) {
                let pair = this.pipePairProducer.pairs[i];
                pair.move(this.speed);
            }
            // 判断游戏结束
            if (this.isGameOver()) {
                this.stop()
                this.gameOver = true;
                overDom.style.display = "flex"
                overDom.innerHTML = `<span>游戏结束</span><span>得分:${parseInt(this.score)}</span>`
            }


        }, this.tick);

    }

    // 停止游戏
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.pipePairProducer.stopProduce();
        this.bird.stopSwing()
    }

    // 注事件册
    bindEvent() {
        window.onkeydown = e => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                    overDom.style.display = "flex"
                    overDom.innerHTML = "游戏暂停"
                } else {
                    this.start();
                    overDom.style.display = "none"
                    overDom.innerHTML = "游戏暂停"
                }
            }
            if (e.key === " ") {
                this.bird.jump();
            }
        }
    }

    // 判断游戏结束
    isGameOver() {
        // 落地游戏结束
        if (this.bird.top >= this.bird.maxY) {
            return true
        }
        // 碰撞游戏结束
        for (let i = 0; i < this.pipePairProducer.pairs.length; i++) {
            let pair = this.pipePairProducer.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true
            }
        }

        return false
    }

    // 碰撞检测
    isHit(rec1, rec2) {
        // 规则:两个矩形中心水平距离小于两矩形宽度和的一半 并且 两矩形中心垂直距离小于两矩形高度和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const diffX = Math.abs(centerX1 - centerX2)
        const diffY = Math.abs(centerY1 - centerY2)
        if (diffX < (rec1.width + rec2.width) / 2 && diffY < (rec1.height + rec2.height) / 2) {
            return true;
        }
        return false
    }

   


}

var game = new Game();
game.start()
game.bindEvent();