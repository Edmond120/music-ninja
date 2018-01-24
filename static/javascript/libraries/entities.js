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

//with dynamic rescaling, redefining boxWidth and boxHeight isn't needed
//boxWidth=window.innerWidth;
//boxHeight=boxWidth*.625;

class itemWithPhysics extends entity{
  constructor(){
		super();
  	this.grav = (boxHeight/675) * 80;
  	this.xcor = (boxWidth/1075) * (Math.random()*(boxWidth*2/3) + 1/3*boxWidth);
		this.ycor = boxHeight*1375/675;
  	if ((boxWidth-this.xcor) < (boxWidth*.20)) {
      this.velx = (boxWidth/1075) * (Math.random()*-1.5);
    }
    else if (this.xcor < (boxWidth*.20)) {
      this.velx = (boxWidth/1075) * (Math.random()*1.5);
    }
    else {
      this.velx = (boxWidth/1075) * (Math.random()*3 - 1.5);
    }
  	this.vely = (boxHeight/675) * -1 * (Math.random()*2.5 + 47.5);
	  this.time = 0;
//    console.log("boxWidth ("+boxWidth+")");
//    console.log("boxHeight ("+boxHeight+")");
//    console.log("xcor ("+this.xcor+")");
//    console.log("vely ("+this.vely+")");
//    console.log("velx ("+this.velx+")");
//    console.log("xcor ("+this.xcor+")");
  }
  update(){//x, y is the pixel location
    this.xcor += this.velx * this.time;
    this.ycor += this.vely * this.time + 0.5 * this. grav * this.time * this.time;
		this.time += 0.01;
    console.log("fruit ("+this.xcor+", "+this.ycor+")");
		return false;
  }
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
	  var img = new Image();
	  img.src = '../images/' + image;
	  ctx.drawImage(img, 0,0,resolutionX, resolutionY);
		var e = this.elements[0];
		//debug

		e.style.left = this.xcor + 'px';
		e.style.top = this.ycor + 'px';
		this.height = height;
		this.width = width;
		e.style.height = (height * rMultiplier) + 'px';
		e.style.width = (width * rMultiplier) + 'px';
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
		this.elements[0].style.height = (this.height * rMultiplier) + 'px';
		this.elements[0].style.width = (this.height * rMultiplier) + 'px';
		this.elements[0].style.left = (this.xcor * rMultiplier) + 'px';
		this.elements[0].style.top = (this.ycor * rMultiplier) + 'px';
	}
}
var f = 0;
var stuff = ["kiwi.png","dragonfruit.png","grapple.png","pineapple.png","mango.png","pomegrante.png","watermelon.png"]
class fruitSpawner extends entity {
    constructor(arrayOfFruitNames){
	super();
	this.stuff = arrayOfFruitNames;
    }
    update(){
	console.log(f++);
	if (Math.floor(Math.random() * 1001 > 995)){
	    var counter = Math.floor(Math.random() * 6);
	    var thing = this.stuff[Math.floor(Math.random() * stuff.length)];
	    while(counter > 0){
		this.owner.spawn(new fruit(thing,100,100));
		counter--;
	    }
	}
    }

}
