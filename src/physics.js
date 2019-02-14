//all physics objects
var physicsObjects = [];

//Physics Object holds colliders and is used in the array of
//physics objects
function PhysicsObject(position, isRocket){
	this.isRocket = isRocket;
	this.colliders = [];
	
	this.position = position; // top left
	this.velocity = createVector();
	this.acceleration = createVector();
	
	//add to list
	physicsObjects.push(this);
};

//Add colliders
PhysicsObject.prototype.addColliderBox = function(x, y, w, h){
	this.colliders.push(new ColliderBox(this.position, x, y, w, h));
};
PhysicsObject.prototype.addColliderCircle = function(x, y, r){
	this.colliders.push(new ColliderCircle(this.position, x, y, r));
};

//Force
PhysicsObject.prototype.applyForce = function(x, y){
	this.acceleration.add(createVector(x, y));
};


//Types of Colliders
var ColliderTypes = {
	BOX: 0,
	CIRCLE: 1
};


//Compares different types of colliders for intersection
function intersects(obj1, obj2){
	
	var position1 = obj1.getPosition();
	var position2 = obj2.getPosition();

	///////////////////////////////
	//Box v Box
		
	if(obj1.type == ColliderTypes.BOX &&
			obj2.type == ColliderTypes.BOX){
		return (position1.x+obj1.w > position2.x && position1.x < position2.x+obj2.w && position1.y+obj1.h > position2.y && position1.y < position2.y+obj2.h);
	}
	
	///////////////////////////////
	
	//Box v Circle
	
	//Circle v Circle
	
	return false;
}

function updatePhysics(){
	
	
	//Update position
	for(var i = 0; i < physicsObjects.length; i++){
		physicsObjects[i].velocity.add(physicsObjects[i].acceleration);
		physicsObjects[i].acceleration.mult(0);
		
		
		//Handle X position
		physicsObjects[i].position.x += physicsObjects[i].velocity.x;
		var details = checkCollision(physicsObjects[i]);
		if(details.collision){
			//X Collision
			
			//Undo movement
			physicsObjects[i].position.x -= physicsObjects[i].velocity.x;
			
			
			//Check if colliding from left or right
			
			//Get collider position and width
			var myPosition = details.myCollider.getPosition();
			var myWidth = details.myCollider.w;
			
			var theirPosition = details.theirCollider.getPosition();
			var theirWidth = details.theirCollider.w;
			
			
			
			if(myPosition.x < theirPosition.x){
				//Colliding from left
				var difference = theirPosition.x - (myPosition.x+myWidth);
				physicsObjects[i].position.x += difference;
			}
			else{
				//Colliding from right
				var difference = myPosition.x - (theirPosition.x+theirWidth);
				physicsObjects[i].position.x -= difference;
			}
			
			
		}
		
		
		//Handle Y Position
		physicsObjects[i].position.y += physicsObjects[i].velocity.y;
		details = checkCollision(physicsObjects[i]);
		if(details.collision){
			
			//Undo movement
			physicsObjects[i].position.y -= physicsObjects[i].velocity.y;
			
			
			//Check if colliding from bottom or top
			
			//Get collider position and height
			var myPosition = details.myCollider.getPosition();
			var myHeight = details.myCollider.h;
			
			var theirPosition = details.theirCollider.getPosition();
			var theirHeight = details.theirCollider.h;
			
			if(myPosition.y < theirPosition.y){
				//Colliding from above
				var difference = theirPosition.y - (myPosition.y + myHeight);
				physicsObjects[i].position.y += difference;
			}
			else{
				//Colliding from below
				var difference = myPosition.y - (theirPosition.y + theirHeight);
				physicsObjects[i].position.y -= difference;
			}
		}

	}
			
}

//Object to hold info on collsion and who caused it
function CollisionDetails(collision, myCollider, theirCollider){
	this.collision = collision;
	this.myCollider = myCollider;
	this.theirCollider = theirCollider;
}

//Check Collision
function checkCollision(obj1){
	
	
	for(var i = 0; i < physicsObjects.length; i++){
		
		var obj2 = physicsObjects[i];
		
		//Don't compare to rockets to rockets
		if ((!obj1.isRocket || !obj2.isRocket) && obj1 != obj2){
			//Compare colliders of obj1 to obj2
			for(var j = 0; j < obj1.colliders.length; j++){
				for(var k = 0; k < obj2.colliders.length; k++){
					if(intersects(obj1.colliders[j], obj2.colliders[k])){
						//Collision detected
						return new CollisionDetails(true, obj1.colliders[j], obj2.colliders[k]);
					}
				}
			}
		}
	}
	return new CollisionDetails(false, null, null);
}


//x y in top left corner
function ColliderBox(transform, offsetX, offsetY, w, h){
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.w = w;
	this.h = h;
	this.transform = transform;
	
	this.type = ColliderTypes.BOX;
}
ColliderBox.prototype.getPosition = function(){
	return createVector(this.offsetX + this.transform.x, this.offsetY + this.transform.y);
}

/*WORK ON THIS*/
//x y in center
function ColliderCircle(transform, x, y, r){
	this.offsetX = offSetY;
	this.offsetY = offsetY;
	this.r = r;
	this.transform = transform;
	
	this.type = ColliderTypes.BOX;
}

ColliderCircle.prototype.getPosition = function(){
	return createVector(this.offsetX + this.transform.x, this.offsetY + this.transform.y);
}