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
mainEventManager = fruits;
document.addEventListener("mousemove", updateMouse);
var pauseButton = new buttons();
pauseButton.elements[0].addEventListener("click", pauseButton.displayPause);
fruits.spawn(pauseButton);
fruits.spawn(new fruitSpawner(stuff));
fruits.start();
