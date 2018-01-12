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
