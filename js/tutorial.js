function draw(){
	var canvas = document.getElementById('tutorial');
	if(canvas.getContext){
		var context = canvas.getContext('2d');
		
		context.fillStyle = "rgb(200,0,0);"
		context.fillRect(10,10,50,50);

		context.fillStyle = "rgba(0,0,200,0.5);"
		context.fillRect(30,30,50,50);

		context.fillRect(100, 100, 100, 100);
		context.clearRect(120,120,60,60);
		context.strokeRect(140,140,20,20);

		// Traingle
		context.beginPath();
		context.moveTo(100,240)
		context.lineTo(120,260)
		context.lineTo(120,220)
		context.fill()

		// Smiley
		context.beginPath();

		// Outer circle
		context.arc(100,320,50,0,Math.PI*2,false)
		context.moveTo(75,295)

		// Left eye
		context.arc(75,295,5,0,Math.PI*2,false)
		context.moveTo(125,295);

		// Right eye
		context.arc(125,295,5,0,Math.PI*2,false)
		context.moveTo(100,325)

		// Mouth
		context.arc(100,325,15,0,Math.PI,false)
		context.stroke();

		// Top left triangle
		context.beginPath();
		context.moveTo(100,400)
		context.lineTo(100,420)
		context.lineTo(120,400)
		context.fill();

		// Bottom right triangle
		context.beginPath();
		context.moveTo(100,430);
		context.lineTo(120,410);
		context.lineTo(120,430);
		context.closePath();
		context.stroke();


		// Bezier curves
		context.beginPath();
		context.moveTo(100,500);
		context.bezierCurveTo(150,550,150,600,130,575);
		context.stroke();
	}
	
}


