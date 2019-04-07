
function Rocket(x, y, id, DNA){
	this.id = id;

	//Top Left coords
	this.position = new createVector(x, y);
	
	//Dimensions
	this.w = 20;
	this.h = 60;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true, this.onCollision);
	this.physics.addColliderBox(-this.w/2, -this.h/2, this.w, this.h);
	
	this.crashed = false;
	
	
	//Testing
	//this.physics.force(-2, 0);
}

//Get ID
Rocket.prototype.getID = function(){
	return this.id;
};

//Draw Rocket
Rocket.prototype.draw = function(){
	rect(this.position.x, this.position.y, this.w, this.h);
};

//Update Rocket
Rocket.prototype.update = function(){
	//Update Movement
	
	
	
	//Update 
	
	
	
};
//Collided
Rocket.prototype.onCollision = function(){
	console.log("callback");
}
