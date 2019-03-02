
var boxScaleX = 1/3;
var boxScaleY = .8;
var boxOffsetX = 0;
var boxOffsetY = 20;

function BoxObstacle(x, y){
	
	this.position = createVector(x, y);
	this.physics = new PhysicsObject(this.position, false);
	this.physics.addColliderBox(0, 0, BoxObstacle.getWidth(), BoxObstacle.getHeight());
		
}

BoxObstacle.getColor = function(){
	return [145, 156, 1];
}

BoxObstacle.prototype.draw = function(){
	push();
	fill(...BoxObstacle.getColor());
	rect(this.position.x, this.position.y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
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
	if(pointInBox(mouseX, mouseY, x+boxOffsetX, y+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY))
		fill(color[0]+50, color[1]+50, color[2]+50);
	else
		fill(...color);
	rect(x+boxOffsetX, y+boxOffsetY, BoxObstacle.getWidth()*boxScaleX, BoxObstacle.getHeight()*boxScaleY);
	pop();
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
	push();
	fill(...BoxObstacle.getColor());
	rect(x, y, BoxObstacle.getWidth(), BoxObstacle.getHeight());
	pop();
}