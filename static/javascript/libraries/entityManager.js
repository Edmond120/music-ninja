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
};

class entityManager{
	constructor(div){
		this.entities = new linkedList();
		this.running = false;
		this.div = div
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
