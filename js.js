var point = 0;
var time = 0;
var screen = document.getElementById("screen");
var screenHeight = screen.offsetHeight;
var screenWidth = screen.offsetWidth;
var height = screenHeight * 3 / 4;
var box = document.getElementById("box");
var boxHeight = box.offsetHeight;
var boxWidth = box.offsetWidth;
var temp = [box]

var targetX = screenHeight / 2;
var targetY = screenHeight / 2;

class linkedListNode{
	constructor(data){
		this.data = data;
		this.next = null;
	}
}

class linkedList{
	constructor(){
		this.start = new linkedListNode(null);
		this.end = start;
		this.length = 0;
		this.current = start;
		this.currentBack = null;
	}
	get(index){//this function is not really needed but is included just in case
		var i;
		var node = this.start;
		for(i = -1; i < index; i++){
			node = node.next;
		}
	}
	add(data){
		end.next = new linkedListNode(data);
		end = end.next;
		length++;
	}
	//built in iterator
	startIterator(){//sets current to start, used at the beginning of every frame
		current = start;
		currentBack = null;
	}
	hasNext(){
		return !(current.next == null);
	}
	next(){
		currentBack = current;
		current = current.next;
		return current;
	}
	remove(){//removes current
		currentBack = current.next;
		length--;
	}
}

class entitiy{
	constructor(){}
	update(){}
	display(){}
}

/*
var randomObject = function(){
    num = Math.floor( Math.random() * objects.leng );
    return objects[num];
}

var addTemp = function (){
    if ( time % 5 = 0){
	temp.add( randomObject() );
    };
};


var throwTemp = function(object){
    
};

var action = function(time){
    if (time = 0){
	throwTemp();
    };
};
*/
var distance = function(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow(y0 - y1,2) + Math.pow(x0 - x1,2));
};

var cut = function(e){
    "still need to make sure this function will call
click every single time"
    while (e.onmousedown = true){
	click(e);
    };
};

var click = function(e){
    if(distance(targetX,targetY,e.clientX,e.clientY) < 100){
	win = 1;
    };
    /*
    for (i=0; i < objects.length; i++){
	if ( distance( temp[i], temp[i], e.clientX, e.clientY) < 100 ){
	    temp.splice(i,i+1);
	    point += 1;
	};
    };*/
};

screen.addEventListener("onmousedown", cut)
