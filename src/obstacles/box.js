function Box(x, y) {
    this.position = createVector(x, y);
}

Box.prototype.draw = function() {
    rect(this.position.x, this.position.y, 50, 50)
}
