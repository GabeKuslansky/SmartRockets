// JavaScript source code
function Target(r, w, h) {
    this.r = r;
    this.x = w / 2;
    this.y = h / 4;
}

Target.prototype.hit = function (input) {
    var d = dist(input.x, input.y, this.x, this.y);
    if (d < this.r / 2)
        return true;
};

Target.prototype.show = function () {
    noStroke();
    fill(530, 43, 564); //adding color to target
    ellipse(this.x, this.y, this.r, this.r); //making circle
};

//Moving target
Target.prototype.mousePressed(){
    target.position.x = mouseX;
    target.position.y = mouseY;
};