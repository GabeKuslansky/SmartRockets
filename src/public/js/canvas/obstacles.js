function Rectangle(x, y, w, h){
	this.type = "Rectangle";
	this.position = createVector(x, y); //center
	if(!h){
		this.w = Rectangle.defaultDimensions.w;
		this.h = Rectangle.defaultDimensions.h;
	}
	else{
		this.w = w;
		this.h = h;
	}
	this.scale = createVector(1, 1);

	this.startPosition = createVector(x, y);
	this.startForce = createVector(0, 0);

	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(0, 0);
	this.physics = new PhysicsObject(this.position, this.scale, false, this, true);
	this.physics.addColliderBox(0, 0, this.w, this.h);
}

Rectangle.prototype.update = function(){
	this.rotation += this.step;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.step));
	this.position.add(this.rotationPoint);	
	this.physics.rotate(this.rotation);
}
Rectangle.prototype.draw = function(x, y){
	push();
	if(!x){
		translate(this.position.x, this.position.y);
		rotate(radians(this.rotation));
		translate(-this.position.x, -this.position.y);
		imageMode(CENTER);
		image(clipSatellite, this.position.x, this.position.y, this.w*this.scale.x, this.h*this.scale.y*1.5);
		
		rect(this.position.x, this.position.y, this.w*this.scale.x, this.h*this.scale.y);
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		imageMode(CENTER);
		image(clipSatellite, x, y, this.w*this.scale.x, this.h*this.scale.y*1.5);
		
		rect(x, y, this.w*this.scale.x, this.h*this.scale.y);	
	}
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
}
//Delete
Rectangle.prototype.deleteObstacle = function(){
	//Delete physics
	this.physics.deletePhysics();
	//Remove from obstacles
	let deleted = false;
	for(let i = 0; i < level.obstacles.length && !deleted; i++){
			if(this == level.obstacles[i]){
				level.obstacles.splice(i, 1);
				deleted = true;
			}
	}
}
//Start
Rectangle.prototype.start = function(){
	this.physics.applyForce(this.startForce);
}
//Reset
Rectangle.prototype.reset = function(){
	this.position.x = this.startPosition.x;
	this.position.y = this.startPosition.y;
	this.physics.velocity.x = 0;
	this.physics.velocity.y = 0;
	this.physics.acceleration.x = 0;
	this.physics.acceleration.y = 0;
	this.rotation = 0;
}
Rectangle.defaultDimensions = {w:80, h:60};

//Where xy is the cneter
Rectangle.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.fill(255, 255, 255, 100);
	pg.imageMode(CENTER);
	pg.rectMode(CENTER);
	pg.image(clipSatellite, x, y, Rectangle.defaultDimensions.w, Rectangle.defaultDimensions.h*1.5);
	
	pg.rect(x, y, Rectangle.defaultDimensions.w, Rectangle.defaultDimensions.h);
	pg.pop();
}
//Draw with default values
Rectangle.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipSatellite, x, y, Rectangle.defaultDimensions.w, Rectangle.defaultDimensions.h*1.5);
	
	rectMode(CENTER);
	rect(x, y, Rectangle.defaultDimensions.w, Rectangle.defaultDimensions.h);
	pop();
}


