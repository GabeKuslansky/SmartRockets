//all physics objects
var physicsObjects = [];
var rocketObjects[];

//box helper function corner coords
//r : right x coordinate
//b : bottom y coordinate
function boundingBox(x, y, r, b){
	this.x = x;
	this.y = y;
	this.r = r;
	this.b = b;
}

//Physics Object holds colliders and is used in the array of
//physics objects
//Arguments
//	position: position of object
//	isRocket: boolean of wheather object is a rockets
//	ref:	reference to the object physicsObject is attatch to
//	callback:	callback function on collision
// ref and callback are optional.
function PhysicsObject(position, isRocket, ref, callBack){
	this.isRocket = isRocket;
	this.colliders = [];
	
	this.position = position; // top left
	this.velocity = createVector();
	this.acceleration = createVector();
	
	this.ref = ref;
	this.callBack = callBack;
	
	//add to list
	if(isRocket == true)
		rocketObjects.push(this);
	else
		physicsObjects.push(this);
	
	this.boundingBox = null;
};

//Delete from objects
PhysicsObject.prototype.deletePhysics = function(){
	if(this.isRocket == true){
		for(var i = 0; i < rocketObjects.length; i++){
			if(this == rocketObjects[i]){
				rocketObjects.splice(i, 1);
				break;
			}
		}
	}
	else{
		for(var i = 0; i < physicsObjects.length; i++){
			if(this == physicsObjects[i]){
				physicsObjects.splice(i, 1);
				break;
			}
		}
	}
};

//Force
//force : a p5 vector which is added to acceleration
PhysicsObject.prototype.applyForce = function(force){
	this.acceleration.add(force);
};

//Callback function
PhysicsObject.prototype.onCollision = function(){
	if(this.callBack){
		//pass in reference to callback function
		this.callBack(this.ref);
	}
}

//Add colliders
PhysicsObject.prototype.addColliderBox = function(x, y, w, h){
	this.colliders.push(new ColliderBox(this.position, x, y, w, h));
	
	//reset bounding box
	if(this.boundingBox == null){
		this.boundingBox = new boundingBox(x, y, x+w, y+h);
	}
	//update bounding box
	else{
		if(x < this.boundingBox.x)
			this.boundingBox.x = x;
		else if(x + w > this.boundingBox.r)
			this.boundingBox.r = x+w;
		else if(y < this.boundingBox.y)
			this.boundingBox.y = y;
		else if(y+h > this.boundingBox.b)
			this.boundingBox.b = y+h;
	}
};
PhysicsObject.prototype.addColliderCircle = function(x, y, r){
	this.colliders.push(new ColliderCircle(this.position, x, y, r));
	
	//reset bounding box
	if(this.boundingBox == null){
		this.boundingBox = new boundingBox(x-r, y-r, x+r, y+r);
	}
	//update bounding box
	else{
		if(x-r < this.boundingBox.x)
			this.boundingBox.x = x-r;
		else if(x + r > this.boundingBox.r)
			this.boundingBox.r = x+r;
		else if(y-r < this.boundingBox.y)
			this.boundingBox.y = y-r;
		else if(y+r > this.boundingBox.b)
			this.boundingBox.b = y+r;
	}
};


///////////////////////////////////////////////////////////////////////////////
//Colliders
//Types of Colliders
var ColliderTypes = {
	BOX: 0,
	CIRCLE: 1
};

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

//x y in center
function ColliderCircle(transform, x, y, r){
	this.offsetX = offSetY;
	this.offsetY = offsetY;
	this.r = r;
	this.transform = transform;
	
	this.type = ColliderTypes.CIRCLE;
}

ColliderCircle.prototype.getPosition = function(){
	return createVector(this.offsetX + this.transform.x, this.offsetY + this.transform.y);
}
/////////////////////////////////////////////////////////
//Spatial Hashing
function SpatialHash (cellSize){
	
	this.spatialHash = {};
	this.cellSize = cellSize;
	
}

//added value is assumed to be a physics object
SpatialHash.prototype.add = function(obj){
	
	//create bounding box in x y w h format
	var bb = obj.boundingBox;


	//add to all cells
	for(let i = Math.floor(bb.x/this.cellSize) * this.cellSize; i <= Math.floor(bb.r/this.cellSize) * this.cellSize; i = i + this.cellSize){
		for(let j = Math.floor(bb.y/this.cellSize) * this.cellSize; j < Math.floor(bb.b/this.cellSize) * this.cellSize; Y = Y + this.cellSize){;
			var key = i + "," + j;
			if(this.spatialHash[key] == undefined)
				this.spatialHash[key] = [];
			this.spatialHash[key].push(obj)
		}
	}
}

//get index
SpatialHash.prototype.at = function(x, y){
	var newX = Math.floor(x/this.cellSize) * this.cellSize;
	var newY = Math.floor(y/this.cellSize) * this.cellSize;
	return spatialHash[newX+","+newY];
}

//return list of all objects in same buckets
SpatialHash.prototype.getBuckets = function(obj){
	
	//create bounding box in x y w h format
	var bb = obj.boundingBox;
	var buckets = [];

	//add to all cells
	for(let i = Math.floor(bb.x/this.cellSize) * this.cellSize; i <= Math.floor(bb.r/this.cellSize) * this.cellSize; i = i + this.cellSize){
		for(let j = Math.floor(bb.y/this.cellSize) * this.cellSize; j < Math.floor(bb.b/this.cellSize) * this.cellSize; Y = Y + this.cellSize){;
			var key = i + "," + j;
			if(this.spatialHash[key] == undefined)
				this.spatialHash[key] = [];
			var bucket = spatialHash[key];
			if(bucket != undefined)
				buckets = buckets.concat(bucket);

		}
	}
}

//get list o
///////////////////////////////////////////////////////////////////////////////
//Update physics each frame
function updatePhysics(){
	
	spatialHashObjects = new SpatialHash(120);
	spatialHashRockets = new SpatialHash(120);
	
	//ObstacleHash
	for(let i = 0; i < physicsObjects.length; i++){
		//Since we're looping might as well do the physics stuff
		physicsObjects[i].velocity.add(physicsObjects[i].acceleration);
		physicsObjects[i].acceleration.mult(0);
		
		//Handle position
		physicsObjects[i].position.x += physicsObjects[i].velocity.x;
		physicsObjects[i].position.y += physicsObjects[i].velocity.y;
		spatialHashObjects.add(physicsObjects[i]);

	}
	//RocketHash
	for(let i = 0; i < rocketObjects.length; i++){
		//Since we're looping might as well do the physics stuff
		rocketObjects[i].velocity.add(rocketObjects[i].acceleration);
		rocketObjects[i].acceleration.mult(0);
		
		//Handle position
		rocketObjects[i].position.x += rocketObjects[i].velocity.x;
		rocketObjects[i].position.y += physicsObjects[i].velocity.y;
		spatialHashRockets.add(rocketObjects[i]);

	}
	
	//Collision Detection and Resolution

			
}
//////////////////////////////////////////////////////////////////////////////////