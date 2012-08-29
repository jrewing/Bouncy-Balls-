<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head profile="http://purl.org/NET/erdf/profile">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
canvas{
float:left;
}
#generator{
float:left;
width: 12%;
}
</style>
<script type="text/javascript" src="balls.js">
</script>
  
 </head>
 <body>
   <canvas id="canvas" width="1600" height="800" ></canvas>
   <script type="text/javascript">
   var world = new BallWorld(19.14,2,1600,800);
   var drag = 0.0;
   var ygravity = 0;
   var xgravity = 0;
   
   var balls = new Array(
 //    new Ball(50,"rgba(255,0,0,0.8)",610,800,13,4,900,world,0,0,ygravity,Math.PI/50,0,new Array("gravitron","rubber","killer"))
     //, new Ball(10,"rgba(0,180,0,0.8)",400,200,-1,1,50,world,drag,0,-9.10,Math.PI/25,Math.PI,"metal")
     //, new Ball(10,"rgba(120,0,0,0.8)",200,200,1,1,50,world,drag,-12,0,-Math.PI/150,0,"metal")
     /*, new Ball(50,"rgba(0,180,200,0.8)",400,200,-0,0,250,world,drag,xgravity,ygravity,Math.PI/50,0,new Array("rubber"))
     , new Ball(10,"rgba(120,0,0,0.8)",200,200,10,0,50,world,drag,xgravity,ygravity,-Math.PI/5,0,new Array("metal"))
     , new Ball(10,"rgba(10,180,0,0.8)",400,400,5,6,50,world,drag,xgravity,ygravity,Math.PI/25,0,new Array("metal","fire"))
     , new Ball(10,"rgba(120,0,0,0.8)",200,200,5,6,50,world,drag,xgravity,0,-Math.PI/150,0,new Array("metal"))
    , new Ball(10,"rgba(0,180,200,0.8)",400,200,5,6,50,world,drag,xgravity,ygravity,Math.PI/50,0,new Array("metal"))
    , new Ball(10,"rgba(120,0,0,0.8)",200,200,1,-2,50,world,drag,xgravity,ygravity,-Math.PI/5,0,new Array("metal"))
     , new Ball(10,"rgba(10,180,0,0.8)",400,400,5,6,50,world,drag,xgravity,ygravity,Math.PI/25,0,"metal")
     , new Ball(10,"rgba(120,0,0,0.8)",220,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"fire")
     , new Ball(10,"rgba(120,0,0,0.8)",230,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(10,"rgba(120,0,0,0.8)",240,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(10,"rgba(120,0,0,0.8)",250,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(10,"rgba(120,0,0,0.8)",260,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(10,"rgba(120,0,0,0.8)",270,200,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(60,"rgba(120,0,0,0.8)",280,200,1,1,10000,world,drag,xgravity,ygravity,-Math.PI/150,0,"metal")
     , new Ball(10,"rgba(0,255,0,0.8)",490,290,1,1,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"")
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,8,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"gravitron")
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,10,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,2,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,15,3,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,51,3,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,3,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,3,50,world,drag,xgravity,ygravity,-Math.PI/150,0)*/
  //    new Ball(10,"rgba(120,0,255,0.8)",290,290,5,5,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"",1) 
  //   , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,18,50,world,drag,xgravity,ygravity,-Math.PI/150,0,"",1)
     
     
   );
   
   window.setInterval(function(){world.animator(balls);}, 40);

   function newBall(form){
	   var radius = +form.radius.value;
		var color = form.color.value;
		var xpos = +form.xpos.value;
		var ypos = +form.ypos.value;
		var xspeed = +form.xspeed.value;
		var yspeed = +form.yspeed.value;
		var xgravity = +form.xgravity.value;
		var ygravity = +form.ygravity.value;
		var mass = +form.mass.value;
		var drag = +form.drag.value; 
		var spin = +form.spin.value;
		var angle = +form.angle.value;
		var types = form.types;
		var bounciness = +form.bounciness.value;
	   balls.push(new Ball(radius,color,xpos,ypos,xspeed,yspeed,mass,world,drag,xgravity,ygravity,spin,angle,types,bounciness));
		
	}
   </script>
   
   <div id="generator">
   <form name="new_ball" id="new_ball" action="#">
   <legend for="radius">Radius</legend>
   	<input id="radius" type="text" value="10"  ></input>
   	<legend for="color">Color</legend>
   	<input id="color" type="text" value="rgba(120,0,255,0.8)" ></input>
   	<legend for="xpos">XPos</legend>
   	<input id="xpos" type="text" value="50" ></input>
   	<legend for="ypos">YPos</legend>
   	<input id="ypos" type="text" value="50" ></input>
   	<legend for="xspeed">XSpeed</legend>
   	<input id="xspeed" type="text" value="10" ></input>
   	<legend for="yspeed">YSpeed</legend>
   	<input id="yspeed" type="text" value="10" ></input>
   	<legend for="mass">Mass</legend>
   	<input id="mass" type="text" value="1" ></input>
   	<legend for="drag">Drag</legend>
   	<input id="drag" type="text" value="1"  ></input>
   	<legend for="xgravity">XGravity</legend>
   	<input id="xgravity" type="text" value="1"  ></input>
   	<legend for="ygravity">YGravity</legend>
   	<input id="ygravity" type="text" value="1"  ></input>
   	<legend for="spin">Spin</legend>
   	<input id="spin" type="text" value="0.1"  ></input>
   	<legend for="angle">Angle</legend>
   	<input id="angle" type="text" value="0.1"  ></input>
   	<legend for="types">Types</legend>
   	<input type="checkbox" name="types" value="metal">Metal</input>
   	<input type="checkbox" name="types" value="killer">Killer</input>
   	<input type="checkbox" name="types" value="gravitron">Gravitron</input>
   	<input type="checkbox" name="types" value="deflectron">Deflectron</input>
   	<input type="checkbox" name="types" value="glass">Glass</input>
   	<input type="checkbox" name="types" value="tail">Tail</input>
   	<legend for="bounciness">Bounciness</legend>
   	<input id="bounciness" type="text" value="1" />
   	<input type="button" id="new_ball" onclick="newBall(this.form)" value="New Ball"></input>
   </form>
   <script>document.getElementById("drag").value = drag;</script>
   <script>document.getElementById("xgravity").value = xgravity;</script>
   <script>document.getElementById("ygravity").value = ygravity;</script>
   </div>
   <div id="output" style="background-color: yellow; height: 100px; width:100px;"></div>
 </body>
</html>