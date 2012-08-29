/**
 * 
 */

function BallWorld(gravity,xgravity,width,height){
	var ctx = document.getElementById('canvas').getContext('2d');
	var canvas = document.getElementById("canvas");
	canvas.onmousedown = mdown;
	canvas.onmouseup = mup;
	
	//ctx.save();
	this.canvas = canvas;
	this.domousedrag = false;
	this.lastmousex = -1;
	this.lastmousey = -1;
	this.dragball = null;
	this.gravity = gravity;
	this.xgravity = xgravity;
	this.startdragtime = null;
	this.types = new Object();
	this.types["default"] = 0;
	this.types["killer"] = 1;
	this.types["glass"] = 2;
	this.types["rubber"] = 3;
	this.types["metal"] = 4;
	this.types["fire"] = 5;
	this.types["lightning"] = 6;
	this.types["gravitron"] = 7;
	this.types["deflectron"] = 8;
	this.width = width;
	this.height = height;
	this.animator = animator;
	this.ctx = ctx;
	this.ctx.clearRect(0,0,this.width,this.height);
	this.walltype = 2; /**1 = endless, 2 = solid*/
}

function mdown(e){
	mx = e.pageX - world.canvas.offsetLeft;
	my = e.pageY - world.canvas.offsetTop;
	for ( var i = 0; i < balls.length; i++) {
		if(((balls[i].xpos-balls[i].radius)<mx) && ((balls[i].xpos+balls[i].radius)>mx) && ((balls[i].ypos-balls[i].radius)<my) && ((balls[i].ypos+balls[i].radius)>my)){
			world.domousedrag = true;
			world.startdragtime = new Date().getTime();
			world.dragball = balls[i];
			world.canvas.onmousemove = dragball;
			
		}
	}
}

function mup(){
	world.domousedrag = false;
	world.canvas.onmousemove = null;
	world.dragball = null;
	world.lastmousex = -1;
	world.lastmousey = -1;
	world.startdragtime = null;
}

function dragball(e){
	mx = e.pageX - world.canvas.offsetLeft;
	my = e.pageY - world.canvas.offsetTop;
	now = new Date().getTime();
	world.dragball.resting = false;
	if(world.domousedrag ){
		
		world.dragball.xpos = mx;
		world.dragball.ypos = my;
		if((world.startdragtime-now)<40){
			world.startdragtime = now;
			if((world.lastmousex > -1)&&(world.lastmousey > -1)){
				world.dragball.xspeed = mx - world.lastmousex;
				world.dragball.yspeed = my - world.lastmousey;
			}else{
				world.dragball.xspeed = 0;
				world.dragball.yspeed = 0;
			}
			world.lastmousex = mx;
			world.lastmousey = my;
		}
		
		
	}
	
}



function animator(balls){
	this.ctx.clearRect(0,0,this.width,this.height);
	var i = 0;
	var numballstopped = 0;
	for (i = 0; i < balls.length; i++) {
		//if(balls[i].hasCollided > 1){
			balls[i].hasCollided = 0;
		//}
		
	}
	var iy = 1;
	for (iy = 0; iy < balls.length; iy++) {
		checkCollisions(balls[iy],balls,iy);
		attract(balls[iy],balls,iy);
		if(balls[iy].destroy == true){
			balls.splice(iy,1);
			continue;
		}
		
		balls[iy].animate();
		if(balls[iy].resting == true){
			numballstopped ++;
		}
		if(numballstopped == balls.length){
			balls[iy].xspeed = 10;
			balls[iy].yspeed = -10;
			balls[iy].resting = false;
		}
	}
	
}

