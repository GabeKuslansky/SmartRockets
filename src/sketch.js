
var population;

let width = 600, height = 600;

var arrayOfObjects = []

var canvas;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized(){
	centerCanvas();
}

function setup() {
  canvas = createCanvas(width, height);
  centerCanvas();
  //Create population
  population = new Population(50, 150, width/2, height-100);
  arrayOfObjects.push(new BoxObstacle(150, 250));
  editor = new LevelEditorContainer(width, height);
  
}

function draw() {

	//Clear
	background(204, 198, 198);

	//Stroke weight
	strokeWeight(5);
  //Update Input
  editor.update();
  
  //Update AI
  population.update();
  
  //Update Physics
  updatePhysics()
  
  //Render
  population.draw();
  for(var i = 0; i < arrayOfObjects.length; i++)
	  arrayOfObjects[i].draw();
  editor.draw();
  //console.log(pop.getRocketByIndex(0).physics.velocity);
}

function mousePressed(){
	
	editor.mousePressed();
}

function mouseReleased(){
	editor.mouseReleased();
}
/*
function keyReleased(){

	//w
	if(keyCode == 87){
		pop.getRocketByIndex(0).physics.applyForce(0, speed);
	}
	//a
	else if(keyCode == 65){
		pop.getRocketByIndex(0).physics.applyForce(speed, 0);
	}
	//s
	else if(keyCode == 83){
		pop.getRocketByIndex(0).physics.applyForce(0, -speed);
	}
	//d
	else if(keyCode == 68){
		pop.getRocketByIndex(0).physics.applyForce(-speed, 0);
	}
	
}

function keyPressed(){
		
	//w
	if(keyCode == 87){
		pop.getRocketByIndex(0).physics.applyForce(0, -speed);
	}
	//a
	else if(keyCode == 65){
		pop.getRocketByIndex(0).physics.applyForce(-speed, 0);
	}
	//s
	else if(keyCode == 83){
		pop.getRocketByIndex(0).physics.applyForce(0, speed);
	}
	//d
	else if(keyCode == 68){
		pop.getRocketByIndex(0).physics.applyForce(speed, 0);
	}
}*/