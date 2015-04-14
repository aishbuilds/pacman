window.onload = init;

function init(){
	var ctx = initializeCanvas();
	
	function tick(){
		draw(ctx);
		window.requestAnimationFrame(tick);
	}
	window.requestAnimationFrame(tick);
}

function initializeCanvas(){
	var canvas = document.getElementById('canvas')
	canvas.width = config.BOX_WIDTH * config.GRID[0].length
	canvas.height = config.BOX_HEIGHT * config.GRID.length
	return canvas.getContext('2d');
}

function draw(ctx){
	drawBorder(ctx);
}