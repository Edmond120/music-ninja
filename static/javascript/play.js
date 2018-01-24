class linkedListNode{
    constructor(data){
        this.data = data;
        this.next = null;
    }
};

class linkedList{
    constructor(){
        this.start = new linkedListNode(null);
        this.length = 0;
		this.current = this.start;
		this.currentBack = null;
    }
    get(index){//this function is not really needed but is included just in case
        var i;
        var node = this.start;
        for(i = -1; i < index; i++){
            node = node.next;
        }
		return node.data;
    }
    add(data){
        var n = this.start.next;
        this.start.next = new linkedListNode(data);
        this.start.next.next = n;
        this.length++;
    }
	//built in iterator
    startIterator(){//sets current to start, used at the beginning of every frame
        this.current = this.start;
        this.currentBack = null;
    }
    hasNext(){
        return !(this.current.next == null);
    }
    next(){
        this.currentBack = this.current;
        this.current = this.current.next;
        return this.current.data;
    }
    remove(){//removes current
        this.currentBack.next = this.current.next;
		this.current = this.currentBack;
        this.length--;
    }
	toString(){//DO NOT USE THIS WHEN USING THE ITERATOR, IT WILL MESS IT UP
		var str = "";
		this.startIterator();
		while(this.hasNext()){
			str += this.next() + " ";
		}
		this.startIterator();
		return str;
	}
};
//requires linkedList.js

class entity{
	constructor(){
		this.owner = null;
		this.elements = []; //an array of html elements to be added to the DOM
	}
	update(){} //returns true if dead, false otherwise
	display(){}
	addToDOM(){
		var i;
		for(i = 0; i < this.elements.length; i++){
			this.owner.addElement(this.elements[i]);
		}
	} //adds the html elements to the DOM
	removeFromDOM(){
		var i;
		for(i = 0; i < this.elements.length; i++){
			this.owner.removeElement(this.elements[i]);
		}
	}
};
var boxHeight = 1200;
var boxWidth = 1920;
var rescaleMultiplier = function(){
	var width = document.body.clientWidth || window.innerWidth || window.innerWidth; 
	return document.body.clientWidth / boxWidth;
}
var rMultiplier = rescaleMultiplier();
var mappedFrame = 0;
var mouseX = 0;
var mouseY = 0;
var pMouseX = 0;
var pMouseY = 0;
var velocity = 0;

class placeHolder extends entity{
	update(){
		rMultiplier = rescaleMultiplier();
		if(this.owner.frameNumber - mappedFrame >= 30){
			velocity = 0;
		}
		else{
			velocity = Math.sqrt(Math.pow(mouseX - pMouseX,2) + Math.pow(mouseY - pMouseY,2));
		}
		return false;
	}
};
class entityManager{//only one entityManager is supported with mouse
	constructor(div){
		this.entities = new linkedList();
		this.running = false;
		this.div = div;
	    this.entities.startIterator();
	    var p = new placeHolder();
	    p.owner = this;
	    this.entities.add(p);
		this.frameNumber = 0;
	}
	setDiv(d){
		this.div = d;
	}
	start(){
		this.running = true;
		this.interval  = setInterval(this.frame.bind(this),16);
		
	}
	frame(){
		if(this.running){
			while(this.entities.hasNext()){
				var x = this.entities.next();
				if(x.update()){
					x.removeFromDOM();
					this.entities.remove();
				}
				else{
					x.display();
				}
			}
			this.entities.startIterator();
			this.frameNumber++;
		}
		else{
			clearInterval(this.interval);
		}
	}
	stop(){
		this.running = false;
	}
	spawn(x){ //requires an entity
		x.owner = this;
		x.addToDOM();
		this.entities.add(x);
	}
	addElement(x){ //requires an html element
		this.div.appendChild(x);
	}
	removeElement(x){
		this.div.removeChild(x);
	}
};
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
		this.owner.spawn(new fruit(thing,100*boxWidth/1075,100*boxWidth/1075));
		counter--;
	    }
	}
    }

}
var container = document.createElement('div');
document.body.appendChild(container);
var fruits = new entityManager(container);

var updateMouse = function(event){
	pMouseX = mouseX;
	pMouseY = mouseY;
	mouseX = event.clientX / rMultiplier;
	mouseY = event.clientY / rMultiplier;
	mappedFrame = fruits.frameNumber;
}

document.addEventListener("mousemove", updateMouse);
fruits.spawn(new fruit("kiwi.png",100*boxWidth/1075,100*boxWidth/1075));
fruits.start();