//DEFINE CLOCKWISE
function Polygon(centerx, centery, points){
	this.type = "Polygon";
	this.position = createVector(centerx, centery); //center
	if(!points){
		this.points = [];
		for(let i = 0; i < Polygon.defaultPoints.length; i++)
			this.points.push(new SAT.Vector(Polygon.defaultPoints[i].x, Polygon.defaultPoints[i].y));
	}
	else
		this.points = points;

	this.startPosition = createVector(centerx, centery);
	this.startForce = createVector(0, 0);

	this.scale = createVector(1, 1);
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(0, 0);
	this.physics = new PhysicsObject(this.position, this.scale, false, this, true);
	this.physics.addColliderPolygon(0, 0, this.points);
}
Polygon.prototype.update = function(){
	this.rotation += this.step;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.step));
	this.position.add(this.rotationPoint);	
	this.physics.rotate(this.rotation);
}
Polygon.prototype.draw = function(x, y){
	push();
	if(!x){
		translate(this.position.x, this.position.y);
		rotate(radians(this.rotation));
		translate(-this.position.x, -this.position.y);
		beginShape();
		for(let i = 0; i < this.points.length; i++)
			vertex(this.points[i].x*this.scale.x + this.position.x, this.points[i].y*this.scale.y + this.position.y);
		endShape(CLOSE);
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		beginShape();
		for(let i = 0; i < this.points.length; i++)
			vertex(this.points[i].x*this.scale.x + x, this.points[i].y*this.scale.y + y);
		endShape(CLOSE);
	}
	pop();
}
Polygon.prototype.setRotation = function(angle){
	//undo current rotation
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(-this.rotation));
	this.position.add(this.rotationPoint);
	//rotate
	this.rotation = angle;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.rotation));
	this.position.add(this.rotationPoint);
}
//Delete
Polygon.prototype.deleteObstacle = function(){
	//Delete physics
	this.physics.deletePhysics();
	//Remove from obstacles
	let deleted = false;
	for(let i = 0; i < level.obstacles.length && !deleted; i++){
			if(this == level.obstacles[i]){
				level.obstacles.splice(i, 1);
				deleted = true;
			}
	}
}
//Start
Polygon.prototype.start = function(){
	this.physics.applyForce(this.startForce);
}
//Reset
Polygon.prototype.reset = function(){
	this.position.x = this.startPosition.x;
	this.position.y = this.startPosition.y;
	this.physics.velocity.x = 0;
	this.physics.velocity.y = 0;
	this.physics.acceleration.x = 0;
	this.physics.acceleration.y = 0;
	this.rotation = 0;
}
Polygon.defaultPoints = [new SAT.Vector(0, -70), new SAT.Vector(70, 70), new SAT.Vector(-70, 70)];
//Where xy is the center
Polygon.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.fill(255, 255, 255, 100);

	pg.beginShape();
	for(let i = 0; i < Polygon.defaultPoints.length; i++)
		pg.vertex(Polygon.defaultPoints[i].x/3 + x, Polygon.defaultPoints[i].y/3 + y);
	pg.endShape(CLOSE);
	pg.pop();
}
//Draw with default values
Polygon.draw = function(x, y){
	push();
	beginShape();
	for(let i = 0; i <Polygon.defaultPoints.length; i++)
		vertex(Polygon.defaultPoints[i].x + x, Polygon.defaultPoints[i].y + y);
	endShape(CLOSE);
	pop();
}





function Circle(x, y, r){
	this.type = "Circle";
	this.position = createVector(x, y);
	if(!r)
		this.r = Circle.defaultRadius;
	else
		this.r = r;

	this.startPosition = createVector(x, y);
	this.startForce = createVector(0, 0);

	this.scale = createVector(1, 1);
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(0, 0);
	this.physics = new PhysicsObject(this.position, this.scale, false, this, true);
	this.physics.addColliderCircle(0, 0, this.r);
}
Circle.prototype.update = function(){
	this.rotation += this.step;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.step));
	this.position.add(this.rotationPoint);	
}
Circle.prototype.draw = function(x, y){
	push();
	if(!x){
		translate(this.position.x, this.position.y);
		rotate(radians(this.rotation));
		translate(-this.position.x, -this.position.y);
		imageMode(CENTER);
		image(clipAsteroid, this.position.x, this.position.y, this.r*this.scale.x*2.7, this.r*this.scale.y*2.7);
		fill(255,255,255,100);
		circle(this.position.x, this.position.y, this.r*this.scale.x);
		
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		imageMode(CENTER);
		image(clipAsteroid, x, y, this.r*this.scale.x*2.7, this.r*this.scale.y*2.7);
		fill(255,255,255,100);
		circle(x, y, this.r*this.scale.x);
		
	}
	pop();
}
Circle.prototype.setRotation = function(angle){
	//undo current rotation
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(-this.rotation));
	this.position.add(this.rotationPoint);
	//rotate
	this.rotation = angle;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.rotation));
	this.position.add(this.rotationPoint);
}
//Delete
Circle.prototype.deleteObstacle = function(){
	//Delete physics
	this.physics.deletePhysics();
	//Remove from obstacles
	let deleted = false;
	for(let i = 0; i < level.obstacles.length && !deleted; i++){
			if(this == level.obstacles[i]){
				level.obstacles.splice(i, 1);
				deleted = true;
			}
	}
}
//Start
Circle.prototype.start = function(){
	this.physics.applyForce(this.startForce);
}
//Reset
Circle.prototype.reset = function(){
	this.position.x = this.startPosition.x;
	this.position.y = this.startPosition.y;
	this.physics.velocity.x = 0;
	this.physics.velocity.y = 0;
	this.physics.acceleration.x = 0;
	this.physics.acceleration.y = 0;
	this.rotation = 0;
}
Circle.defaultRadius = 40;