function checkCollisions(ball, allballs, ballindex){
	var xrelative = 0;
	var yrelative = 0;
	var xspeedboost = 0;
	var yspeedboost = 0;
	var newdistance1 = 0;
	var newdistance2 = 0;
	var moveby = 0;
	var theballxspeedtemp = 0;
	var theballyspeedtemp = 0;
	var theballrotationtemp = 0;
	var totalmass = 0;
	var relativexspeed = 0;
	var relativeyspeed = 0;
	var ii = 0;
	for (ii = 0; ii < allballs.length; ii++) {
		xrelative = 0;
		yrelative = 0;
		newdistance1 = 0;
		newdistance2 = 0;
		moveby = 0;
		if(ballindex != ii){
			if((ball.hasCollided == 0) && (allballs[ii].hasCollided == 0)){
				var distance = Math.sqrt(Math.pow(ball.xpos-allballs[ii].xpos, 2)+Math.pow(ball.ypos-allballs[ii].ypos, 2));
			
				if(distance < (allballs[ii].radius+ball.radius)){
					xrelative = ball.xpos - allballs[ii].xpos;
					yrelative = ball.ypos - allballs[ii].ypos;
					if(allballs[ii].types.indexOf(1) != -1){
						ball.destroy = true;
						//continue;
					}else if(ball.types.indexOf(1) != -1){
						allballs[ii].destroy = true;
						//continue;
					}
					if(allballs[ii].types.indexOf(5) != -1 && ball.types.indexOf(4) == -1 && ball.types.indexOf(6) == -1 && ball.types.indexOf(2) == -1){
						ball.types.push(5);
						//continue;
					}else if(ball.types.indexOf(5) != -1 && allballs[ii].types.indexOf(4) == -1 && allballs[ii].types.indexOf(6) == -1 && allballs[ii].types.indexOf(2) == -1){
						allballs[ii].types.push(5);
						//continue;
					}
					while((newdistance1) < (allballs[ii].radius+ball.radius)&&(moveby < 100)){
						moveby += 0.01;
						newdistance1 = Math.sqrt(Math.pow(xrelative+xrelative*moveby,2)+Math.pow(yrelative+yrelative*moveby,2));
					}	
					//moveby += 0.5;
					if(xrelative < 0){
						ball.xpos -= xrelative*moveby/2;
						allballs[ii].xpos += xrelative*moveby/2;
					}else{
						ball.xpos += xrelative*moveby/2;
						allballs[ii].xpos -= xrelative*moveby/2;
					}
					if(yrelative <0 ){
						ball.ypos -= yrelative*moveby/2;
						allballs[ii].ypos += yrelative*moveby/2;
					}else{
						ball.ypos += yrelative*moveby/2;
						allballs[ii].ypos -= yrelative*moveby/2;
					}
					
					theballxspeedtemp = ball.xspeed;
					theballyspeedtemp = ball.yspeed;
					theballrotationtemp = ball.rotation;
					ball.rotation = -allballs[ii].rotation;
					allballs[ii].rotation = -theballrotationtemp;
					totalmass = allballs[ii].mass + ball.mass;
					relativexspeed = -ball.xspeed + allballs[ii].xspeed;
					relativeyspeed = -ball.yspeed + allballs[ii].yspeed;
					ball.xspeed = ball.xspeed +relativexspeed * allballs[ii].mass/(totalmass/2);// + (allballs[ii].xspeed * ball.mass/totalmass);
					ball.yspeed = ball.yspeed +relativeyspeed * allballs[ii].mass/(totalmass/2);
					allballs[ii].xspeed = allballs[ii].xspeed - relativexspeed * ball.mass/(totalmass/2);
					allballs[ii].yspeed = allballs[ii].yspeed - relativeyspeed * ball.mass/(totalmass/2);
					ball.resting = false;
					allballs[ii].resting = false;
					ball.hasCollided ++;
					allballs[ii].hasCollided ++;
					if(ball.boingFase == 0){
						ball.boingFase = 1;
					}
				}
			}
		}
	}
}

function Ball(radius,color,xpos,ypos,xspeed,yspeed,mass,world,drag,xgravity,ygravity,rotation,angle,types,bounciness){
	this.radius = radius;
	this.color = color;
	this.xpos = xpos;
	this.ypos = ypos;
	this.xspeed = xspeed;
	this.yspeed = yspeed;
	this.mass = mass;
	this.drawBall = drawBall;
	this.moveBall = moveBall;
	this.redirectBall = redirectBall;
	this.world = world;
	this.animate = animate;
	this.resting = false;
	this.hasCollided = 0;
	this.boingProgress = 0;
	this.boingFase = 0;
	this.scalex = 1;
	this.scaley = 1;
	this.drag = drag;
	this.bounciness = bounciness;
	this.types = new Array();
	this.trail = new Trail(this,6,"sparkling");
	this.drawTrail = drawTrail;
	if(isNaN(xgravity) == true){
		this.xgravity = this.world.xgravity;
	}else{
		this.xgravity = xgravity;
	}
	if(isNaN(ygravity) == true){
		this.ygravity = this.world.gravity;
	}else{
		this.ygravity = ygravity;
	}
	this.rotation = rotation;
	this.angle = angle;
	if(types != null){
		for(var i = 0;i < types.length; i++){
			this.types[i] = this.world.types[types[i]];
		}
	}else{
		this.types = Array(0);
	}
	this.destroy = false;
	
	
	
}

function Trail(ball,maxlength,type){
	this.ball = ball;
	this.path = new Array();
	this.maxlength = maxlength;
	this.type = type;
	
}


