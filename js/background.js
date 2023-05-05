let canvas = document.getElementById('painting');
canvas.height = canvas.parentElement.clientHeight;
canvas.width = canvas.parentElement.clientWidth;




class Life {
	constructor() 
	{
		this.ctx = canvas.getContext('2d');
		this.w = canvas.width;
		this.h = canvas.height;
		this.wc = 0;
		this.hc = this.h /2;
		this.elw = 4;
		this.elh = 4;
		this.elwc = this.elw /2;
		this.elhc = this.elh /2;
		this.directionLine = [];
		this.directionEl = [];
		this.countDirection = 45;
		this.positionElement = [];
		this.colorElement = [];
		this.colorEl = 'rgb(255 255 255)';
		this.countElement = 10;
		this.step = 5;
		this.stepCompleted = [];
		this.honeycombs = true;
		this.speed = 2;
	}
	getRandom(min, max) 
	{
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	draw()
	{
		this.ctx.shadowColor = '#000';
		this.ctx.shadowBlur = 2;
		
		
		for (let i = 0; i < this.positionElement.length; i++) {
			this.ctx.fillStyle = '#FB6D3A';
			this.ctx.fillRect(this.positionElement[i].x-this.elwc, this.positionElement[i].y-this.elhc, this.elw, this.elh);
		}
		
		this.ctx.shadowColor = '#000';
		this.ctx.shadowBlur = 0;
		this.ctx.fillStyle = 'rgb(255 255 255 / 5%)';
		this.ctx.fillRect(0, 0, this.w, this.h);
	}
	move()
	{
		for (let i = 0; i < this.countElement; i++) {
			if (this.step == this.stepCompleted[i]) {
				if (this.honeycombs) {
					this.directionEl[i] = Math.random() > .5 ? (this.directionEl[i] +1)  : (this.directionEl[i] - 1);
					if (this.directionEl[i] == -1) {
						this.directionEl[i] = this.countDirection-1;
					}else if (this.directionEl[i] == this.countDirection){
						this.directionEl[i] = 0;
					}
				}else {
					this.directionEl[i] = this.getRandom(1, this.countDirection)-1;
				}
				this.stepCompleted[i] = 0;
			}
			this.positionElement[i].x += this.directionLine[this.directionEl[i]].x*this.speed;
			this.positionElement[i].y += this.directionLine[this.directionEl[i]].y*this.speed;
			this.stepCompleted[i] = this.stepCompleted[i] + 1;
			if (this.positionElement[i].x < 0 || this.positionElement[i].y < 0 || this.positionElement[i].x > this.w || this.positionElement[i].y > this.h) {
				this.positionElement[i].x = this.wc; 
				this.positionElement[i].y = this.hc;
				this.directionEl[i] = 0;
				this.stepCompleted[i] = 0;
				this.colorEl = 'rgb('+this.getRandom(50, 255)+' '+this.getRandom(50, 255)+' '+this.getRandom(50, 255)+')';
			}
		}
	}
	drawStart(a)
	{
		this.move();
		this.draw();
		requestAnimationFrame(this.drawStart.bind(this));
	}
	createDirection()
	{
		for(let i = 0; i < 360; i += 360 / this.countDirection){
			let x = Math.cos(i * Math.PI /180);
			let y = Math.sin(i * Math.PI /180);
			this.directionLine.push({x: x, y: y});
		}
	}
	startEl()
	{
		for(let i = 0; i < this.countElement; i ++){
			this.colorElement.push(this.colorEl);
			this.positionElement.push({x: this.wc, y: this.hc});
			this.stepCompleted.push(0);
			if (this.honeycombs == true) 
				this.directionEl.push(0);
			else 
				this.directionEl.push(this.getRandom(1, this.countDirection)-1);
		} 
	}
	start()
	{
		this.createDirection();
		this.startEl();
		// console.log(this.directionLine);
		// console.log(2 * Math.PI)
		this.drawStart();
	}
}

const life = new Life();
life.start();



const mainContent = document.querySelector('.main-content');
const photo = document.querySelector('.photo');

photo.onclick = function() {
	if (this.style.borderColor == '') {
		this.style = 'border-color: #fff;';
		mainContent.style = 'background-color: #ffffff00;';
	}else {
		this.style = '';
		mainContent.style = '';
	}
}
