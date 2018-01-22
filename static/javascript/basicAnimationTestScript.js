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

class placeHolder extends entity{
	update(){
		return false;
	}
}

class entityManager{
	constructor(div){
		this.entities = new linkedList();
		this.running = false;
		this.div = div
			this.entities.startIterator();
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
//requires core.js
var a = true;
class pic extends entity{
	constructor(image,xcor,ycor,height,width){
		super();
		var canvas = document.createElement('canvas');
		canvas.width = 100;
	    canvas.height = 100;
	    canvas.style.border   = "1px solid";
		this.elements.push(canvas);
		var ctx = canvas.getContext("2d");
	    var e = this.elements[0];
	    var img = new Image();
	    img.src = '../images/' + image;
	    ctx.drawImage(img,0,0,100,100);
		this.xcor = xcor;
		this.ycor = ycor;
		e.style.left = xcor + 'px';
		e.style.top = ycor + 'px';
		e.style.height = height + 'px';
		e.style.width = width + 'px';
		e.style.position = 'absolute';
		if(a){
			this.lifespan = 60000;
			a = false;
		}
		else{
			this.lifespan = 600;
		}
	}
	update(){
		this.xcor++;
		this.ycor++;
		console.log(this.xcor);
		console.log(this.ycor);
		return this.lifespan-- <= 0;
	}
	display(){
		this.elements[0].style.left = this.xcor + 'px';
		this.elements[0].style.top = this.ycor + 'px';
	}
}

var container = document.createElement('div');
document.body.appendChild(container);
var em = new entityManager(container);
em.spawn(new placeHolder());
em.spawn(new pic("kiwi.png",0,0,100,100));
em.start();

