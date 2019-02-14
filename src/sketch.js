
var pop;

let speed = 10;

let width = 600, height = 600;
function setup() {
  createCanvas(width, height);
  
  //Create population
  pop = new Population(1, 100, width/4, 0);
  pop.getIDs();
  
  phys = new PhysicsObject(createVector(width/2, 40), false)
  phys.addColliderBox(0, 0, 55, 55);
}

function draw() {

	//Clear
	background(0, 100, 200);

  //Update Input
	pop.getRocketByIndex(0).physics.velocity.x = 0;
	pop.getRocketByIndex(0).physics.velocity.y = 0;
  if(keyIsDown(87)){
	  pop.getRocketByIndex(0).physics.velocity.y -= speed;
  }
  if(keyIsDown(65)){
	  pop.getRocketByIndex(0).physics.velocity.x -= speed;
  }
  if(keyIsDown(83)){
	  pop.getRocketByIndex(0).physics.velocity.y += speed;
  }
  if(keyIsDown(68)){
	  pop.getRocketByIndex(0).physics.velocity.x += speed;
  }
  
  //Update AI
  pop.update();
  
  //Update Physics
  updatePhysics()
  
  //Render
  pop.draw();
  rect(width/2, 40, 55, 55);
  
  
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