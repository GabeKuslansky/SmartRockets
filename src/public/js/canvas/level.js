//TODO fix sliders to match creating and killing population

function Target(x, y, radius){
	
    this.position = createVector(x, y);
    if(!radius)
        this.radius = Target.defaultRadius;
    else
        this.radius = radius;
	
}
//Draw
Target.prototype.draw = function(x, y){
    if(!x){
        push();
        fill(200, 0, 0);
        circle(this.position.x, this.position.y, this.radius);
        pop();
    }
    else{
        push();
        fill(200, 0, 0);
        circle(x, y, this.radius);
        pop();
    }
}
//Point in target
Target.prototype.pointInTarget = function(x, y){
	return dist(x, y, this.position.x, this.position.y) <= this.radius;
}
//Physics intersect target
Target.prototype.intersectsTarget = function(physobj){
    let collided = false;
    let circle = new SAT.Circle(new SAT.Vector(this.position.x, this.position.y), Target.defaultRadius);
    for(let i = 0; i < physobj.colliders.length; i++){
        collided = checkCircleCollision(circle, physobj.colliders[i]);
        if(collided)
            return true
    }
    return false;
}
//deleting
Target.prototype.deleteObstacle = function(){
    level.target = null;
}
Target.defaultRadius = 30;
//Where xy is the cneter
Target.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.fill(200, 0, 100);
	pg.circle(x, y, Target.defaultRadius);
	pg.pop();
}
//Draw with default values
Target.draw = function(x, y){
    push();
    fill(200, 0, 0);
	circle(x, y, Target.defaultRadius);
	pop();
}

function SpawnPoint(x, y){
    this.position = createVector(x, y);
}
SpawnPoint.prototype.draw = function(x, y){
    if(!x){
        push();
        fill(255, 255, 255, 100);
        circle(this.position.x, this.position.y, SpawnPoint.defaultRadius);
        pop(); 
    }
    else{
        push();
        fill(255, 255, 255, 100);
        circle(x, y, SpawnPoint.defaultRadius);
        pop();
    }
}
//Point on spawn points
SpawnPoint.prototype.pointInSpawn = function(x, y){
	return dist(x, y, this.position.x, this.position.y) <= SpawnPoint.defaultRadius*2;
}
//deleting
SpawnPoint.prototype.deleteObstacle = function(){
    level.spawnCoordinate = null;
}
//Physics intersect target
SpawnPoint.prototype.intersectsSpawnPoint = function(physobj){

    let collided = false;
    let circle = new SAT.Circle(new SAT.Vector(this.position.x, this.position.y), SpawnPoint.defaultRadius);
    for(let i = 0; i < physobj.colliders.length; i++){
        collided = checkCircleCollision(circle, physobj.colliders[i]);
        if(collided)
            return true
    }
    return false;
}
SpawnPoint.defaultRadius = 2;
//Where xy is the cneter
SpawnPoint.drawToGraphics = function(pg, x, y){
	pg.push();
	pg.fill(255, 255, 255, 100);
	pg.circle(x, y, 2);
	pg.pop();
}
//Draw with default values
SpawnPoint.draw = function(x, y){
    push();
    fill(255, 255, 255, 100);
	circle(x, y, SpawnPoint.defaultRadius);
	pop();
}



function Level() {
    this.initialized = false;
    this.obstacles = [];
    this.spawnCoordinate = null;
    this.populationSize = 50;
    this.lifespan = 6*60;
    this.population = null;
    this.target = null;
}

Level.prototype.addObstacle = function(object) {
    this.obstacles.push(object);
}

Level.prototype.initLevel = function(){
    
    //Create New Level
    if(!createLevel){
        this.deserialize(levelStructure);
    }
    

    this.initialized = true;

}

Level.prototype.draw = function() {
    this.obstacles.forEach(element => element.draw());
    if(this.population != null)
        this.population.draw();
    if(this.target != null)
        this.target.draw();
    if(createLevel && this.spawnCoordinate != null)
        this.spawnCoordinate.draw();
}

Level.prototype.update = function() {
    
    if(this.population != null){

        for(let i = 0; i < this.obstacles.length; i++){
            if(this.obstacles[i].update)
                this.obstacles[i].update();
        }
        this.population.update();
    }
}

Level.prototype.setSpawn = function(x_, y_){
    this.spawnCoordinate = {x:x_, y:y_};
}

Level.prototype.setTarget = function(x, y){
    this.target = new Target(x, y);
}

Level.prototype.createPopulation = function(){
    if(this.population == null && this.target != null && this.spawnCoordinate != null){
        this.population = new Population();
    }
    this.objectStart();
}

Level.prototype.killPopulation = function(){
    if(this.population != null){
        this.population.deletePopulation();
        this.population = null;

        this.objectReset();

        if(createLevel)
            editor.resetUI();
    }
    
}

Level.prototype.reset = function(){

    this.objectReset();
    this.objectStart();

    if(createLevel)
     editor.resetUI();
}

Level.prototype.objectStart = function(){
    //start obstacles
    for(let i = 0; i < this.obstacles.length; i++)
        this.obstacles[i].start();
}

Level.prototype.objectReset = function(){
    //reset obstacles
    for(let i = 0; i < this.obstacles.length; i++)
        this.obstacles[i].reset();
}

Level.prototype.serialize = function(){

    let obstacleArray = [];
    for(let i = 0; i < this.obstacles.length; i++){
        obstacleArray.push(
            {
                type: this.obstacles[i].type,
                x: this.obstacles[i].position.x,
                y: this.obstacles[i].position.y,
                scalex: this.obstacles[i].scale.x,
                scaley: this.obstacles[i].scale.y,
                startforcex: this.obstacles[i].startForce.x,
                startforcey: this.obstacles[i].startForce.y,
                rotatepointx: this.obstacles[i].rotationPoint.x,
                rotatepointy: this.obstacles[i].rotationPoint.y,
                step: this.obstacles[i].step

            }
        );
    }
    let target_ = {x: this.target.position.x, y: this.target.position.y, r: this.target.radius};
    let spawnpoint = {x: this.spawnCoordinate.position.x, y: this.spawnCoordinate.position.y};
    return {
        obstacles : obstacleArray,
        spawnCoordinate : spawnpoint,
        populationSize : this.populationSize,
        lifespan : this.lifespan,
        target : target_
    };
}
Level.prototype.deserialize = function(levelStructure){
    const { obstacles, spawnCoordinate, populationSize, lifespan, target} = levelStructure;

    for(let i = 0; i < obstacles.length; i++){
        let obstacle = new window[obstacles[i].type](obstacles[i].x, obstacles[i].y);
        obstacle.scale.x = obstacles[i].scalex;
        obstacle.scale.y = obstacles[i].scaley;
        obstacle.startForce.x = obstacles[i].startforcex;
        obstacle.startForce.y = obstacles[i].startforcey;
        obstacle.rotationPoint.x = obstacles[i].rotatepointx;
        obstacle.rotationPoint.y = obstacles[i].rotatepointy;
        obstacle.step = obstacles[i].step;
        this.obstacles.push(obstacle);
    }
    this.spawnCoordinate = new SpawnPoint(spawnCoordinate.x, spawnCoordinate.y);
    this.target = new Target(target.x, target.y, target.r);
    this.populationSize = populationSize;
    this.lifespan = lifespan;
    this.population = new Population();
}