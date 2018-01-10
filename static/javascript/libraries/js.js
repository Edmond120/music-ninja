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
}

class entity{
	constructor(){}
	update(){}
	display(){}
}

class item extends entity{
    var gravity = -2;
    var xcord = 0;
    var ycord = 0;
    var velx = 0;
    var vely

    var split = function(image) {
	var width = image.width;
	var height = image.height;
	var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
	
	canvas.width = width;
	canvas.height = height;
	
	ctx.drawImage(image, 0, 0, width, height,  0, 0, width, height);
	var canvas2 = document.createElement('canvas2'),
            ctx2 = canvas2.getContext('2d');
	
	canvas2.width = width;
	canvas2.height = height;
	
	ctx2.drawImage(image, width/2 + 1, 0, width, height,  0, 0, width, height);
	
	return [canvas,canvas2];
    var changevel = function(x,y){
	velx = x;
	vely = 
    }
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
    pic = split("../images/pineapple/png");
    lefthalf = pic[0];
    righthalf = pic[1];
screen.addEventListener("onmousedown", cut)
    
 
    
   var test = function(){


}; 
