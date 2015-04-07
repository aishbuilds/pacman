var canvas, ctx;
var userGrid = [
	[1,1,1,1,1,0,1,1,1,1,1,1,0],
	[1,1,0,0,1,1,1,1,1,1,1,1,1],
	[1,1,0,0,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,0,0,0,1,1,0,0,0],
	[1,1,1,1,1,0,0,0,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,0,0,0,0,1,1,1,0,1,1],
	[1,1,1,0,0,0,0,1,1,1,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,0,1,1],
]

var pacmanX = 60;
var pacmanY = 60;
var pacmanRadius = 20;
var isRight;

var GRID_WIDTH = 40;
var GRID_HEIGHT = 40;
var grid = [];
var globalID;

function init(){
	
	initializeGrid();

	initializeCanvas();

	drawBorders();
	
	drawHorizontalPacman(true);
}

function initializeGrid(){
	// Add zeros at the border of array to mark the edges.

	var zero = new Array();
	for(var i = 0; i < userGrid[0].length+2; i++){
		zero.push(0);
	}

	grid[0] = zero;
	
	// Concate the userGrid to the grid 
	for(var i = 0; i<userGrid.length; i++){
		grid[i+1] = new Array();
		grid[i+1].push(0);
		grid[i+1] = grid[i+1].concat(userGrid[i]);
		grid[i+1].push(0);
	}

	grid[grid.length] = zero;
}

function initializeCanvas(){
	canvas = document.getElementById('canvas');
	canvas.width = GRID_WIDTH * grid[0].length;
	canvas.height = GRID_HEIGHT * grid.length;
	ctx = canvas.getContext('2d');
}

function drawBorders(){
	ctx.strokeStyle = '#0033ff';
	
	var xPosition = 0;
	var yPosition = 0;

	for(var i=0; i<grid.length-1; i++){
		for(var j=0; j<grid[i].length-1; j++){
			
			// If the element to the right is not the same, draw a line to the right
			if(grid[i][j] != grid[i][j+1]){
				ctx.beginPath();
				ctx.moveTo(xPosition+GRID_WIDTH, yPosition);
				ctx.lineTo(xPosition+GRID_WIDTH, yPosition+GRID_HEIGHT);
				ctx.stroke();
			}

			// If the element below is not the same, draw a line below it
			if(grid[i][j]!= grid[i+1][j]){
				ctx.beginPath();
				ctx.moveTo(xPosition, yPosition+GRID_HEIGHT);
				ctx.lineTo(xPosition+GRID_WIDTH, yPosition+GRID_HEIGHT);
				ctx.stroke();
			}
	
			xPosition += GRID_WIDTH
		}
		xPosition = 0
		yPosition += GRID_HEIGHT
	}
}

function reset(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBorders();
}

function moveHorizontal(){
	var xIndex = Math.floor(pacmanX/GRID_WIDTH);
	var yIndex = Math.floor(pacmanY/GRID_HEIGHT);

	if(isRight){
		dx = 1
		currentBlock = grid[yIndex][xIndex]
		nextBlock = grid[yIndex][xIndex+1]
	}
	else{
		dx = -1
		currentBlock = grid[yIndex][xIndex]
		nextBlock = grid[yIndex][xIndex-1]
	}
		

	// Stop if a wall is encountered	
	if((currentBlock != nextBlock) && ((pacmanX + (dx * pacmanRadius)) % GRID_WIDTH == 0)){
		return false;
	}

	reset();
	
	pacmanX = pacmanX + (dx * 2)
	drawHorizontalPacman(isRight);

	globalID = window.requestAnimationFrame(moveHorizontal);
}

function drawHorizontalPacman(isRight){
	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	var startAngle, endAngle, dMouthX, dMouthY;

	// MOVE RIGHT
	if(isRight){
		startAngle = Math.PI*0.25;
		endAngle = Math.PI*1.75;
		dMouthX = 2
		dMouthY = 0
	}
	else{
		startAngle = Math.PI*1.25;
		endAngle = Math.PI*0.75;
		dMouthX = 2
		dMouthY = 0
	}

	// Arc of pacman
	ctx.arc(pacmanX,pacmanY,pacmanRadius,startAngle,endAngle,false)
	// Mouth
	ctx.lineTo(pacmanX+dMouthX,pacmanY+dMouthY)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(pacmanX+2,pacmanY-10,2,0,Math.PI*2, false)
	ctx.fill();
}

window.addEventListener("keydown", keyDownEvent, true)

function keyDownEvent(){
	
	if(!event)
		event = window.event;

	var code = event.keyCode;

	if(event.charCode && code==0)
		code = event.charCode;

	switch(code){
		case 37:
			cancelAnimationFrame(globalID);
			isRight = false
			moveHorizontal();
			break;
		// case 38:
		// 	moveUp();
		// 	break;
		case 39:
			cancelAnimationFrame(globalID);
			isRight = true
			moveHorizontal();
			break;
		case 40:
			cancelAnimationFrame(globalID);
			// moveDown();
			break;
	}
	event.preventDefault();
}

window.onload = init;