function drawBall(){
	this.world.ctx.save();
	this.world.ctx.translate(this.xpos,this.ypos);
	
	this.scalex = 1 - (this.boingProgress/100);
	this.scaley = 1 + (this.boingProgress/100);
		
	if(this.boingFase != 0){
		if((this.boingFase == 1)&&(this.boingProgress<25)){
			this.boingProgress+=5;
		}else if(this.boingFase == 1){
			this.boingFase = 2;
			this.boingProgress-=5;
		}
		
		if((this.boingFase == 2)&&(this.boingProgress > -25)){
			this.boingProgress-=5;
		}else if(this.boingFase == 2){
			this.boingFase = 3;
			this.boingProgress +=5;
		}
		
		if((this.boingFase == 3)&&(this.boingProgress < 0)){
			this.boingProgress+=5;
		}else if(this.boingFase == 3){
			this.boingFase = 0;
			this.boingProgress = 0;
		}
	}
	
	this.world.ctx.scale(this.scalex,this.scaley);
	
	//this.world.ctx.scale(1,2);
	this.world.ctx.rotate(this.angle);
	this.world.ctx.beginPath();
	this.world.ctx.arc(0, 0, this.radius, 0, Math.PI*2);
	if(this.types.indexOf(5) != -1){
		this.world.ctx.fillStyle = "rgba(255,255,0,1)";
	}else{
		this.world.ctx.fillStyle = this.color;
	}
	this.world.ctx.fill();
	this.world.ctx.closePath();
	this.world.ctx.save();
	this.world.ctx.beginPath();
	
	this.world.ctx.strokeStyle = "rgba(0,0,0,1)";
	
	this.world.ctx.moveTo(-this.radius,0);
	this.world.ctx.lineTo(this.radius+Math.cos(Math.PI*2/3)*this.radius,-Math.sin(Math.PI*2/3)*this.radius);
	this.world.ctx.lineTo(this.radius+Math.cos(Math.PI*2/3)*this.radius,Math.sin(Math.PI*2/3)*this.radius);
//	this.world.ctx.lineTo(-this.radius*(Math.sin(Math.PI/2)),this.radius*(Math.sin(Math.PI/2)));
	this.world.ctx.fillStyle = "rgba(0,0,0,1)";
	this.world.ctx.fill();
	this.world.ctx.closePath();
	this.world.ctx.restore();
	
	this.world.ctx.restore();
}

function drawTrail(){
	var i = 0;
	this.trail.path.push(new Array(this.xpos,this.ypos));

	if(this.trail.path.length > this.trail.maxlength){
		this.trail.path.shift();
	}
	
	this.world.ctx.save();
	//this.world.ctx.translate(this.xpos,this.ypos);
	
	this.world.ctx.beginPath();
	
	//this.world.ctx.fillStyle = this.color;
	var lineargradient;
	this.world.ctx.lineWidth = this.radius*2-4;
	this.world.ctx.lineJoin = "round";
	this.world.ctx.lineCap = "round";
	//this.world.ctx.globalCompositeOperation = "destination-over";
	this.world.ctx.moveTo(this.trail.path[0][0],this.trail.path[0][1]);
	lineargradient = this.world.ctx.createLinearGradient(this.trail.path[0][0],this.trail.path[0][1],this.trail.path[this.trail.path.length-1][0],this.trail.path[this.trail.path.length-1][1]);
	lineargradient.addColorStop(0,'red');
	lineargradient.addColorStop(0.14,'orange');
	lineargradient.addColorStop(0.28,'yellow');
	lineargradient.addColorStop(0.42,'green');
	lineargradient.addColorStop(0.56,'blue');
	lineargradient.addColorStop(0.70,'indigo');
	lineargradient.addColorStop(1,'violet');
	for (i = 1; i < this.trail.path.length; i++) {
		
		
		this.world.ctx.strokeStyle = lineargradient;
		this.world.ctx.lineTo(this.trail.path[i][0],this.trail.path[i][1]);
		this.world.ctx.stroke();
	}
	
	this.world.ctx.closePath();
	
	this.world.ctx.restore();
}

