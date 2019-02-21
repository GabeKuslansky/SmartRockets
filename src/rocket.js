
function Rocket(position, DNA, id, x, y)
{
    this.position = new createVector(position);
    this.DNA = DNA;
    this.id = id;
    this.col = (random(255), random(255), random(255));
    this.finishTime = 0; //Count how long it takes to reach target
    this.recordDist = 5000;
    this.hitObstacle = false; //Hit an obstacle
    this.hitTarget = false; //Did i reach target?
    this.fitness = 0; //default fitness score for rockets
    this.geneCounter = 0;
    
	//Dimensions
	this.w = 20;
	this.h = 60;
	
	//Physics Colliders
	this.physics = new PhysicsObject(this.position, true);
	this.physics.addColliderBox(0, 0, this.w, this.h);
}

Rocket.prototype.calFitness = function () {
    if (this.recordDist < 1)
        this.recordDist = 1;
    this.fitness = (1 / (this.finishTime * this.recordDist)); //getting closer to target and finishing faster
    this.fitness = pow(this.fitness, 4);
    if (this.hitObstacle)
        this.fitness *= 0.5; // losses 50% fitness for hitting obstacle
    if (this.hitTarget)
        this.fitness *= 2; // double fitness for hitting target
};
//Get ID
Rocket.prototype.getID = function(){
	return this.id;
};

//move rocket
Rocket.prototype.applyForce = function () {
    Physics.applyForce();
}

Rocket.prototype.run = function (ob) {
    if (!this.hitObstacle && !this.hitTarget) {
        PhysicsObject.applyForce(this.DNA.genes[this.geneCounter]);
        this.geneCounter = (this.geneCounter + 1) % this.DNA.genes.length;
        this.update();
        this.obstacle(ob);
    }
    if (!this.hitObstacle) {
        this.display();
    }
};
//Did I make it to the target
Rocket.prototype.checkTarget = function () {
    var d = dist(this.position.x, this.position.y, target.position.x, target.position.y)
    if (d < this.recordDist)
        this.recordDist = d;
    if (target.contains(this.position) && !this.hitTarget) {
        this.hitTarget = true;
    }
    else if (!this.hitTarget) {
        this.finishTime++;
    }
};
//Did I hit something
Rocket.prototype.obstacles = function (ob) {
    for (var i = 0; i < ob.length; i++) {
        var obs = ob[i]
        if (obs.contains(this.position)) {
            this.hitObstacle = true;
        }
    }
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
Rocket.prototype.update = function () {
    //Update Movement
    //Update 
    if (this.hitObstacle)
        return;
    updatePhysics();
    /*
     this.velocity.add(this.acceleration);
     this.position.add(this.velocity);
     this.acceleration.mult(0);
     */
};
//Get Fitness score	
Rocket.prototype.getFitness = function () {
    return this.fitness;
};
//Get DNA
Rocket.prototype.getDNA = function () {
    return this.dna;
};

Rocket.prototype.stopped = function () {
    return this.hitObstacle;
};
//On hit
Rocket.prototype.hitObstacle = function () {
    this.hitObstacle = true;
    this.physics.velocity.x = 0;
    this.physics.velocity.y = 0;
};
