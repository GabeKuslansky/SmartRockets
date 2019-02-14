
function Rocket(x, y, id){
	this.id = id;

	//Top Left coords
	this.position = new createVector(x, y);
	
	//Dimensions
	this.w = 20;
	this.h = 60;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true);
	this.physics.addColliderBox(0, 0, this.w, this.h);
	
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
