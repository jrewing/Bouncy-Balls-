

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