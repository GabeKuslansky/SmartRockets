//all physics objects
var physicsObjects = [];
var rocketObjects = [];

//box helper function corner coords
function boundingBox(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
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

//angle in degrees
//point to rotate about globally
PhysicsObject.prototype.rotate = function(angle, point){
	
	
	//convert to radians
	let radians = angle*Math.PI/180;
	
	//translate by negative point
	this.position.sub(point);
	let oldPos = createVector(this.position.x, this.position.y);

	
	//rotate position
	this.position.x = Math.cos(radians)*oldPos.x - Math.sin(radians)*oldPos.y;
	this.position.y = Math.sin(radians)*oldPos.x + Math.cos(radians)*oldPos.y;
	
	//translate by position point
	this.position.add(point);
	
	//rotate colliders
	for(let i = 0; i < this.colliders.length; i++){
		this.colliders[i].rotate(radians);
		this.updateBoundingBoxPoly(this.colliders[i].getBoundingBox());
	}
}

//Get bounding box
PhysicsObject.prototype.getBoundingBoxGlobal = function(){
	return {x: this.boundingBox.x+this.position.x,
			y: this.boundingBox.y+this.position.y,
			w: this.boundingBox.w,
			h: this.boundingBox.h
			};
}

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

PhysicsObject.prototype.updateBoundingBoxPoly = function(square){
		if(square.x < this.boundingBox.x)
			this.boundingBox.x = square.x;
		if(square.x + square.w > this.boundingBox.x + this.boundingBox.w)
			this.boundingBox.w += Math.abs(square.w - this.boundingBox.w);
		if(square.y < this.boundingBox.y)
			this.boundingBox.y = square.y;
		if(square.y+square.h > this.boundingBox.y + this.boundingBox.y)
			this.boundingBox.h += Math.abs(square.h - this.boundingBox.h);
}

//Add colliders
//x and y are offsets from position
PhysicsObject.prototype.addColliderBox = function(x, y, w, h){
	this.colliders.push(new ColliderBox(this.position, x, y, w, h));
	//reset bounding box
	if(this.boundingBox == null)
		this.boundingBox = new boundingBox(x, y, w, h);
	//update bounding box
	else
		this.updateBoundingBoxPoly({x:x, y:y, w:w, h:h});
};
//x and y are offsets from position
PhysicsObject.prototype.addColliderCircle = function(x, y, r){
	this.colliders.push(new ColliderCircle(this.position, x, y, r));
	
	//reset bounding box
	if(this.boundingBox == null){
		this.boundingBox = new boundingBox(x-r, y-r, x+r+r, y+r+r);
	}
	//update bounding box
	else{
		this.updateBoundingBoxPoly({x:x-r, y:y-r, w:r+r, h:r+r});
	}
};
//x and y are offsets from position
//DEFINE IN CLOCKWISE DIRECTION
PhysicsObject.prototype.addColliderPolygon = function(x, y, points){
	var collider = new ColliderPolygon(this.position, x, y, points);
	this.colliders.push(collider);
	
	//Get bounding box of polygon
	let bb = collider.getSATPolygon().getAABB();
	//getAABB defines in a weird way. converting to corner coords
	let betterbb = new boundingBox(bb.pos.x, bb.pos.y, bb.points[1].x, bb.points[3].y);
	
	//Set from global to local coords
	betterbb.x -= this.position.x;
	betterbb.y -= this.position.y;	
	
	//reset bounding box
	if(this.boundingBox == null){
		this.boundingBox = new boundingBox(betterbb.x, betterbb.y, betterbb.w, betterbb.h);
	}
	//update bounding box
	else{
		this.updateBoundingBoxPoly(betterbb);
	}
};


///////////////////////////////////////////////////////////////////////////////
//Colliders
//Types of Colliders
var ColliderTypes = {
	POLY: 0,
	CIRCLE: 1
};

//x y in top left corner
function ColliderBox(transform, offsetX, offsetY, w, h){
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.w = w;
	this.h = h;
	this.transform = transform;	
	this.angle = 0;
	
	this.type = ColliderTypes.POLY;
}
ColliderBox.prototype.getSATPolygon = function(){
	let poly = new SAT.Polygon(new SAT.Vector(this.transform.x+this.offsetX, this.transform.y+this.offsetY),
							[new SAT.Vector(0, 0),
							new SAT.Vector(this.w, 0),
							new SAT.Vector(this.w, this.h),
							new SAT.Vector(0, this.h)]);
	poly.rotate(this.angle);
	return poly;
}
//receives radians
ColliderBox.prototype.rotate = function(angle){
	this.angle = angle;
}
//xywh format
ColliderBox.prototype.getBoundingBox = function(){
	//Get bounding box of polygon
	let bb = this.getSATPolygon().getAABB();
	//getAABB defines in a weird way. converting to corner coords
	return new boundingBox(bb.pos.x, bb.pos.y, bb.points[1].x, bb.points[3].y);
}

//x y in center
function ColliderCircle(transform, offsetX, offsetY, r){
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.r = r;
	this.transform = transform;
	
	this.type = ColliderTypes.CIRCLE;
}

ColliderCircle.prototype.getSATCircle = function(){
	return new SAT.Circle(new SAT.Vector(this.offsetX + this.transform.x, this.offsetY + this.transform.y), this.r);
}

//x y in top left corner
function ColliderPolygon(transform, offsetX, offsetY, points){
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.points = points;
	this.transform = transform;
	
	this.type = ColliderTypes.POLY;
}
ColliderPolygon.prototype.getSATPolygon = function(){
	return new SAT.Polygon(new SAT.Vector(this.offsetX + this.transform.x, this.offsetY + this.transform.y), this.points);
}

/////////////////////////////////////////////////////////
//Spatial Hashing
function SpatialHash (cellSize){
	
	this.spatialHash = {};
	this.cellSize = cellSize;
	
}

//added value is assumed to be a physics object
SpatialHash.prototype.add = function(obj){
	
	//get bounding box in x y right bottom format
	var bb = obj.getBoundingBoxGlobal();

	//add to all cells
	for(let i = Math.floor(bb.x/this.cellSize) * this.cellSize; i <= Math.floor((bb.x+bb.w)/this.cellSize) * this.cellSize; i = i + this.cellSize){
		for(let j = Math.floor(bb.y/this.cellSize) * this.cellSize; j <= Math.floor((bb.y+bb.h)/this.cellSize) * this.cellSize; j = j + this.cellSize){
			var key = i + "," + j;
			if(this.spatialHash[key] == undefined)
				this.spatialHash[key] = [];
			this.spatialHash[key].push(obj);
		}
	}
}

//get index
SpatialHash.prototype.at = function(x, y){
	var newX = Math.floor(x/this.cellSize) * this.cellSize;
	var newY = Math.floor(y/this.cellSize) * this.cellSize;
	return this.spatialHash[newX+","+newY];
}

//return list of all objects in same buckets
SpatialHash.prototype.getBuckets = function(obj){
	
	//get bounding box in x y right bottom format
	var bb = obj.getBoundingBoxGlobal();
	var buckets = [];
	
	//loop through all cells
	for(let i = Math.floor(bb.x/this.cellSize) * this.cellSize; i <= Math.floor((bb.x+bb.w)/this.cellSize) * this.cellSize; i = i + this.cellSize){
		for(let j = Math.floor(bb.y/this.cellSize) * this.cellSize; j <= Math.floor((bb.y+bb.h)/this.cellSize) * this.cellSize; j = j + this.cellSize){
			var key = i + "," + j;
			var bucket = this.spatialHash[key];
			if(bucket != undefined)
				buckets = buckets.concat(bucket);

		}
	}
	return buckets;
}


//get list o
///////////////////////////////////////////////////////////////////////////////
//Update physics each frame
let spatialHashObjects = new SpatialHash(120);
function updatePhysics(){
	
	spatialHashObjects = new SpatialHash(120);
	
	//ObstacleHash
	for(let i = 0; i < physicsObjects.length; i++){
		//physics stuff
		physicsObjects[i].velocity.add(physicsObjects[i].acceleration);
		physicsObjects[i].acceleration.mult(0);
		
		//Handle position
		physicsObjects[i].position.x += physicsObjects[i].velocity.x;
		physicsObjects[i].position.y += physicsObjects[i].velocity.y;
		
		//Add to hash map
		spatialHashObjects.add(physicsObjects[i]);
	}
	
	///////////////////////
	//Collision Detection and Resolution
	//Object collision detection
	let response = new SAT.Response();
	for(let i = 0; i < physicsObjects.length; i++){
		
		//Check Collision
		if(checkCollision(physicsObjects[i], response)){
			//Collision detected
			
			//Handle collision
			physicsObjects[i].position.x -= response.overlapV.x;
			physicsObjects[i].position.y -= response.overlapV.y;
			physicsObjects[i].onCollision();
		}		

	}
	
	//Rocket collision detection
	for(let i = 0; i < rocketObjects.length; i++){
		//physics stuff
		rocketObjects[i].velocity.add(rocketObjects[i].acceleration);
		rocketObjects[i].acceleration.mult(0);
		
		//Handle position
		rocketObjects[i].position.x += rocketObjects[i].velocity.x;
		rocketObjects[i].position.y += rocketObjects[i].velocity.y;
		
		//Check Collision
		if(checkCollision(rocketObjects[i], response)){
			//Collision detected
			//Handle collision
			rocketObjects[i].position.x -= response.overlapV.x;
			rocketObjects[i].position.y -= response.overlapV.y;
			//rocketObjects[i].position.x -= rocketObjects[i].velocity.x;
			//rocketObjects[i].position.y -= rocketObjects[i].velocity.y;
			rocketObjects[i].onCollision();
		}		

	}				
}
//////////////////////////////////////////////////////////////////////////////////
function checkCollision(a, response){
	
	//Get buckets to compare
	let buckets = spatialHashObjects.getBuckets(a);

	for(let i = 0; i < buckets.length; i++){
		let b = buckets[i];
		//Make sure not comparing yourself
		if(a != b){
			//Check colliders of each
			for(let colliderA = 0; colliderA < a.colliders.length; colliderA++){
				for(let colliderB = 0; colliderB < b.colliders.length; colliderB++){
					
					//Check collider A with collider B
					let collided = checkColliderCollision(a.colliders[colliderA], b.colliders[colliderB], response)
					if(collided == true)
						return true;
				}
			}
		}

	}
	return false;
}
/////////////////////////////
function checkColliderCollision(colliderA, colliderB, response){
	if(response)
		response.clear();
	if(colliderA.type == ColliderTypes.POLY && colliderB.type == ColliderTypes.POLY){
		//Poly Poly check
		return SAT.testPolygonPolygon(colliderA.getSATPolygon(), colliderB.getSATPolygon(), response);
	}
	if(colliderA.type == ColliderTypes.CIRCLE && colliderB.type == ColliderTypes.POLY){
		//Circle Poly check
		return SAT.testCirclePolygon(colliderA.getSATCircle(), colliderB.getSATPolygon(), response);
	}
	if(colliderA.type == ColliderTypes.POLY && colliderB.type == ColliderTypes.CIRCLE){
		//Poly Circle check
		return SAT.testPolygonCircle(colliderA.getSATPolygon(), colliderB.getSATCircle(), response);
	}
	if(colliderA.type == ColliderTypes.POLY && colliderB.type == ColliderTypes.CIRCLE){
		//Circle Circle check
		return SAT.testCirclePolygon(colliderA.getSATCircle(), colliderB.getSATCircle(), response);
	}
}
/////////////////////////////////
//Helper funtions

function pointInBox(px, py, x, y, w, h){
	//find point in box
	return (px < x+w && px > x && py > y && py < y+h);
}

function pointInCircle(px, py, x, y, r){
	//find point in circle
	return dist(px, py, x, y) < r;
}

function pointInPolygon(px, py, poly){
	return SAT.pointInPolygon(new SAT.Vector(px, py), poly);
}