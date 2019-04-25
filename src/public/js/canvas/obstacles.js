
let boxScaleX = 1/3;
let boxScaleY = .8;
let boxOffsetX = 0;
let boxOffsetY = 20;

function BoxObstacle(x, y){
	
	this.name = "BoxObstacle";
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderBox(0, 0, BoxObstacle.getWidth(), BoxObstacle.getHeight());
		
}

BoxObstacle.getColor = function(){
	return [145, 156, 1];
}

BoxObstacle.prototype.draw = function(){
	push();
	image(clipSatellite, this.position.x, this.position.y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
	pop();
}

//Delete Obstacle
BoxObstacle.prototype.deleteObstacle = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}

BoxObstacle.drawIcon = function(x, y){
	push()
	var color = BoxObstacle.getColor();
	if(pointInBox(mouseX-cameraPosition.x, mouseY-cameraPosition.y, x+boxOffsetX, y+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY))
		fill(color[0]+50, color[1]+50, color[2]+50);
	else
		fill(...color);
	rect(x+boxOffsetX, y+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY);
	
	pop();
}

BoxObstacle.mouseIntersectsIcon = function(boxPosX, boxPosY){
	return pointInBox(mouseX-cameraPosition.x, mouseY-cameraPosition.y, boxPosX+boxOffsetX, boxPosY+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY);
}

BoxObstacle.getWidth = function(){
	return 300;
}
BoxObstacle.getHeight = function(){
	return 50;
}

//Draw obstacle no reference to class
BoxObstacle.draw = function(x, y){
	push();
	image(clipSatellite, x, y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
	pop();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////


let circleScale = 1/2;
let circleOffsetX = 40;
let circleOffsetY = 30;

function CircleObstacle(x, y){
	
	this.name = "CircleObstacle";
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderCircle(0, 0, CircleObstacle.getRadius());
		
}


CircleObstacle.getColor = function(){
	return [145, 156, 1];
}

CircleObstacle.prototype.draw = function(){
	push();
	imageMode(CENTER);
	image(clipAsteroid, this.position.x, this.position.y, CircleObstacle.getRadius()*2, CircleObstacle.getRadius()*2);
	pop();
}

//Delete Obstacle
CircleObstacle.prototype.deleteObstacle = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}

//Draw icon at x y coord
CircleObstacle.drawIcon = function(x, y){
	push()
	var color = CircleObstacle.getColor();
	if(pointInCircle(mouseX-cameraPosition.x, mouseY-cameraPosition.y, x+circleOffsetX, y+circleOffsetY, CircleObstacle.getRadius()*circleScale))
		fill(color[0]+50, color[1]+50, color[2]+50);
	else
		fill(...color);
	circle(x+circleOffsetX, y+circleOffsetY, CircleObstacle.getRadius()*circleScale);
	pop();
}

CircleObstacle.mouseIntersectsIcon = function(circlePosX, circlePosY){
	return pointInCircle(mouseX-cameraPosition.x, mouseY-cameraPosition.y, circlePosX+circleOffsetX, circlePosY+circleOffsetY, CircleObstacle.getRadius()*circleScale);
}

CircleObstacle.getRadius = function(){
	return 50;
}


//Draw obstacle no reference to class
CircleObstacle.draw = function(x, y){
	push();
	imageMode(CENTER);
	image(clipAsteroid, x, y, CircleObstacle.getRadius()*2,CircleObstacle.getRadius()*2);
	pop();
}


////////////////////////////////////////////////////
//BLACK HOLE


//
let blackHoleScale = 1.5;
let blackHoleOffsetX = 10;
let blackHoleOffsetY = 30;

function BlackHoleObstacle(x, y){
	
	this.name = "BlackHoleObstacle";
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderCircle(0, 0, BlackHoleObstacle.getRadius());
		
}


BlackHoleObstacle.prototype.update = function(){
	let rockets = level.population.rockets;
	for(let i = 0; i < rockets.length; i++){
		if(dist(this.position.x, this.position.y, rockets[i].position.x, rockets[i].position.y) < BlackHoleObstacle.getAttractionRadius()){
			if(rockets[i].physics != null)
				rockets[i].physics.applyForce(createVector(this.position.x - rockets[i].position.x, this.position.y - rockets[i].position.y).normalize().mult(BlackHoleObstacle.getForce())); //apply force inward to circle
		}
	}
}

BlackHoleObstacle.getForce = function(){
	return 1;
}

BlackHoleObstacle.getColor = function(){
	//return image(clipBlack, x, y);
	return [0, 0, 0];
}


BlackHoleObstacle.getOpacity = function(){
	return 150;
}

BlackHoleObstacle.prototype.draw = function(){
	push();
	strokeWeight(0);
	imageMode(CENTER);
	//var color = BlackHoleObstacle.getColor();
	//fill(color[0]+100, color[1]+100, color[2]+100, BlackHoleObstacle.getOpacity());
	image(clipBlack, this.position.x, this.position.y, BlackHoleObstacle.getAttractionRadius()*1.5, BlackHoleObstacle.getAttractionRadius()*1.5);
	//circle(this.position.x, this.position.y, BlackHoleObstacle.getAttractionRadius());
	//fill(color);
	//circle(this.position.x, this.position.y, BlackHoleObstacle.getRadius());
	//image(clipBlack, this.position.x, this.position.y, BlackHoleObstacle.getRadius()*2, BlackHoleObstacle.getRadius()*2);
	
	pop();
}

//Delete Obstacle
BlackHoleObstacle.prototype.deleteObstacle = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}

