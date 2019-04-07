
var population;

let speed = 5;

function Rectangle(x, y, w, h){
	this.position = createVector(x, y);
	this.initialPosition = createVector(x, y);
	this.w = w;
	this.h = h;
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderBox(0, 0, w, h);
}
Rectangle.prototype.draw = function(){
	rect(this.position.x, this.position.y, this.w, this.h);
}

let width = 600, height = 600;
let rectangle;
function setup() {
  createCanvas(width, height);
  
  //Create population
  population = new Population(1, 100, width/4, 0);
  population.getIDs();
  
  
  rect1 = new Rectangle(100, 100, 50, 50)
  
}
let angle = 0;
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
  
  //Update Physics
  updatePhysics()
  
  //Render
  population.draw();
  angle = angle + 1;
  
  push();
  translate(rect1.position.x+rect1.w/2, rect1.position.y+rect1.h/2);
  rect1.physics.rotate(angle, createVector(rect1.initialPosition.x+rect1.w/2, rect1.initialPosition.y+rect1.h/2));
  rotate(radians(angle));
  translate(-rect1.position.x-rect1.w/2, -rect1.position.y-rect1.h/2);
  rect1.draw();
  pop();
  
  //console.log(pop.getRocketByIndex(0).physics.velocity);
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