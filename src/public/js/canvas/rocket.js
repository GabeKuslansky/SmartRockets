function Rocket(x, y, DNA, target){

	//Middle Coords
    this.position = new createVector(x, y);
    this.color = [random(255), random(255), random(255)];
	
	//Dimensions
	this.w = 25;
	this.h = 25;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true, this, this.onCollision);
	this.physics.addColliderBox(-this.w/2, -this.h/2, this.w, this.h);
	
	//If crashed
	this.crashed = false;
	
	//If success
	this.success = false;
	
	//If mating or not. used in population
	this.mating = false;
	
	this.fitness = 0;
		
	//Index of DNA
	this.currentDNA = 0;
	
	//target
	this.target = target;
	
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
	image(clipRocket, -this.h, -this.w, this.h, this.w, this.h);
			
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
		if(dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y) <= this.target.radius){
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

//Collided
Rocket.prototype.onCollision = function(object){
	
	object.crashed = true;
}

//Calculate Fitness
Rocket.prototype.calcFitness = function()
{
	
	//Check if success. Rockets could make it on the last frame
	if(dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y) <= this.target.radius)
		this.success = true;
	
	var d = dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y);

	if(this.success)
		this.fitness = 1/this.target.radius;
	else
		this.fitness = 1/d;
	if(this.crashed)
		this.fitness /= 10;
	
}

//Delete Rocket
Rocket.prototype.deleteRocket = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}
