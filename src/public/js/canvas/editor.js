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
	this.trashIconClose = loadImage("/public/images/trashclose.png");
	this.trashIconOpen = loadImage("/public/images/trashopen.png");
	
	this.mouseHover = false;
	this.mouseHoverTrash = false;
	//Holding a new obstacle
	this.holding = false;
	//The Holding Obstacle
	this.heldObstacle = null;
	
	//The selected obstacle type
	this.selected = Target;

	//the currently clicked on object
	this.selectedObject = null;


	this.obstacleList = [Target, SpawnPoint, Rectangle, Circle, Polygon];
	this.selectedIndex = 0;

	this.scaleX = document.getElementById("scaleXForm");
	this.scaleY = document.getElementById("scaleYForm");

	this.posX = document.getElementById("positionXForm");
	this.posY = document.getElementById("positionYForm");

	this.editorUI = document.getElementById("editorUI");
	this.editorUI.style.display = "none"
	
	
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
	if(this.mouseHoverTrash && (this.holding || this.heldObstacle != null))
		image(this.trashIconOpen, this.trashPositionX, this.trashPositionY, this.trashWidth, this.trashHeight);
	else
		image(this.trashIconClose, this.trashPositionX, this.trashPositionY, this.trashWidth, this.trashHeight);
	pop();
	
}
Editor.prototype.keyPressed = function(){
	//Toggling Obstacles
	if(key == 'ArrowLeft'){
		this.selectedIndex--;
		if(this.selectedIndex < 0)
			this.selectedIndex = this.obstacleList.length-1;
		this.selected = this.obstacleList[this.selectedIndex];
	}
	else if(key == 'ArrowRight'){
		this.selectedIndex++;
		if(this.selectedIndex > this.obstacleList.length-1)
			this.selectedIndex = 0;
		this.selected = this.obstacleList[this.selectedIndex];
	}
}
Editor.prototype.mousePressed = function(){

	//If not currently holding an obstacle, try to pick one up
	if(!this.heldObstacle){
		//check obstacle click
		let obstacle = pointIntersectObstacle(mouseX-cameraPosition.x, mouseY-cameraPosition.y); //returns the physics object
		if(obstacle) {
			this.heldObstacle = obstacle.ref; //get the reference
			this.selectedObject = obstacle.ref;
			this.editorUI.style.display = null; //show editor
			this.scaleX.value = this.heldObstacle.scale.x;
			this.scaleY.value = this.heldObstacle.scale.y;
			this.posX.value = this.heldObstacle.position.x.toFixed(2);
			this.posY.value = this.heldObstacle.position.y.toFixed(2);
		}
		//check spawn coord click
		if(level.spawnCoordinate != null){
			if(level.spawnCoordinate.pointInSpawn(mouseX-cameraPosition.x, mouseY-cameraPosition.y)){
				this.heldObstacle = level.spawnCoordinate;
				this.editorUI.style.display = "none";
			}
		}

		//check target click
		if(level.target != null){
			if(level.target.pointInTarget(mouseX-cameraPosition.x, mouseY-cameraPosition.y)){
				this.heldObstacle = level.target;
				this.editorUI.style.display = "none";
			}
		}
	}
	if(!this.heldObstacle){//If didn't click on anything, then reset
		this.selectedObject = null; 
		this.editorUI.style.display = "none";
	}
	//If hovering over the creation area and clicked (and not holding an obstacle), pick up a new obstacle
	if(this.mouseHover && !this.heldObstacle){
			this.holding = true;
	}
	
}
Editor.prototype.mouseReleased = function(){
	
	if(this.holding && !this.mouseHoverTrash){
		let newObstacle = this.selected;
		//if spawnpoint, try to drop
		if(newObstacle == SpawnPoint){
			let mx = mouseX-cameraPosition.x, my = mouseY-cameraPosition.y;
			if(rectIntersectObstacle(mx-SpawnPoint.defaultRadius, my-SpawnPoint.defaultRadius,
				2*SpawnPoint.defaultRadius, 2*SpawnPoint.defaultRadius) == null){
				level.spawnCoordinate = new SpawnPoint(mx, my);
			}
		}
		//if target, try to drop
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
			//If obstacle
			if(this.heldObstacle.type)
				deleteQueue.push(this.heldObstacle);
			else {
				level.killPopulation();
				deleteQueue.push(this.heldObstacle);
			}
		}
		//Try and drop obstacle
		else{
			if(this.heldObstacle.type){
				let oldPosition = createVector(this.heldObstacle.position.x, this.heldObstacle.position.y);
				this.heldObstacle.position.x = mouseX-cameraPosition.x;
				this.heldObstacle.position.y = mouseY-cameraPosition.y;
				if(checkCollision(this.heldObstacle.physics)){
					this.heldObstacle.position.x = oldPosition.x;
					this.heldObstacle.position.y = oldPosition.y;
				}
				else{
					//update position editor
					this.posX.value = this.heldObstacle.position.x.toFixed(2);
					this.posY.value = this.heldObstacle.position.y.toFixed(2);
				}
			}
			else if(this.heldObstacle == level.spawnCoordinate){
				let mx = mouseX-cameraPosition.x, my = mouseY-cameraPosition.y;
				if(rectIntersectObstacle(mx-SpawnPoint.defaultRadius, my-SpawnPoint.defaultRadius,
								 2*SpawnPoint.defaultRadius, 2*SpawnPoint.defaultRadius) == null){
					level.spawnCoordinate.x = mx;
					level.spawnCoordinate.y = my;
				}
			}
			else if(this.heldObstacle == level.target){
				let mx = mouseX-cameraPosition.x, my = mouseY-cameraPosition.y;
				if(rectIntersectObstacle(mx-Target.defaultRadius, my-Target.defaultRadius, 
										2*Target.defaultRadius, 2*Target.defaultRadius) == null){
					level.target.position.x = mx;
					level.target.position.y = my;
				}
			}
		}
	}
	
	this.heldObstacle = null;
}