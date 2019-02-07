class Rocket {

    constructor(x = 275, y = 550, height = 30, width = 30,) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    display() {
        ellipse(this.x, this.y, 25, 25);
        fill(240, 240, 240);
    }

    update() {

    }
}
