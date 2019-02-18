
function Rocket(x, y, id, DNA)
{
	this.id = id;

	//Top Left coords
	this.position = new createVector(x, y);
	
	//Dimensions
	this.w = 20;
	this.h = 60;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true);
	this.physics.addColliderBox(0, 0, this.w, this.h);

    //All needed for fitness score
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;

	//Testing
	//this.physics.force(-2, 0);
}

//Get ID
Rocket.prototype.getID = function(){
	return this.id;
};

//Draw Rocket
Rocket.prototype.draw = function(){
    //rect(this.position.x, this.position.y, this.w, this.h);
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rotate(PI / 2);
    fill(this.col, 128);
    triangle(0, -10, -7, 10, 7, 10);
    pop();
};

//Update Rocket
Rocket.prototype.update = function(){
	//Update Movement
	
	
	
	//Update 
	//What I had for updating rocket
    if (target.hit(this.pos)) this.completed = true;
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y > height || obstacle.hit(this.pos)) {
        this.crashed = true;
    }

    if (!this.crashed && !this.completed) {
        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
	
};
