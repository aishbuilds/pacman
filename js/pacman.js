var xPosition = 49;
var yPosition = 48;
var ctx;

function init(){
	ctx = document.getElementById('canvas').getContext('2d');
	// drawDots();
	drawBorders();

	window.requestAnimationFrame(moveRight);

}

window.addEventListener("keydown", keyDownEvent, true)

function keyDownEvent(){
	
	if(!event)
		event = window.event;

	var code = event.keyCode;

	if(event.charCode && code==0)
		code = event.charCode;

	switch(code){
		case 39:
			moveRight();
			break;
		case 40:
			moveDown();
			break;
		case 37:
			moveLeft();
			break;
		case 38:
			moveUp();
			break;
	}
	event.preventDefault();
}

function clearPacman(){
	ctx.clearRect(xPosition-22,yPosition-22,44,44);
}

function moveRight(){

	nearest = findNearestRight(xPosition, yPosition);

	if(nearest != -1){
		if(xPosition+25 >= nearest){
			return false;
		}
	}
	clearPacman();

	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	xPosition+=3;
	
	// Arc of pacman
	ctx.arc(xPosition,yPosition,20,Math.PI*0.25,Math.PI*1.75,false)
	// Mouth
	ctx.lineTo(xPosition+2,yPosition)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(xPosition+2,yPosition-10,2,0,Math.PI*2, false)
	ctx.fill();
}

function moveDown(){
	moveDownwards = canMoveVertically(xPosition, yPosition, false);
	
	if(!moveDownwards){
		return false;
	}

	clearPacman();

	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	yPosition+=2;
	
	// Arc of pacman
	ctx.arc(xPosition,yPosition,20,Math.PI*0.75,Math.PI*0.25,false)
	// Mouth
	ctx.lineTo(xPosition,yPosition+2)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(xPosition+8,yPosition+2,2,0,Math.PI*2, false)
	ctx.fill();
}

function moveLeft(){

	nearest = findNearestLeft(xPosition, yPosition);

	if(nearest != -1){
		if(xPosition-25 <= nearest){
			return false;
		}
	}
	clearPacman();

	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	xPosition-=3;
	
	// Arc of pacman
	ctx.arc(xPosition,yPosition,20,Math.PI*1.25,Math.PI*0.75,false)
	// Mouth
	ctx.lineTo(xPosition+2,yPosition)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(xPosition+2,yPosition-10,2,0,Math.PI*2, false)
	ctx.fill();
}

function moveUp(){	

	moveUpwards = canMoveVertically(xPosition, yPosition,true);
	
	if(!moveUpwards){
		return false;
	}

	clearPacman();
	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	yPosition-=2;
	
	// Arc of pacman
	ctx.arc(xPosition,yPosition,20,Math.PI*1.75,Math.PI*1.25,false)
	// Mouth
	ctx.lineTo(xPosition,yPosition-2)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(xPosition-8,yPosition-2,2,0,Math.PI*2, false)
	ctx.fill();
}

function drawDots(){
	// Dots
	var rectX = 80;
	rectY = 45;
	ctx.fillStyle = '#FFFFFF';

	for(var i=0; i<5; i++){
		ctx.fillRect(rectX,rectY,5,5)	
		rectX += 30
	}

	// for(var i=0; i<15; i++){
	// 	ctx.fillRect(rectX,rectY,5,5)
	// 	rectY += 30
	// }
}

function drawBorders(){
	ctx.beginPath();
	ctx.strokeStyle = '#0033ff'

	// Outer border
	ctx.moveTo(10,10);
	ctx.lineTo(570,10);
	ctx.lineTo(570,570);
	ctx.lineTo(10,570);
	ctx.lineTo(10,10);

	// Inner border
	ctx.moveTo(20,20);
	ctx.lineTo(240,20);
	ctx.lineTo(240,100);
	ctx.lineTo(280,100);
	ctx.lineTo(280,20);
	ctx.lineTo(560,20);

	ctx.lineTo(560,560)
	ctx.lineTo(20,560)

	ctx.lineTo(20,20);

	// Left rectangle
	ctx.moveTo(80,80);
	ctx.lineTo(180,80);
	ctx.lineTo(180,150);
	ctx.lineTo(80,150);
	ctx.lineTo(80,80);

	ctx.stroke();
}

function canMoveVertically(x, y,isUpwards){

	downwards = [
		{'xa': 80, 'ya': 80, 'xb': 180, 'yb': 80},
		{'xa': 20, 'ya': 560, 'xb': 560, 'yb': 560},
	]

	upwards = [
		{'xa': 20, 'ya': 20, 'xb': 240, 'yb': 20},
		{'xa': 80, 'ya': 150, 'xb': 180, 'yb': 150},
		{'xa': 240, 'ya': 100, 'xb': 280, 'yb': 100},
		{'xa': 280, 'ya': 20, 'xb': 560, 'yb': 20}
	]

	borders = downwards.concat(upwards)
	dy = 1
	if(isUpwards)
		dy = -1

	for(var i=0; i<borders.length; i++){
		current = borders[i];
		console.log(current)
		console.log(x + " "  + y)
		if(y+20*dy == current.ya - dy*4 || y+20*dy == current.ya - dy*5){
			console.log("crossed y")
			if(x+20 >= current.xa && x-20 <= current.xb){
				console.log("crossed x")
				console.log(dy)
				return false;
			}
				
		}
	}

	return true;
}

function canMoveUpwards(x, y){

	borders = [
		{'xa': 20, 'ya': 20, 'xb': 240, 'yb': 20},
		{'xa': 80, 'ya': 150, 'xb': 180, 'yb': 150},
		{'xa': 240, 'ya': 100, 'xb': 280, 'yb': 100},
		{'xa': 280, 'ya': 20, 'xb': 560, 'yb': 20}
	]
	
	var nearest = true;

	for(var i=0; i<borders.length; i++){
		current = borders[i];
		console.log("----------------")
		console.log(current.ya)
		console.log(y-20)
		if(y-20 == current.ya + 4 || y-20 == current.ya + 5){
			console.log("BORDER REACHED")
			console.log(x)
			console.log(current.xa)
			console.log(current.xb)
			console.log("!!!!!!!!!!!!!!")
			if(x-20 >= current.xa - 3 && x+20 <= current.xb + 3){
				console.log("RED SIGNAL")
				return false
			}
		}
		// if(y > current.ya){
		// 	if(x >= current.xa && x <= current.xb){
		// 		nearest = current.ya
		// 	}
		// }
	}
	return nearest;
}

function findNearestRight(x, y){

	borders = [
		{'xa': 80, 'ya': 80, 'xb': 80, 'yb': 150},
		{'xa': 240, 'ya': 20, 'xb': 240, 'yb': 100},
		{'xa': 560, 'ya': 20, 'xb': 560, 'yb': 560}
	]
	
	var nearest = -1;

	for(var i=0; i<borders.length; i++){
		current = borders[i];
		if(x < current.xa){
			if(y >= current.ya && y <= current.yb){
				return current.xa
			}
		}
	}
	return nearest;
}

function findNearestLeft(x, y){

	borders = [
		{'xa': 20, 'ya': 20, 'xb': 20, 'yb': 560},
		{'xa': 180, 'ya': 80, 'xb': 180, 'yb': 150},
		{'xa': 280, 'ya': 20, 'xb': 280, 'yb': 100}
	]
	
	var nearest = -1;

	for(var i=0; i<borders.length; i++){
		current = borders[i];
		if(x > current.xa){
			if(y >= current.ya && y <= current.yb){
				nearest = current.xa
			}
		}
	}
	return nearest;
}