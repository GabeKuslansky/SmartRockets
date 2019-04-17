function Editor(width, height){
	
	this.canvasWidth = width;
	this.canvasHeight = height;
	
	this.strokeWeight = 3;
	
	this.width = height/5;
	this.height = height/5;
	//top left coords
	this.positionX = 0;
	this.positionY = height - this.height - this.strokeWeight + 1;
	
	this.trashOffset = 15;
	this.trashWidth = 25;
	this.trashHeight = 25;
	this.trashPositionX = width-this.trashOffset-this.trashWidth;
	this.trashPositionY = this.trashOffset;
	
	this.pg = createGraphics(this.width, this.height);
	this.trashIcon = loadImage("https://www.gravatar.com/avatar/06ce4c0f7ee07cf79c81ac6602f5d502?s=32&d=identicon&r=PG");
	
	this.mouseHover = false;
	this.mouseHoverTrash = false;
	this.holding = false;
	this.heldObstacle = null;
	
	this.selected = Rectangle;
	
	
}
Editor.prototype.update = function(){
	//Mouse hover creation icon
	if(pointInBox(mouseX, mouseY, this.positionX, this.positionY, this.width, this.height)){
		this.mouseHover = true;
		cursor(HAND);
	}
	else{
		this.mouseHover = false;
		cursor(ARROW);
	}
	//Mouse hover trash icon
	if(pointInBox(mouseX, mouseY, this.trashPositionX, this.trashPositionY, this.trashWidth, this.trashHeight)){
		this.mouseHoverTrash = true;
	}
	else{
		this.mouseHoverTrash = false;
	}
	
	//If holding an obstacle
	if(this.heldObstacle){
		this.heldObstacle.position.x = mouseX;
		this.heldObstacle.position.y = mouseY;
	}
	
	
	
	//TESTING
	if(keyIsDown(74)) this.selected = Rectangle;
	else if(keyIsDown(75)) this.selected = Polygon;
	else if(keyIsDown(76)) this.selected = Circle;
}
Editor.prototype.draw = function(){
	
	push();
	rectMode(CORNER);
	strokeWeight(this.strokeWeight);
	fill(255, 255, 255, 100);
	rect(this.positionX, this.positionY, this.width, this.height);
	//this.pg.fill(255, 255, 255, 100);
	//this.pg.image(this.img, this.strokeWeight, this.strokeWeight, this.width-2*this.strokeWeight, this.height-2*this.strokeWeight);
	this.pg.clear() //clear pixels
	this.selected.drawToGraphics(this.pg, this.width/2, this.height/2); //pass in the center
	image(this.pg, this.positionX, this.positionY);
	
	//Dark overlay for when hovering
	if(this.mouseHover){
		fill(0, 0, 0, 50);
		stroke(0);
		rect(this.positionX, this.positionY, this.width, this.height);
	}
	pop();
	
	//Draw obstacle if holding
	if(this.holding)
		this.selected.draw(mouseX, mouseY);
	
	
	
	//Draw trash
	push();
	rectMode(CORNER);
	image(this.trashIcon, this.trashPositionX, this.trashPositionY, this.trashWidth, this.trashHeight);
	pop();
	
}
Editor.prototype.mousePressed = function(){
	//If hovering over the creation area and clicked, pick up a new obstacle
	if(this.mouseHover){
		this.holding = true;
	}
	//If not currently holding an obstacle, try to pick one up
	else if(!this.heldObstacle){
		let obstacle = pointIntersectObstacle(mouseX, mouseY); //returns the physics object
		if(!obstacle) return;
		else this.heldObstacle = obstacle.ref; //get the reference
	}
	
}
Editor.prototype.mouseReleased = function(){
	
	if(this.holding){
		let obstacle = new this.selected(mouseX, mouseY);
		if(checkCollision(obstacle.physics)){
			obstacle.physics.deletePhysics();
		}
		else
			obstacles.push(obstacle);
		
		this.holding = false;
	}
	
	//If dropped over trash icon
	if(this.heldObstacle && this.mouseHoverTrash){
		deleteQueue.push(this.heldObstacle);
	}
	
	this.heldObstacle = null;
}