//Where xy is the cneter
Circle.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.fill(255, 255, 255, 100);
	pg.imageMode(CENTER);
	pg.image(clipAsteroid, x, y, Circle.defaultRadius*2.7, Circle.defaultRadius*2.7);
	pg.rectMode(CENTER);
	pg.circle(x, y, Circle.defaultRadius);
	pg.pop();
}
//Draw with default values
Circle.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipAsteroid, x, y, Circle.defaultRadius*2.7, Circle.defaultRadius*2.7);
	circle(x, y, Circle.defaultRadius);
	pop();
}




//Black Hole
function BlackHole(x, y, innerR, outerR){
	this.type = "BlackHole";
	this.position = createVector(x, y);
	if(!innerR){
		this.innerR = BlackHole.defaultInnerRadius;
		this.outerR = BlackHole.defaultOuterRadius;
	}
	else{
		this.innerR = innerR;
		this.outerR = outerR;
	}

	this.startPosition = createVector(x, y);
	this.startForce = createVector(0, 0);

	this.scale = createVector(1, 1);
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(0, 0);
	this.physics = new PhysicsObject(this.position, createVector(1, 1), false, this, false);
	this.physics.addColliderCircle(0, 0, this.innerR);
}
BlackHole.prototype.update = function(){
	this.rotation += this.step;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.step));
	this.position.add(this.rotationPoint);	

	let rockets = level.population.rockets;
	for(let i = 0; i < rockets.length; i++){
		if(dist(this.position.x, this.position.y, rockets[i].position.x, rockets[i].position.y) < this.outerR*this.scale.x){
			if(rockets[i].physics != null)
				rockets[i].physics.applyForce(createVector(this.position.x - rockets[i].position.x, this.position.y - rockets[i].position.y).normalize().mult(BlackHole.force)); //apply force inward to circle
		}
	}
}
BlackHole.prototype.draw = function(x, y){
	push();
	if(!x){
		translate(this.position.x, this.position.y);
		rotate(radians(this.rotation));
		translate(-this.position.x, -this.position.y);
		push();
		imageMode(CENTER);
		image(clipBlack, this.position.x, this.position.y, this.outerR*this.scale.x*2, this.outerR*scale.y*2);
		fill(0, 0, 0, 100);
		circle(this.position.x, this.position.y, this.outerR*this.scale.x);
		fill(0, 0, 0, 200);
		circle(this.position.x, this.position.y, this.innerR);
		pop();
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		push();
		imageMode(CENTER);
		image(clipBlack, this.position.x, this.position.y, this.outerR*this.scale.x*2, this.outerR*scale.y*2);
		fill(0, 0, 0, 100);
		circle(x, y, this.outerR*this.scale.x);
		fill(0, 0, 0, 200);
		circle(x, y, this.innerR);
		pop();

	}
	pop();
}
BlackHole.prototype.setRotation = function(angle){
	//undo current rotation
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(-this.rotation));
	this.position.add(this.rotationPoint);
	//rotate
	this.rotation = angle;
	this.position.sub(this.rotationPoint);
	this.position.rotate(radians(this.rotation));
	this.position.add(this.rotationPoint);
}
//Delete
BlackHole.prototype.deleteObstacle = function(){
	//Delete physics
	this.physics.deletePhysics();
	//Remove from obstacles
	let deleted = false;
	for(let i = 0; i < level.obstacles.length && !deleted; i++){
			if(this == level.obstacles[i]){
				level.obstacles.splice(i, 1);
				deleted = true;
			}
	}
}
//Start
BlackHole.prototype.start = function(){
	this.physics.applyForce(this.startForce);
}
//Reset
BlackHole.prototype.reset = function(){
	this.position.x = this.startPosition.x;
	this.position.y = this.startPosition.y;
	this.physics.velocity.x = 0;
	this.physics.velocity.y = 0;
	this.physics.acceleration.x = 0;
	this.physics.acceleration.y = 0;
	this.rotation = 0;
}
BlackHole.defaultInnerRadius = 10;
BlackHole.defaultOuterRadius = 60;
BlackHole.force = 1.5;

//Where xy is the cneter
BlackHole.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.imageMode(CENTER);
	pg.image(clipBlack, x, y, BlackHole.defaultOuterRadius*2, BlackHole.defaultOuterRadius*2);
	pg.fill(0, 0, 0, 100);
	pg.circle(x, y, BlackHole.defaultOuterRadius);
	pg.fill(0, 0, 0, 200);
	pg.circle(x, y, BlackHole.defaultInnerRadius);
	pg.pop();
}
//Draw with default values
BlackHole.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipBlack, x, y, BlackHole.defaultOuterRadius*2, BlackHole.defaultOuterRadius*2);
	fill(0, 0, 0, 100);
	circle(x, y, BlackHole.defaultOuterRadius);
	fill(0, 0, 0, 200);
	circle(x, y, BlackHole.defaultInnerRadius);
	pop();
}