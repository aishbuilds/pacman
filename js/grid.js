var canvas, ctx;
var grid = [
	[1,1,1,1,1,1,1,1],
	[1,1,0,0,0,1,1,1],
	[1,1,0,0,0,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,0,0,1],
	[1,1,1,1,1,0,0,1],
	[1,1,1,1,1,1,1,1],
]
var xPosition = 10;
var yPosition = 10;

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	for(var i=0; i<grid.length; i++){
		for(var j=0; j<grid[i].length; j++){
			if(grid[i][j] == 1){
				ctx.beginPath();
				ctx.rect(xPosition, yPosition, 40, 40);
				ctx.stroke();
			}
			xPosition += 40
		}
		xPosition = 10
		yPosition += 40
	}
}


window.onload = init;