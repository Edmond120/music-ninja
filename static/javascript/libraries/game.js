var container = document.createElement('div');
document.body.appendChild(container);
var fruits = new entityManager(container);
fruits.spawn(new fruit("kiwi.png",100,100));
