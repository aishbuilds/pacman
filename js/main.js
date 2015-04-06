var context;

window.onload = function(){
	var canvas = document.getElementById("canvas1");
	if(canvas.getContext){
		context = canvas.getContext("2d");
	}
}

function drawRect(){
	context.fillRect(20, 20, 100, 100);
}

function drawLine(){
	for(x=10.5; x<=200; x+=10){
		context.moveTo(x, 10);
		context.lineTo(x, 200);
	}

	for(y=10.5; y<=200; y+=10){
		context.moveTo(10, y);
		context.lineTo(200, y);
	}

	context.strokeStyle="#eee";
	context.stroke();


}