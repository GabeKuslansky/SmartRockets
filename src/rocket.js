
function Rocket(x, y, DNA, target, lifespan){

	//Top Left coords
	this.position = new createVector(x, y);
	
	//Dimensions
	this.w = 50;
	this.h = 50;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true, this, this.onCollision);
	this.physics.addColliderBox(0, 0, this.w, this.h);
	
	//If crashed
	this.crashed = false;
	
	//If success
	this.success = false;
	
	this.fitness = 0;
		
	//Index of DNA
	this.currentDNA = 0;
	
	//target
	this.target = target;
	
	//If deleted
	this.deleted = false;
	
	this.DNA = DNA;
	
	this.angle = 0;
	
	//needed for fitness evaluation
	this.lifespan = lifespan;

	//Testing
	//this.physics.velocity = p5.Vector.random2D();
	//this.physics.velocity = createVector(1, 0);
	//this.physics.force(-2, 0);
}

//Draw Rocket
Rocket.prototype.draw = function(){
	
	
	push();
	translate(this.position.x + this.w/2, this.position.y + this.h/2);
	rotate(this.angle);
	rotate(PI/2);
	fill(100, 144, 159);
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
		if(dist(this.position.x + this.w/2, this.position.y + this.h/2, this.target.position.x, this.target.position.y) <= this.target.radius){
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

//Calculate Fitness on distance only
Rocket.prototype.calcFitness = function()
{
	var d = dist(this.position.x+this.w/2, this.position.y+this.h/2, this.target.position.x, this.target.position.y);
	this.fitness = pow(1/d, 2);
};

//Calculate Fitness on ditance and finished/crashed
Rocket.prototype.calcFitness = function()
{
	var d = dist(this.position.x+this.w/2, this.position.y+this.h/2, this.target.position.x, this.target.position.y);
	this.fitness = pow(1/d, 2);
	if(this.crashed){
		this.fitness /= 10;
	}
	if(this.success){
		this.fitness *= 10;
	}
};

//Calculate Fitness on time only
Rocket.prototype.calcFitness = function()
{	
	var low = this.lifespan/4;
	var middle = low + low;
	var mostly = middle + low;
	if(this.crashed){
		this.fitness *= 10;
		if(this.currentDNA > mostly)
		{
			this.fitness *= 2;
		}
	}
	if(this.success){
		this.fitness *= 10;
		if(this.currentDNA < low)
		{
			this.fitness *= 5;
		}
		else if(this.currentDNA < middle)
		{
			this.fitness *= 4;
		}
		else if(this.currentDNA < mostly)
		{
			this.fitness *= 3;
		}
		else
		this.fitness *= 2;
	}
};

//Calculate Fitness on distance and time
Rocket.prototype.calcFitness = function()
{
	var low = this.lifespan/4;
	var middle = low + low;
	var mostly = middle + low;
	var d = dist(this.position.x+this.w/2, this.position.y+this.h/2, this.target.position.x, this.target.position.y);
	this.fitness = pow(1/d, 2);
	if(this.crashed){
		this.fitness /= 10;
	}
	if(this.success){
		this.fitness *= 10;
		if(this.currentDNA < low)
		{
			this.fitness *= 5;
		}
		else if(this.currentDNA < middle)
		{
			this.fitness *= 4;
		}
		else if(this.currentDNA < mostly)
		{
			this.fitness *= 3;
		}
		else
		this.fitness *= 2;
	}
};

//Delete Rocket
Rocket.prototype.deleteRocket = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}
