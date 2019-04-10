function IconHolder(obstacle, x, y){
	this.obstacle = obstacle;
	this.x = x;
	this.y = y;
}


function LevelEditorContainer(width, height) {
    this.x = 0;
    this.y = height-100;
    this.w = width;
    this.h = 100;
    this.isHoldingObject = false;
	this.heldIndex = 0;
    this.marginX = 160;
    this.marginY = 20;
    this.offsetX = 15;
    this.color = [150, 155, 155];
    this.borderWidth = 5;
    this.opacity = 212;
    this.display = true;
    this.obstacles = [];
	this.getObstacles();
    this.generateSpawnPoints();
}

LevelEditorContainer.prototype.draw = function() {
    if (this.display) {
		push();
        fill(...this.color, this.opacity);
        stroke(0)
        strokeWeight(this.borderWidth);
        rect(this.x, this.y, this.w, this.h);
		pop();
		
        this.drawObstacles();
		
		
		if(this.isHoldingObject){
			eval(this.obstacles[this.heldIndex].obstacle + ".draw(" + (mouseX-cameraPosition.x) + ", " + (mouseY-cameraPosition.y) + ")");
		}
    }
}

LevelEditorContainer.prototype.update = function() {
	
	//Check if mouse is hovering
	let hover = false;
	for(let i = 0; i < this.obstacles.length && !hover; i++){
		//Check if mouse clicked icon
		if(eval(this.obstacles[i].obstacle + ".mouseIntersectsIcon(" + this.obstacles[i].x + ", " + this.obstacles[i].y + ")"))
			hover = true;
	}
	if(hover)
		cursor(HAND);
	else
		cursor(ARROW);
}

LevelEditorContainer.prototype.mousePressed = function(){
	
	for(let i = 0; i < this.obstacles.length && !this.isHoldingObject; i++){
		
		//Check if mouse clicked icon
		if(eval(this.obstacles[i].obstacle + ".mouseIntersectsIcon(" + this.obstacles[i].x + ", " + this.obstacles[i].y + ")")){
			this.isHoldingObject = true;
			this.heldIndex = i;
		}
	}
	
}  
LevelEditorContainer.prototype.mouseReleased = function(){
	
	if(this.isHoldingObject){
		
		
		let obstacle = eval("new " + this.obstacles[this.heldIndex].obstacle + "(" + (mouseX-cameraPosition.x) + ", " + (mouseY-cameraPosition.y) + ")");
		if(checkCollision(obstacle.physics, null))
			obstacle.deleteObstacle();
		else
			level.addObstacle(obstacle);
		
		this.isHoldingObject = false;
	}
	
}

LevelEditorContainer.prototype.drawObstacles = function() {
	for(var i = 0; i < this.obstacles.length; i++){
		eval(this.obstacles[i].obstacle + ".drawIcon(" + this.obstacles[i].x + ", " + this.obstacles[i].y + ")");
	}
}

LevelEditorContainer.prototype.getObstacles = function() {
	
	//Push new obstacles in here
	this.obstacles.push(new IconHolder('BoxObstacle'));
	this.obstacles.push(new IconHolder('CircleObstacle'));
	this.obstacles.push(new IconHolder('TriangleObstacle'));
	this.obstacles.push(new IconHolder('BlackHoleObstacle'));
}

LevelEditorContainer.prototype.generateSpawnPoints = function() {
    const {marginX, marginY, offsetX, y} = this;
    this.obstacles.forEach(function(obstacle, i) {
        obstacle.x = (i * marginX) + offsetX;
        obstacle.y = y + marginY;
    });
} 