function moveBall(){
		//Add drag
		if(this.xspeed > 0){
			this.xspeed = this.xspeed-this.drag;
		}else if(this.xspeed < 0){
			this.xspeed = this.xspeed+this.drag;
		}else{
			//this.xspeed = 0;
		}
		if(this.yspeed > 0){
			this.yspeed = this.yspeed-this.drag;
		}else if(this.yspeed < 0){
			this.yspeed = this.yspeed+this.drag;
		}else{
			//this.yspeed = 0;
		}
		if(this.world.walltype == 2){
		//Bounce off walls
		//Right wall
			if(this.xpos+this.radius >= this.world.width){
				if(this.boingFase == 0){
					this.boingFase = 1;
				}
				this.xpos = this.world.width - this.radius;
				if(this.xspeed > 0){
					this.xspeed = -this.xspeed * this.bounciness;
					
				}
				if(this.yspeed > 0){
					this.rotation = -(Math.abs(this.rotation));
				}else{
					this.rotation = Math.abs(this.rotation);
				}
				//Left wall
			}else if(this.xpos-this.radius <= 0){
				if(this.boingFase == 0){
					this.boingFase = 1;
				}
				this.xpos = 0 + this.radius;
				if(this.xspeed < 0){
					this.xspeed = -this.xspeed * this.bounciness;
				}
				if(this.yspeed > 0){
					this.rotation = (Math.abs(this.rotation));
				}else{
					this.rotation = -Math.abs(this.rotation);
				}
			}
			//Bottom
			if(this.ypos+this.radius >= this.world.height){
				if(this.boingFase == 0){
					this.boingFase = 1;
				}
				if(this.yspeed >= (this.world.gravity/25)){
					this.yspeed = -this.yspeed * this.bounciness;
				}else if((this.yspeed > -(this.world.gravity/25)) && (this.yspeed < (this.world.gravity/25))){
					this.yspeed = 0;
					this.resting = true;
				}
				if(this.xspeed < 0){
					this.rotation = -(Math.abs(this.rotation));
				}else{
					this.rotation = Math.abs(this.rotation);
				}
				this.ypos = this.world.height - this.radius;
				//Top
			}else if(this.ypos-this.radius <= 0){
				if(this.boingFase == 0){
					this.boingFase = 1;
				}
				if(this.yspeed < 0){
					this.yspeed = -this.yspeed * this.bounciness;
				}
				this.ypos = 0 + this.radius;
				if(this.xspeed < 0){
					this.rotation = (Math.abs(this.rotation));
				}else{
					this.rotation = -Math.abs(this.rotation);
				}
			}
		}else if(this.world.walltype == 1){
			//right wall
			if(this.xpos+this.radius >= this.world.width){
				this.xpos = 0 + this.radius;
				//this.ypos = this.world.height/2-(this.ypos-this.world.height/2);
				
				//Left wall
			}else if(this.xpos-this.radius <= 0){
				this.xpos = this.world.width - this.radius;
				//this.ypos = this.world.height/2-(this.ypos-this.world.height/2);
				
			}
			//Bottom
			if(this.ypos+this.radius >= this.world.height){
				//this.xpos = this.world.width/2-(this.xpos-this.world.width/2);
				this.ypos = 0 + this.radius;
				//Top
			}else if(this.ypos-this.radius <= 0){
				this.ypos = this.world.height - this.radius;
				//this.xpos = this.world.width/2-(this.xpos-this.world.width/2);
				
			}
		}
		
		//Add gravity:
		if(!this.resting){
			this.yspeed = this.yspeed+(this.ygravity/25);
			this.xspeed = this.xspeed+(this.xgravity/25);
		}
		this.xpos = this.xpos+this.xspeed; 
		this.ypos = this.ypos+this.yspeed;
		if(this.angle > Math.PI*2){
			this.angle = this.angle-Math.PI*2;
		}
		this.angle += this.rotation;
		
}

function attract(ball, allballs,index){
	var attraction_radius = 2000;
	var distance = 0;
	for (var ii = 0; ii < allballs.length; ii++) {
		if((allballs[ii].types.indexOf(7) != -1) && (index != ii)){
		distance = Math.sqrt(Math.pow(ball.xpos-allballs[ii].xpos, 2)+Math.pow(ball.ypos-allballs[ii].ypos, 2));
	
		if(distance < (allballs[ii].radius+ball.radius+attraction_radius)){
			var xrelative = ball.xpos - allballs[ii].xpos;
			var yrelative = ball.ypos - allballs[ii].ypos;
			//var angle =  Math.asin(yrelative/distance);
			
			if(xrelative > 0){
				ball.xspeed = ball.xspeed - xrelative/attraction_radius;
			}else if(xrelative < 0){
				ball.xspeed = ball.xspeed + (-xrelative/attraction_radius);
			}
			if(yrelative > 0){
				ball.yspeed = ball.yspeed - yrelative/attraction_radius;
			}else if(yrelative < 0){
				ball.yspeed = ball.yspeed + (-yrelative/attraction_radius);
			}
		}
	}
	}
}

function animate(){
	this.moveBall();
	//this.world.ctx.clearRect(0,0,this.world.width,this.world.height);
	this.drawTrail();
	this.drawBall();
	
}

function redirectBall(){
	
}

function destroyBall(){
	
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}