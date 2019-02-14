
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
}

//Get ID
Rocket.prototype.getID = () => this.id;

//Draw Rocket
Rocket.prototype.draw = function(){
	rect(this.position.x, this.position.y, this.w, this.h);
};

//Update Rocket
Rocket.prototype.update = function(){
	this.enableInput();
};


Rocket.prototype.enableInput = () => {
	const speed = 10;

	pop.getRocketByIndex(0).physics.velocity.x = 0;
	pop.getRocketByIndex(0).physics.velocity.y = 0;
	if (keyIsDown(87)) {
		pop.getRocketByIndex(0).physics.velocity.y -= speed;
	}
	if (keyIsDown(65)) {
		pop.getRocketByIndex(0).physics.velocity.x -= speed;
	}
	if (keyIsDown(83)) {
		pop.getRocketByIndex(0).physics.velocity.y += speed;
	}
	if (keyIsDown(68)) {
		pop.getRocketByIndex(0).physics.velocity.x += speed;
	}
}
