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
	
	this.selected = Target;


	this.obstacleList = [Target, SpawnPoint, Rectangle, Circle, Polygon];
	this.selectedIndex = 0;
	
	
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
	this.pg.strokeWeight(5);
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

	//If holding an obstacle
	if(this.heldObstacle){
		this.heldObstacle.draw(mouseX, mouseY);
	}
	
	
	
	//Draw trash icon
	push();
	rectMode(CORNER);
	image(this.trashIcon, this.trashPositionX, this.trashPositionY, this.trashWidth, this.trashHeight);
	pop();
	
}
Editor.prototype.keyPressed = function(){
	//Toggling Obstacles
	if(keyIsDown(37)){
		this.selectedIndex--;
		if(this.selectedIndex < 0)
			this.selectedIndex = this.obstacleList.length-1;
		this.selected = this.obstacleList[this.selectedIndex];
	}
	else if(keyIsDown(39)){
		this.selectedIndex++;
		if(this.selectedIndex > this.obstacleList.length-1)
			this.selectedIndex = 0;
		this.selected = this.obstacleList[this.selectedIndex];
	}
}
Editor.prototype.mousePressed = function(){
	//If hovering over the creation area and clicked, pick up a new obstacle
	if(this.mouseHover){
		this.holding = true;
	}
	//If not currently holding an obstacle, try to pick one up
	else if(!this.heldObstacle){
		//check obstacle click
		let obstacle = pointIntersectObstacle(mouseX-cameraPosition.x, mouseY-cameraPosition.y); //returns the physics object
		if(!obstacle) return;
		else {
			this.heldObstacle = obstacle.ref; //get the reference
		}
		//check spawn coord click

		//check target click
	}
	
}
Editor.prototype.mouseReleased = function(){
	
	if(this.holding && !this.mouseHoverTrash){
		let newObstacle = this.selected;
		//check if spawn point
		if(newObstacle == SpawnPoint){
			let mx = mouseX-cameraPosition.x, my = mouseY-cameraPosition.y;
			if(rectIntersectObstacle(mx-1, my-1, 2, 2) == null){
				level.spawnCoordinate = new SpawnPoint(mx, my);
			}
		}
		else if(newObstacle == Target){
			let mx = mouseX-cameraPosition.x, my = mouseY-cameraPosition.y;
			if(rectIntersectObstacle(mx-Target.defaultRadius, my-Target.defaultRadius, 
									2*Target.defaultRadius, 2*Target.defaultRadius) == null){
				level.target = new Target(mx, my);
			}
		}
		else{
			let obstacle = new newObstacle(mouseX-cameraPosition.x, mouseY-cameraPosition.y);
			if(checkCollision(obstacle.physics)){
				obstacle.physics.deletePhysics();
			}
			else{
				level.obstacles.push(obstacle);
			}
		}
		
	}
	this.holding = false;

	
	if(this.heldObstacle){
		//If dropped over trash icon
		if(this.mouseHoverTrash){
			deleteQueue.push(this.heldObstacle);
		}
		//Try and drop obstacle
		else{
			let oldPosition = createVector(this.heldObstacle.position.x, this.heldObstacle.position.y);
			this.heldObstacle.position.x = mouseX-cameraPosition.x;
			this.heldObstacle.position.y = mouseY-cameraPosition.y;
			if(checkCollision(this.heldObstacle.physics)){
				this.heldObstacle.position.x = oldPosition.x;
				this.heldObstacle.position.y = oldPosition.y;
			}
		}
	}
	
	this.heldObstacle = null;
}
