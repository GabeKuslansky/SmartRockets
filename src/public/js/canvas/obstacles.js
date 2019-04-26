function Rectangle(x, y, w, h){
	this.type = Rectangle;
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

	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(x, y);
	this.physics = new PhysicsObject(this.position, this.scale, false, this);
	this.physics.addColliderBox(0, 0, this.w, this.h);
	this.doDelete = false;
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
		image(clipSatellite, this.position.x, this.position.y, this.w*this.scale.x, this.h*this.scale.y);
		//rect(this.position.x, this.position.y, this.w*this.scale.x, this.h*this.scale.y);
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		imageMode(CENTER);
		image(clipSatellite, x, y, this.w*this.scale.x, this.h*this.scale.y);
		//rect(x, y, this.w*this.scale.x, this.h*this.scale.y);	
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
Rectangle.defaultDimensions = {w:110, h:110};

//Where xy is the cneter
Rectangle.drawToGraphics = function(pg, x, y){
	pg.push();
	//pg.fill(255, 255, 255, 100);
	pg.imageMode(CENTER);
	//pg.rectMode(CENTER);
	pg.image(clipSatellite, x, y, Rectangle.defaultDimensions.w/1.5, Rectangle.defaultDimensions.h/1.5);
	
	//pg.rect(x, y, Rectangle.defaultDimensions.w/1.5, Rectangle.defaultDimensions.h/1.5);
	pg.pop();
}
//Draw with default values
Rectangle.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipSatellite, x, y, Rectangle.defaultDimensions.w/1.5, Rectangle.defaultDimensions.h/1.5);
	//rectMode(CENTER);
	//rect(x, y, Rectangle.defaultDimensions.w, Rectangle.defaultDimensions.h);
	pop();
}


//DEFINE CLOCKWISE
function Polygon(centerx, centery, points){
	this.type = Polygon;
	this.position = createVector(centerx, centery); //center
	if(!points){
		this.points = [];
		for(let i = 0; i < Polygon.defaultPoints.length; i++)
			this.points.push(new SAT.Vector(Polygon.defaultPoints[i].x, Polygon.defaultPoints[i].y));
	}
	else
	this.points = points;
	this.scale = createVector(1, 1);
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(centerx+50, centery+40);
	this.physics = new PhysicsObject(this.position, this.scale, false, this);
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
Polygon.defaultPoints = [new SAT.Vector(0, -70), new SAT.Vector(70, 70), new SAT.Vector(-70, 70)];
//Where xy is the cneter
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
	this.type = Circle;
	this.position = createVector(x, y);
	if(!r)
		this.r = Circle.defaultRadius;
	else
		this.r = r;
	this.scale = createVector(1, 1);
	this.rotation = 0; //degrees
	this.step = 0;
	this.rotationPoint = createVector(200, 200);
	this.physics = new PhysicsObject(this.position, this.scale, false, this);
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
		image(clipAsteroid, this.position.x, this.position.y, this.r*this.scale.x, this.r*this.scale.x);
		//circle(this.position.x, this.position.y, this.r*this.scale.x);
		
	}
	else{
		translate(x, y);
		rotate(radians(this.rotation));
		translate(-x, -y);
		imageMode(CENTER);
		image(clipAsteroid, x, y, this.r*this.scale.x, this.r*this.scale.x);
		//circle(x, y, this.r*this.scale.x);
		
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
Circle.defaultRadius = 70;

//Where xy is the cneter
Circle.drawToGraphics = function(pg, x, y){
	pg.push();
	//pg.fill(255, 255, 255, 100);
	pg.imageMode(CENTER);
	pg.image(clipAsteroid, x, y, Circle.defaultRadius, Circle.defaultRadius);
	//pg.rectMode(CENTER);
	//pg.circle(x, y, Circle.defaultRadius/1.2);
	pg.pop();
}
//Draw with default values
Circle.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipAsteroid, x, y, Circle.defaultRadius, Circle.defaultRadius);
	//circle(x, y, Circle.defaultRadius);
	pop();
}
