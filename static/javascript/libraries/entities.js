//requires entityManager.js

/*class item extends entity{
    var gravity = -2;
    var xcord = 0;
    var ycord = 0;
    var velx = 0;
    var vely

    var split = function(image) {
	var width = image.width;
	var height = image.height;
	var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
	
	canvas.width = width;
	canvas.height = height;
	
	ctx.drawImage(image, 0, 0, width, height,  0, 0, width, height);
	var canvas2 = document.createElement('canvas2'),
            ctx2 = canvas2.getContext('2d');
	
	canvas2.width = width;
	canvas2.height = height;
	
	ctx2.drawImage(image, width/2 + 1, 0, width, height,  0, 0, width, height);
	
	return [canvas,canvas2];
    var changevel = function(x,y){
	velx = x;
	vely = 
    }
}
*/

class itemWithPhysics extends entity{
  constructor(){
		super();
  		this.grav = 4;
  		this.xcor = Math.floor(Math.random() * (boxWidth-100))+50;
  		this.ycor = boxHeight;
  		this.velx = Math.floor(Math.random() * 5);
  		this.vely = -40;
		this.time = 0;
  }
  update(){//x, y is the pixel location
        this.xcor += this.velx * this.time;
        this.ycor += this.vely * this.time + 0.5 * this. grav * this.time * this.time;
		this.time += 0.01
		return false;
  }
}

var getImage = function(imageName){
	var image = new Image();
	image.src = '../images/' + image; //correct image path
	return image;
}

var resolutionX = 100;
var resolutionY = 100;

var lives = 3;
var score = 0;

class fruit extends itemWithPhysics{
	constructor(image,width,height){
		super();
		var canvas = document.createElement('canvas');
		canvas.width = resolutionX;
		canvas.height = resolutionY;
		this.elements.push(canvas);
	    var ctx = canvas.getContext("2d")
	    ctx.drawImage(image, 0,0,resolutionX, resolutionY);
		var e = this.elements[0];

		//debug
		canvas.style.border = "1px solid";
		//debug		

		e.style.left = this.xcor + 'px';
		e.style.top = this.ycor + 'px';
		this.height = height;
		this.width = width;
		e.style.height = height + 'px';
		e.style.width = width + 'px';
		e.style.position = 'absolute';
	}
	update(){
		var dead = super.update();
		if(dead){
			//spawn particle effects here
			
			//
		}
		return dead;
	}
	display(){
		super.display();
		//multiply by rMultiplier scales to screen size
		this.elements[0].style.left = (rMultiplier * this.xcor) + 'px';
		this.elements[0].style.top = (rMultiplier * this.ycor) + 'px';
	}
}
