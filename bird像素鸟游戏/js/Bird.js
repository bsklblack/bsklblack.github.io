const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
	constructor() {
		super(birdWidth, birdHeight, 150, 150, 0, 0, birdDom);
		this.g = 1000;
		this.maxY = gameHeight - landHeight - birdHeight;
		this.swingStatus = 1;
		this.timer = null;
		this.render();
	}
	move(duration) {
		super.move(duration);
		this.speedY += this.g * duration;
	}
	onMove() {
		if (this.top >= this.maxY) {
			this.top = this.maxY
		}
		if (this.top <= 0) {
			this.top = 0
		}
	}
	jump() {
		this.speedY = -250;
	}
	startSwing() {
		if(!this.timer){
			this.timer = setInterval(() => {
				this.swingStatus = (this.swingStatus + 1) % 3 + 1
			}, 100);
		}
	}
	stopSwing(){
		if(this.timer){
			clearInterval(this.timer)
		}
	}
	render(){
		super.render();
		this.dom.className = `bird swing${this.swingStatus}`
	}

}
