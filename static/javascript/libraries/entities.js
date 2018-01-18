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
  constructor(boxWidth,boxHeight){
  		this.grav = 4;
  		this.xcor = Math.floor(Math.random() * (boxWidth-100))+50;
  		this.ycor = boxHeight;
  		this.velx = Math.floor(Math.random() * 5);
  		this.vely = -40;
		this.time = 0;
  }
  update(){//x, y is the pixel location
        this.xcor = this.velx * this.time;
        this.ycor = this.vely * this.time + 0.5 * this. grav * this.time * this.time;
  }
}
