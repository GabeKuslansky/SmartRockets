var boxScaleX = 1/3;
var boxScaleY = .8;
var boxOffsetX = 0;
var boxOffsetY = 20;

function BoxObstacle(x, y){
	
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderBox(0, 0, BoxObstacle.getWidth(), BoxObstacle.getHeight());
	
}

BoxObstacle.prototype.draw = function(){
	rect(this.position.x, this.position.y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
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

BoxObstacle.drawIcon = function(x, y, useOffset){
	rect(x+boxOffsetX, y+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY);
}

BoxObstacle.mouseIntersectsIcon = function(boxPosX, boxPosY){
	return pointInBox(mouseX, mouseY, boxPosX+boxOffsetX, boxPosY+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY);
}

BoxObstacle.getWidth = function(){
	return 300;
}
BoxObstacle.getHeight = function(){
	return 20;
}

//Draw obstacle no reference to class
BoxObstacle.draw = function(x, y){
	rect(x, y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
}