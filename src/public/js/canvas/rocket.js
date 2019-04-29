dieOnCollision = false;
let currentFitness = 0;
function Rocket(x, y, DNA){

	//Middle Coords
    this.position = new createVector(x, y);
	this.color = [random(255), random(255), random(255)];
	
	this.opacity = 145;
	
	//Dimensions
	this.w = 25;
	this.h = 25;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, createVector(1, 1), true, this, true, this.onCollision);
	this.physics.addColliderBox(0, 0, this.w, this.h);
	
	//If crashed
	this.crashed = false;
	
	//If success
	this.success = false;
	
	this.fitness = 0;
		
	//Index of DNA
	this.currentDNA = 0;
	
	//If deleted
	this.deleted = false;
	
	this.DNA = DNA;
	
	this.angle = 0;
	
	//Testing
	//this.physics.velocity = p5.Vector.random2D();
	//this.physics.velocity = createVector(1, 0);
	//this.physics.force(-2, 0);
}

//Draw Rocket
Rocket.prototype.draw = function(){
	
	push();
	translate(this.position.x, this.position.y);
	rotate(this.angle);
	rotate(PI/2);
	fill(...this.color, this.opacity);
	triangle(0, -this.h/2,
			-this.w/2, this.h/2,
			this.w/2, this.h/2);
			
	pop();
}

//Update Rocket
Rocket.prototype.update = function(){

	//Update crashed
	if(this.crashed == true){
		
		//Delete rocket if not deleted
		if(!this.deleted)
			this.deleteRocket();

	}
	else if(!this.deleted){ //Rocket alive
	
		//Update Logic//
		
		//Check if center of rocket is within radius of target
		if(this.isTouchingTarget()){
			this.success = true;
			this.deleteRocket();
		}
		else{
			//Force
			this.angle = this.physics.velocity.heading();
			this.physics.applyForce(this.DNA.genes[this.currentDNA]);
			this.currentDNA++;
		}
	}
}

Rocket.prototype.isTouchingTarget = function() {
return dist(this.position.x, this.position.y, level.target.position.x, level.target.position.y) <= level.target.radius;
}

//Collided
Rocket.prototype.onCollision = function(object){
	if(dieOnCollision)
		object.crashed = true;
}

//Calculate Fitness
Rocket.prototype.calcFitness = function()
{

	let whichfitness = currentFitness;

	let distance = dist(this.position.x, this.position.y, level.target.position.x, level.target.position.y);
	let time = this.DNA.genes.length-this.currentDNA;
	let distanceFromSpawn = dist(level.spawnCoordinate.position.x, level.spawnCoordinate.position.y, level.target.position.x, level.target.position.y)
	switch(whichfitness){

		//pure distance
		case 0:
			this.fitness = 1/(distance+1);
			break;
		//distance and time //even
		case 1:
			this.fitness = (distanceFromSpawn+this.DNA.genes.length)/(1+distance+time/this.DNA.genes.length);
			break;
		//distance and time //time focus
		case 2:
			this.fitness = (distanceFromSpawn+this.DNA.genes.length)/((1+time)*(1+distance));
			break;

		default:
			throw "No Fitness Type Selected!";
	}
		
	if(this.crashed)
		this.fitness /= 10;
	
}

//Delete Rocket
Rocket.prototype.deleteRocket = function()
{
	/*if (this.isTouchingTarget()) {
		this.onTargetCollision();
	} else {
		this.onObstacleDeathCollision();
	}*/

	//Delete physics object if not deleted
	if(!this.deleted){
		this.physics.deletePhysics();
		this.physics = null;
		this.deleted = true;
	}
}

Rocket.prototype.onTargetCollision = function() {
	this.w *= 1.5
	this.h *= 1.5;
	this.color = [0, 230, 0]
	this.target.color = [255, 211, 0];
	this.opacity = 255;
}

Rocket.prototype.onObstacleDeathCollision = function() {
	this.w /= 3;
	this.h /= 3;
	this.opacity = 0;
}