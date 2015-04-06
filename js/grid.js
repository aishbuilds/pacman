var canvas, ctx;
var userGrid = [
	[1,1,1,1,1,0,1,1],
	[1,1,0,0,0,1,1,1],
	[1,1,0,0,0,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,0,0,1],
	[1,1,1,1,1,0,0,1],
	[1,1,1,1,1,1,1,1],
]
var xPosition = 0;
var yPosition = 0;
var GRID_WIDTH = 40;
var GRID_HEIGHT = 40;
var grid = [];

function init(){
	
	var zero = new Array();
	for(var i = 0; i < userGrid[0].length+2; i++){
		zero.push(0);
	}

	grid[0] = zero;
	
	for(var i = 0; i<userGrid.length; i++){
		grid[i+1] = new Array();
		grid[i+1].push(0);
		grid[i+1] = grid[i+1].concat(userGrid[i]);
		grid[i+1].push(0);
	}
	grid[grid.length] = zero;
	console.log(grid);
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	ctx.strokeStyle = '#000000';
	for(var j = 0; j < grid[0].length; j++){
		if(grid[0][j]==1){
			ctx.beginPath();
			ctx.moveTo(j*GRID_WIDTH, 0);
			ctx.lineTo((j+1)*GRID_WIDTH, 0);
			ctx.stroke();
		}
	}
	for(var i=0; i<grid.length-1; i++){
		for(var j=0; j<grid[i].length-1; j++){
			if(grid[i][j] != grid[i][j+1]){
				ctx.beginPath();
				ctx.moveTo(xPosition+40, yPosition);
				ctx.lineTo(xPosition+40, yPosition+40);
				ctx.stroke();
			}
			if(grid[i][j]!= grid[i+1][j]){
				ctx.beginPath();
				ctx.moveTo(xPosition, yPosition+40);
				ctx.lineTo(xPosition+40, yPosition+40);
				ctx.stroke();
			}
	
			xPosition += 40
		}
		xPosition = 0
		yPosition += 40
	}
}


window.onload = init;