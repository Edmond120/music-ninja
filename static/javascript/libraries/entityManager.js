class entity{
	constructor(){
		this.owner = null;
	}
	update(){} //returns true if dead, false otherwise
	display(){}
	addToDOM(){} //adds the html elements to the DOM
};

class entityManager{
	constructor(div){
		this.entities = new linkedList();
		this.interval = 16.7; //about 60 fps
		this.running = false;
		this.div = div
	}
	setDiv(d){
		this.div = d;
	}
	resume(){
		this.running = true;
		var id  = setInterval(frame,interval);
		function frame(){
			if(this.running){
				while(this.entities.hasNext()){
					var x = this.entities.next();
					if(x.update()){
						x.remove();
					}
					x.display();
				}
				x.startIterator();
			}
			else{
				clearInterval(id);
			}
		}
	}
	start(){
		this.entities.startIterator();
		this.resume();
	}
	stop(){
		this.running = false;
	}
	spawn(x){ //requires an entity
		x.owner = this;
		x.addToDOM();
		this.entity.add(x);
	}
};
