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

var xPosition = 0;
var yPosition = 0;
var pacmanX = 80;
var pacmanY = 60;

var GRID_WIDTH = 40;
var GRID_HEIGHT = 40;
var grid = [];

function init(){
	
	initializeGrid();

	initializeCanvas();

	drawBorders();

	drawPacman();
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
	
			xPosition += 40
		}
		xPosition = 0
		yPosition += 40
	}
}

function drawPacman(){
	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"
	
	
	
	// Arc of pacman
	ctx.arc(pacmanX,pacmanY,20,Math.PI*0.25,Math.PI*1.75,false)
	// Mouth
	ctx.lineTo(pacmanX+2,pacmanY)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(pacmanX+2,pacmanY-10,2,0,Math.PI*2, false)
	ctx.fill();
}

window.onload = init;