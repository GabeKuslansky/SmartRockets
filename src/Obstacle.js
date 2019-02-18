// JavaScript source code
function Obstacle() {
    this.x = width / 4;
    this.y = height / 2;
    this.w = width / 2;
    this.h = height / 30;
    this.hit = function (input) {
        if (input.x > this.x && input.x < this.x + this.w && input.y > this.y && input.y < this.y + this.h)
            return true;
    }
    this.show = function () {
        noStroke();
        fill(36, 154, 149);
        rect(this.x, this.y, this.w, this.h);
    }
}