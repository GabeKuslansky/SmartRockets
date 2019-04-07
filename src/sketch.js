
var population;

let speed = 5;

function Rectangle(x, y, w, h){
	this.position = createVector(x, y);
	this.w = w;
	this.h = h;
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderBox(0, 0, w, h);
}
Rectangle.prototype.draw = function(){
	this.rotation += this.step;
	push();
	translate(this.position.x, this.position.y);
	rotate(radians(this.rotation));
	translate(-this.position.x, -this.position.y);
	rect(this.position.x, this.position.y, this.w, this.h);
	pop();
}
Rectangle.prototype.setRotation = function(angle){
	//undo current rotation
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(-this.rotation));
	this.position.add(this.rotationPoint);
	//rotate
	this.rotation = angle;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.rotation));
	this.position.add(this.rotationPoint);
	this.physics.rotate(this.rotation);
}

let width = 600, height = 600;
let angle = 0;
function setup() {
  createCanvas(width, height);
  
  //Create population
  population = new Population(1, 100, width/4, 0);
  population.getIDs();
  
  
  rect1 = new Rectangle(100, 100, 50, 50)
  rect1.setRotation(70);
  //rect1.step = 1;
  
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
  
  //Update Physics
  updatePhysics()
  //Render
  population.draw();
  rect1.setRotation(angle);
  angle++;
  rect1.draw();
  push();
  fill(13, 14, 41);
  //rect(100, 100, 50, 50)
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