//Draw icon at x y coord
BlackHoleObstacle.drawIcon = function(x, y){
	push()
	var color = BlackHoleObstacle.getColor();
	if(pointInCircle(mouseX-cameraPosition.x, mouseY-cameraPosition.y, x+blackHoleOffsetX, y+blackHoleOffsetY, BlackHoleObstacle.getRadius()*blackHoleScale)){	
		fill(color[0]+50, color[1]+50, color[2]+50);
		}
	else
		fill(...color);
	circle(x+blackHoleOffsetX, y+blackHoleOffsetY, BlackHoleObstacle.getRadius()*blackHoleScale);
	
	pop();
}

BlackHoleObstacle.mouseIntersectsIcon = function(blackHolePosX, blackHolePosY){
	return pointInCircle(mouseX-cameraPosition.x, mouseY-cameraPosition.y, blackHolePosX+blackHoleOffsetX, blackHolePosY+blackHoleOffsetY, BlackHoleObstacle.getRadius()*blackHoleScale);
}

BlackHoleObstacle.getRadius = function(){
	return 10;
}
BlackHoleObstacle.getAttractionRadius = function(){
	return 100;
}

//Draw obstacle no reference to class
BlackHoleObstacle.draw = function(x, y){
	push();
	imageMode(CENTER);
	//fill(...BlackHoleObstacle.getColor());
	//circle(x, y, BlackHoleObstacle.getRadius());
	image(clipBlack, x, y, BlackHoleObstacle.getAttractionRadius()*1.5, BlackHoleObstacle.getAttractionRadius()*1.5);
	pop();
}










////////MORE OBJECTS


let triangleScale = 2/3;
let triangleOffsetX = 10;
let triangleOffsetY = 30;


function TriangleObstacle(x, y){
	
	this.name = "TriangleObstacle";
	//position at center
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderPolygon(0, 0, [
					new SAT.Vector(0, -TriangleObstacle.getLength()),
					new SAT.Vector(TriangleObstacle.getLength(), TriangleObstacle.getLength()),
					new SAT.Vector(-TriangleObstacle.getLength(), TriangleObstacle.getLength())]);
		
}

TriangleObstacle.getColor = function(){
	return [145, 156, 1];
}

TriangleObstacle.prototype.draw = function(){
	push();
	imageMode(CENTER);
	image(clipSign, x - TriangleObstacle.getLength(), y - TriangleObstacle.getLength(),
		2*TriangleObstacle.getLength(), 2*TriangleObstacle.getLength()
	);
	pop();
}

//Delete Obstacle
TriangleObstacle.prototype.deleteObstacle = function()
{
	//Delete physics object
	if(this.physics != null){
		this.physics.deletePhysics();
		this.physics = null;
	}
}

//Draw icon at x y coord
TriangleObstacle.drawIcon = function(x, y){
	push()
	var color = TriangleObstacle.getColor();
	let poly = new SAT.Polygon(new SAT.Vector(x+triangleOffsetX, y+triangleOffsetY),[
					new SAT.Vector(0, -TriangleObstacle.getLength()*triangleScale),
					new SAT.Vector(TriangleObstacle.getLength()*triangleScale, TriangleObstacle.getLength()*triangleScale),
					new SAT.Vector(-TriangleObstacle.getLength()*triangleScale, TriangleObstacle.getLength()*triangleScale)	
	])
	if(pointInPolygon(mouseX-cameraPosition.x, mouseY-cameraPosition.y, poly))
		fill(color[0]+50, color[1]+50, color[2]+50);
	else
		fill(...color);
	triangle(x+triangleOffsetX, y+triangleOffsetY - TriangleObstacle.getLength()*triangleScale,
			x+triangleOffsetX + TriangleObstacle.getLength()*triangleScale, y+triangleOffsetY + TriangleObstacle.getLength()*triangleScale,
			x+triangleOffsetX - TriangleObstacle.getLength()*triangleScale, y+triangleOffsetY + TriangleObstacle.getLength()*triangleScale
			);
	pop();
}

TriangleObstacle.mouseIntersectsIcon = function(trianglePosX, trianglePosY){
	let poly = new SAT.Polygon(new SAT.Vector(trianglePosX+triangleOffsetX, trianglePosY+triangleOffsetY),[
					new SAT.Vector(0, -TriangleObstacle.getLength()*triangleScale),
					new SAT.Vector(TriangleObstacle.getLength()*triangleScale, TriangleObstacle.getLength()*triangleScale),
					new SAT.Vector(-TriangleObstacle.getLength()*triangleScale, TriangleObstacle.getLength()*triangleScale)	
	])
	return pointInPolygon(mouseX-cameraPosition.x, mouseY-cameraPosition.y, poly)
}

TriangleObstacle.getLength = function(){
	return 20;
}


//Draw obstacle no reference to class
TriangleObstacle.draw = function(x, y){
	push();
	//imageMode(CENTER);
		image(clipSign, x - TriangleObstacle.getLength(), y - TriangleObstacle.getLength(),
		2*TriangleObstacle.getLength(), 2*TriangleObstacle.getLength()
		);
	pop();
}