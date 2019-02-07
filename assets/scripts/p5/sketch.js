const rockets = [new Rocket(), new Rocket(100, 100)]

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255, 255, 255);
    rockets.forEach(rocket => rocket.display())
}
