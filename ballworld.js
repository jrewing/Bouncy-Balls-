/**
 * 
 * @param gravity
 * @param xgravity
 * @param width
 * @param height
 * @returns
 */

function BallWorld(gravity,xgravity,width,height){
	var ctx = document.getElementById('canvas').getContext('2d');
	var canvas = document.getElementById("canvas");
	canvas.onmousedown = mdown;
	canvas.onmouseup = mup;
	
	//ctx.save();
	this.maxspeed = 25;
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
	this.types["trail"] = 9;
	this.width = width;
	this.height = height;
	this.animator = animator;
	this.ctx = ctx;
	this.ctx.clearRect(0,0,this.width,this.height);
	this.walltype = 2; /**1 = endless, 2 = solid*/
}