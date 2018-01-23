var updateMouse = function(event){
	mouseX = event.clientX;
	mouseY = event.clientY;
	//console.log(event.clientX);
	//console.log(event.clientY);
}

document.addEventListener("mousemove", updateMouse);
var container = document.createElement('div');
document.body.appendChild(container);
var fruits = new entityManager(container);
fruits.spawn(new fruitSpawner(stuff))
