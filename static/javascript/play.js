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

class placeHolder extends entity{
	update(){
		rMultiplier = rescaleMultiplier();
		return false;
	}
};
class entityManager{
	constructor(div){
		this.entities = new linkedList();
		this.running = false;
		this.div = div;
	    this.entities.startIterator();
	    var p = new placeHolder();
	    p.owner = this;
	    this.entities.add(p);
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

class itemWithPhysics extends entity{
  constructor(){
		super();
  		this.grav = 4;
  		this.xcor = Math.floor(Math.random() * (boxWidth-100))+50;
  		this.ycor = boxHeight + 50;
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
	    var img = new Image();
	    img.src = '../images/' + image;
	    ctx.drawImage(img, 0,0,resolutionX, resolutionY);
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
var container = document.createElement('div');
document.body.appendChild(container);
var fruits = new entityManager(container);
fruits.spawn(new fruit("kiwi.png",100,100));
