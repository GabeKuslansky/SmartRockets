
var population;

let speed = 5;


let width = 600, height = 600;
let angle = 0;
let editor = null;
let obstacles = [];
let deleteQueue = [];
function setup() {
  createCanvas(width, height);
  rectMode(CENTER);
  
  //Create population
  population = new Population(1, 100, width/4, 0);
  population.getIDs();
  
  
  rect1 = new Rectangle(100, 100, 50, 50)
  rect1.setRotation(50);
  rect1.step = 1;
  obstacles.push(rect1);
  
  
  circle1 = new Circle(300, 200, 30);
  circle1.setRotation(0);
  circle1.step = 1;
  obstacles.push(circle1);
  
  
  poly = new Polygon(400, 100, [new SAT.Vector(0, -70), new SAT.Vector(70, 70), new SAT.Vector(-70, 70)]);
  poly.setRotation(0);
  poly.step = 1;
  obstacles.push(poly);
  
  editor = new Editor(width, height);
}

function draw() {

	//Clear
	background(0, 100, 200);

  //Update Input
	population.getRocketByIndex(0).physics.velocity.x = 0;
	population.getRocketByIndex(0).physics.velocity.y = 0;
  if(keyIsDown(87)){
	  population.getRocketByIndex(0).physics.velocity.y -= speed;
  }
  if(keyIsDown(65)){
	  population.getRocketByIndex(0).physics.velocity.x -= speed;
  }
  if(keyIsDown(83)){
	  population.getRocketByIndex(0).physics.velocity.y += speed;
  }
  if(keyIsDown(68)){
	  population.getRocketByIndex(0).physics.velocity.x += speed;
  }
  
  //Update AI
  population.update();
  

  //Render
  population.draw();
  for(let i = 0; i < obstacles.length; i++)
	  obstacles[i].draw();
  push();
  fill(0);
  pop();
  
  editor.update();
  editor.draw();
  
    //Update Physics
  updatePhysics()
  
  //Delete Queue
  for(let i = 0; i < deleteQueue.length; i++){
	  //Delete obstacle
	  deleteQueue[i].deleteObstacle();
  }
  deleteQueue = [];
    
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