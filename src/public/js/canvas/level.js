function Target(x, y, radius){
	
	this.position = createVector(x, y);
	this.radius = radius;
	
}
//Draw
Target.prototype.draw = function(){
	push();
	fill(200, 0, 0);
	circle(this.position.x, this.position.y, this.radius);
	pop();
}

function Level() {
    this.initialized = false;
    this.obstacles = [];
    this.width = 600;
    this.height = 600;
    this.spawnCoordinate = {x: this.width/2, y: this.height-100};
    this.populationSize = 50;
    this.lifespan = 360;
    this.population = null;
    this.target = null;
}

Level.prototype.addObstacle = function(object) {
    this.obstacles.push(object);
}

Level.prototype.initLevel = function(){

    const { obstacles, width, height, spawnCoordinate, populationSize, lifespan, target} = levelStructure;
    const obstacleArray = obstacles;
	

    for(let i = 0; i < obstacleArray.length; i++){
        this.obstacles.push(eval("new " + obstacleArray[i].name + "(" + obstacleArray[i].x + ", " + obstacleArray[i].y + ")"));
    }

    this.width = width;
    this.height = height;
    this.spawnCoordinate = spawnCoordinate;
    this.target = new Target(target.x, target.y, target.r);

    this.population = new Population(this.populationSize, this.lifespan, this.spawnCoordinate.x, this.spawnCoordinate.y);
    this.initialized = true;
}

Level.prototype.draw = function() {
    this.obstacles.forEach(element => element.draw());
    this.population.draw();
    this.target.draw();
}

Level.prototype.update = function() {
	
	for(let i = 0; i < this.obstacles.length; i++){
		if(this.obstacles[i].update)
			this.obstacles[i].update();
	}
    this.population.update();
}

Level.prototype.setLevelDimensions = function(x, y){
    this.width = x;
    this.height = y;
}

Level.prototype.setSpawn = function(x, y){
    this.spawnCoordinate = {x, y};
}

Level.prototype.serialize = function(){

    let obstacleArray = [];
    for(let i = 0; i < this.obstacles.length; i++){
        obstacleArray.push(
            {
                name: this.obstacles[i].name,
                x: this.obstacles[i].position.x,
                y: this.obstacles[i].position.y
            }
        );
    }
    let target_ = {x: this.target.position.x, y: this.target.position.y, r: this.target.radius};
    return {
        obstacles : obstacleArray,
        width : this.width,
        height : this.height,
        spawnCoordinate : this.spawnCoordinate,
        populationSize : this.populationSize,
        lifespan : this.lifespan,
        target : target_
    };
}