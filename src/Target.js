// JavaScript source code
function Target(r) {
    this.r = r;
    this.x = width / 2;
    this.y = height / 4;

    this.hit = function (input) {
        var d = dist(input.x, input.y, this.x, this.y);
        if (d < this.r / 2)
            return true;
    }

    this.show = function () {
        noStroke();
        fill(530, 43, 564);
        ellipse(this.x, this.y, this.r, this.r);
    }
}