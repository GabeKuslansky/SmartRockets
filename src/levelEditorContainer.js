function LevelEditorContainer(width, height) {
    this.x = 0;
    this.y = height-100;
    this.w = width;
    this.h = 100;
    this.marginX = 25;
    this.marginY = 25;
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

}

LevelEditorContainer.prototype.drawObstacles = function() {
    this.obstacles.forEach(obstacle => obstacle.draw());
}

LevelEditorContainer.prototype.getObstacles = function() {
    return [new Box(true)];
}

LevelEditorContainer.prototype.generateSpawnPoints = function() {
    const {marginX, marginY, offsetX, y} = this;
    this.obstacles.forEach(function(obstacle, i) {
        obstacle.position.x = (i * marginX) + offsetX;
        obstacle.position.y = y + marginY;
    });
}