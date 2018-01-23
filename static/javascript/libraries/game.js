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
