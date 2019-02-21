function LevelEditorContainer(width, height) {
    this.x = 0;
    this.y = height-100;
    this.w = width;
    this.h = 100;
    this.isHoldingObject = false;
    this.marginX = 120;
    this.marginY = 20;
    this.offsetX = 15;
    this.color = [150, 155, 155];
    this.borderWidth = 5;
    this.opacity = 212;
    this.display = true;
    this.obstacles = this.getObstacles();
    this.generateSpawnPoints();
}

LevelEditorContainer.prototype.draw = function() {
    if (this.display) {
        fill(...this.color, this.opacity);
        stroke(0)
        strokeWeight(this.borderWidth);
        rect(this.x, this.y, this.w, this.h);
        this.getObstacles();
        this.drawObstacles();
    }
}

LevelEditorContainer.prototype.update = function() {
    if (mouseIsPressed) {
        //const touchingObject = this.obstacles.forEach(x => x.checkMouse())
    }
}

LevelEditorContainer.prototype.drawObstacles = function() {
    this.obstacles.forEach(obstacle => obstacle.draw());
}

LevelEditorContainer.prototype.getObstacles = function() {
    return [new Box(), new VerticalLine()];
}

LevelEditorContainer.prototype.generateSpawnPoints = function() {
    const {marginX, marginY, offsetX, y} = this;
    this.obstacles.forEach(function(obstacle, i) {
        obstacle.position.x = (i * marginX) + offsetX;
        obstacle.position.y = y + marginY;
        //obstacle.protoype.addHandler = addClickHandler
    });
}