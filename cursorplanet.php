<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head profile="http://purl.org/NET/erdf/profile">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
canvas{
float:left;
background-color: black;
}
* {cursor: none;}
</style>
<script type="text/javascript" src="cursorplanet.js"></script> 

  
 </head>
 <body onload="">
   <canvas id="canvas" width="800" height="600" ></canvas>
   <script type="text/javascript">
   var solarsystem = new SolarSystem();
   var planets = new Array (new Planet(solarsystem, 15, 200, 10, 0.06,false),
		   					new Planet(solarsystem, 25, 300, 0, -0.02,false),
		   					new Planet(solarsystem, 5, 10, 200, 0.01,false),
		   					new Planet(solarsystem, 20, 45, 90, 0.005,false),
		   					new Planet(solarsystem, 10, 120, 90, -0.01,false),
		   					new Planet(solarsystem, 10, 100, 50, -0.003,false));
   window.setInterval(function(){solarsystem.planetanimator(planets)}, 40);
   
   </script>
   
   </body>
   </html>
   