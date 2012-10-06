function SolarSystem(){
	var ctx = document.getElementById('canvas').getContext('2d');
	var canvas = document.getElementById("canvas");
	this.planetanimator = planetanimator;
	this.ctx = ctx;
	this.canvas = canvas;
    this.canvas.onmousemove = mm;
    this.mx = 0;
    this.my = 0;
    // Make sure we don't execute when canvas isn't supported
	if (canvas.getContext){
	    // use getContext to use the canvas for drawing
		this.ctx = canvas.getContext('2d');
	} else {
		    alert('You need Safari or Firefox 1.5+ to see this demo.');
	}
}

function Planet(solarsystem, radius, orbitradius, tilt, speed,image){
	this.radius = radius;
	this.orbitradius = orbitradius;
	this.tilt = tilt;
	this.speed = speed;
	this.solarsystem = solarsystem;
	this.scale = 1;
	this.orbitstate = 0;
	this.orbitstate2 = 0;
	this.Trail = new Trail(this,16,"sparkling");
	//0 = upward, 1 = downward
	this.has_image = image;
	this.phase = 0;
	this.quadrant = 1;
	this.xoffset = 0;
	this.yoffset = 0;
	this.radgrad = getRadGrad(this.radius,this.solarsystem.ctx);
	this.step = 0;
}

function mm(e){
	solarsystem.mx = e.pageX; 
	solarsystem.my = e.pageY;
	
}

function planetanimator(planets){
	var ctx = this.ctx;
	
	ctx.clearRect(0,0,800,600);
	
	var i = 0;
	var xpos = 0;
	var ypos = 0;
	//var scale = 0;
	for(i = 0; i < planets.length; i++){
		
		if(planets[i].orbitstate >= 2*Math.PI){
			planets[i].orbitstate = 0;
			planets[i].orbitstate2 = 0;
		}
		
		planets[i].orbitstate += planets[i].speed/2;
		
		if(planets[i].orbitstate2 >= 2*Math.PI){
			planets[i].orbitstate2 = 0;
			planets[i].orbitstate = 0;
		}
		
		planets[i].orbitstate2 += planets[i].speed;
		planets[i].xoffset = Math.sin(planets[i].orbitstate2)*planets[i].orbitradius;
		planets[i].yoffset = Math.sin(planets[i].orbitstate2)*planets[i].tilt;
		xpos = planets[i].solarsystem.mx+Math.sin(planets[i].orbitstate2)*planets[i].orbitradius;
		ypos = planets[i].solarsystem.my+Math.sin(planets[i].orbitstate2)*planets[i].tilt;
		//planets[i].Trail.drawTrail();
		ctx.save();
		ctx.translate(xpos,ypos);
		
	    if(planets[i].has_image){
	    	var img = new Image();
	    	img.onload = function(){
	    	    ctx.drawImage(img,xpos,ypos,25,25);
	    	};
	    	img.src = "jupiter.jpg";
	    }else{
	    	planets[i].scale = Math.abs(Math.sin(planets[i].orbitstate))+0.3;
			ctx.scale(planets[i].scale,planets[i].scale);
	    	ctx.beginPath();
		    ctx.arc(0,0,planets[i].radius,0,Math.PI*2,true); // Outer circle
		    ctx.fillStyle = planets[i].radgrad;
			ctx.fill();
			ctx.closePath();
	    }
	    //ctx.stroke();
	    
	    ctx.restore();
	    
	}
	
	  
}

function getRadGrad(radius,ctx){
	var c1 = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
	var radgrad4 = ctx.createRadialGradient(0,0,0,0,0,radius);
    radgrad4.addColorStop(0, c1);
    radgrad4.addColorStop(0.8, c1);
    //radgrad4.addColorStop(0.9, '#E4C700');
    radgrad4.addColorStop(1, 'rgba(228,0,0,0.8)');
	return radgrad4;
}

function Trail(ball,maxlength,type){
	this.ball = ball;
	this.path = new Array();
	this.maxlength = maxlength;
	this.type = type;
	
	this.drawTrail = drawTrail;
}

function drawTrail(){
	var i = 0;
	if(this.ball.step <= 13){
		this.ball.step++;
	}else{
		this.ball.step = 2;
	}
	if(this.ball.step%13 == 0){
		this.path.push(new Array(solarsystem.mx+this.ball.xoffset, solarsystem.my+this.ball.yoffset));
	}

	if(this.path.length > this.maxlength){
		this.path.shift();
	}
	
	solarsystem.ctx.save();
	//this.solarsystem.ctx.translate(this.xpos,this.ypos);
	
	solarsystem.ctx.beginPath();
	
	//this.solarsystem.ctx.fillStyle = this.color;
	var lineargradient;
	solarsystem.ctx.lineWidth = (this.ball.radius*2-4)*this.ball.scale;
	solarsystem.ctx.lineJoin = "round";
	solarsystem.ctx.lineCap = "round";
	//this.solarsystem.ctx.globalCompositeOperation = "destination-over";
	solarsystem.ctx.moveTo(this.path[0][0],this.path[0][1]);
	lineargradient = solarsystem.ctx.createLinearGradient(this.path[0][0],this.path[0][1],this.path[this.path.length-1][0],this.path[this.path.length-1][1]);
	lineargradient.addColorStop(0,'red');
	lineargradient.addColorStop(0.14,'orange');
	lineargradient.addColorStop(0.28,'yellow');
	lineargradient.addColorStop(0.42,'green');
	lineargradient.addColorStop(0.56,'blue');
	lineargradient.addColorStop(0.70,'indigo');
	lineargradient.addColorStop(1,'violet');
	for (i = 1; i < this.path.length; i++) {
		solarsystem.ctx.strokeStyle = lineargradient;
		solarsystem.ctx.lineTo(this.path[i][0],this.path[i][1]);
		solarsystem.ctx.stroke();
	}
	
	solarsystem.ctx.closePath();
	solarsystem.ctx.restore();
}