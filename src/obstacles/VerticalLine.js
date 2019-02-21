function VerticalLine(x, y) {
    this.position = createVector(x, y);
}

VerticalLine.prototype.draw = function() {
    line(this.position.x, this.position.y, this.position.x, this.position.y+100);
}