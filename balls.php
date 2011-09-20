<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head profile="http://purl.org/NET/erdf/profile">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" src="balls.js">
</script>
  
 </head>
 <body>
   <canvas id="canvas" width="2500" height="2000"></canvas>
   <script type="text/javascript">
   var world = new BallWorld(19.14,2,2500,2000);
   var drag = 0.0;
   var ygravity = 0;
   var xgravity = 0;
   
   var balls = new Array(
     new Ball(50,"rgba(255,0,0,0.8)",610,800,13,4,900,world,0,0,ygravity,Math.PI/50,0,new Array("gravitron","rubber","killer"))
     //, new Ball(10,"rgba(0,180,0,0.8)",400,200,-1,1,50,world,drag,0,-9.10,Math.PI/25,Math.PI,"metal")
     //, new Ball(10,"rgba(120,0,0,0.8)",200,200,1,1,50,world,drag,-12,0,-Math.PI/150,0,"metal")
     , new Ball(50,"rgba(0,180,200,0.8)",400,200,-0,0,250,world,drag,xgravity,ygravity,Math.PI/50,0,new Array("rubber"))
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
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,3,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,5,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     , new Ball(10,"rgba(120,0,255,0.8)",290,290,5,18,50,world,drag,xgravity,ygravity,-Math.PI/150,0)
     
     
   );
   
   window.setInterval(function(){world.animator(balls);}, 40);
   
   </script>
 </body>
</html>