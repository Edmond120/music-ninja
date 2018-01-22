class linkedListNode{
    constructor(data){
        this.data = data;
        this.next = null;
    }
};

class linkedList{
    constructor(){
        this.start = new linkedListNode(null);
        this.end = this.start;
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
        this.end.next = new linkedListNode(data);
        this.end = this.end.next;
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
					x.remove();
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

class rect extends entity{
	constructor(xcor,ycor,height,width,color){
		super();
		this.elements.push(document.createElement('div'));
		var e = this.elements[0];
		this.xcor = xcor;
		this.ycor = ycor;
		e.style.left = xcor + 'px';
		e.style.top = ycor + 'px';
		e.style.height = height + 'px';
		e.style.width = width + 'px';
		e.style.background = color;
		e.style.position = 'absolute';
		this.lifespan = 600;
	}
	update(){
		this.xcor++;
		this.ycor++;
		return this.lifespan-- <= 0;
	}
	display(){
		this.elements[0].style.left = this.xcor + 'px';
		this.elements[0].style.top = this.ycor + 'px';
	}
}

var container = document.createElement('div');
container.style.position = "static";
container.style.height = "1000px";
container.style.width = "1000px";
container.style.background = "black";
document.body.appendChild(container);

var em = new entityManager(container);
em.spawn(new rect(0,0,100,100,'red'));
em.start();