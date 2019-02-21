// obstacle object
function Obstacle(x,y,w,h) {
    this.x = w / 4;
    this.y = h / 2;
    this.w = w / 2;
    this.h = h / 30;
}

Obstacle.prototype.hit = function (input) {
    if (input.x > this.x && input.x < this.x + this.w && input.y > this.y && input.y < this.y + this.h)
    return true;
};

Obstacle.prototype.show = function () {
    noStroke();
    fill(36, 154, 149); //adding color can change color later
    rect(this.x, this.y, this.w, this.h);
};