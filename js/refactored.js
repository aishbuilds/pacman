window.onload = init;

function init(){
	var ctx = initializeCanvas();

	var state = {
		dots: [],
		pacmanX: 60,
		pacmanY: 60,
		pacManDirection: 'right'
	}

	window.addEventListener("keydown", function(e){
		state = update(state, e)
	})

	function tick(){
		clear(ctx);
		draw(ctx, state);
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

function clear(ctx){
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function draw(ctx, state){
	drawBorder(ctx, state);
	drawDots(ctx, state);
	drawPacman(ctx, state);
}

function drawBorder(ctx, state){
	for(var i=0; i<config.GRID.length-1; i++){
		for(var j=0; j<config.GRID[i].length-1; j++){
			// If the element to the right is not the same, draw a line to the right
			if(config.GRID[i][j] != config.GRID[i][j+1]){
				drawLine(ctx, j*config.BOX_WIDTH, i*config.BOX_WIDTH, true)
			}
			// If the element below is not the same, draw a line below it
			if(config.GRID[i][j]!= config.GRID[i+1][j]){
				drawLine(ctx, j*config.BOX_WIDTH, i*config.BOX_WIDTH, false)
			}
			// Store dots co-ordinates
			if(config.GRID[i][j] == 1){
				storeDotPosition(state, i, j)
			}
		}
	}
}

function drawLine(ctx, xPosition, yPosition, isVertical){
	ctx.strokeStyle = '#0033ff';
	ctx.beginPath();

	if(isVertical){
		ctx.moveTo(xPosition+config.BOX_WIDTH, yPosition);
		ctx.lineTo(xPosition+config.BOX_WIDTH, yPosition+config.BOX_HEIGHT);	
	}
	else{
		ctx.moveTo(xPosition, yPosition+config.BOX_HEIGHT);
		ctx.lineTo(xPosition+config.BOX_WIDTH, yPosition+config.BOX_HEIGHT);
	}

	ctx.stroke();
}

function storeDotPosition(state, i, j){
	dotX = (j*config.BOX_WIDTH) + config.BOX_WIDTH/2
	dotY = (i*config.BOX_WIDTH) + config.BOX_WIDTH/2
	if(!state.dots[dotX + " " + dotY]){
		state.dots[dotX + " " + dotY] = {'x': dotX, 'y': dotY, 'eaten': false}
	}
}

function drawDots(ctx, state){
	for(key in state.dots){
		if(!state.dots[key].eaten){
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(state.dots[key].x, state.dots[key].y,5,5);	
		}		
	}
}

function drawPacman(ctx, state){
	// Draw the Pacman
	ctx.beginPath();
	ctx.fillStyle = "#f2f000"
	ctx.strokeStyle="#000000"

	// Arc of pacman
	ctx.arc(state.pacmanX, state.pacmanY, config.PACMAN.radius, config.PACMAN[state.pacManDirection].startAngle, config.PACMAN[state.pacManDirection].endAngle, false	)
	
	// Mouth
	ctx.lineTo(state.pacmanX + config.PACMAN[state.pacManDirection].dMouthX, state.pacmanY+ config.PACMAN[state.pacManDirection].dMouthY)
	
	ctx.fill();
	ctx.stroke();
	
	// eyes
	ctx.beginPath();
	ctx.fillStyle = "#000000"
	ctx.arc(state.pacmanX + config.PACMAN[state.pacManDirection].dEyesX,	state.pacmanY + config.PACMAN[state.pacManDirection].dEyesY, 2, 0, Math.PI*2, false)
	ctx.fill();
}

function update(state, e){
	state.pacManDirection = config.KEY_DIRECTIONS[e.keyCode] ? config.KEY_DIRECTIONS[e.keyCode] : state.pacManDirection
	
	switch(state.pacManDirection){
		case 'right':
			state.pacmanX += 2
			break;
		case 'left':
			state.pacmanX -= 2
			break;
		case 'up':
			state.pacmanY -= 2
			break;
		case 'down':
			state.pacmanY += 2
			break;
	}

	return state;
}