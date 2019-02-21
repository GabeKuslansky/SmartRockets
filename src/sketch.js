var pop; // population
var lifetime; // how long should each generation live
var lifecycle; //timer for cycle of generation
var recordtime; //fastest time to target
var target; //target location
var obstacles = []; // an array list to keep track of all the obstacles
let speed = 10;

function setup() {
    createCanvas(600, 400);
    lifetime = 300;
    lifecycle = 0;
    recordtime = lifetime;
    target = new Target(44, 20, 20); //new target
    var mutationRate = 0.5; //amount of population with mutation rate. can add in user set number later
  //Create population
    pop = new Population(mutationRate, 50); //creating max population. can add in user set number later
    Obstacle = [];
    Obstacle.push(new Obstacle(width / 2 - 100, height / 2, 200, 10)); //new obstacles
  pop.getIDs();

}

function draw() {
    //Clear
    background(451, 125, 1250);
    target.show();
    obstacle.show();

    if (lifecycle < lifetime) {
        pop.live(obstacles);
        if ((pop.targetReached()) && (lifecycle < recordtime)) {
            recordtime = lifecycle;
        }
        lifecycle++
    }
    else {
        lifecycle = 0;
        pop.fitness();
        pop.evaluate();
        pop.selection();
    }

    fill(0);
    noStroke();

    //Displays some stuff about rockets life
    text("Generation #: " + pop.getGenerations(), 10, 18);
    text("Cycles left: " + (lifetime - lifecycle), 10, 36);
    text("Record cycle: " + recordtime, 10, 54);
    //Update AI
    pop.update();

    //Update Physics
    updatePhysics()

    //Render
    pop.draw();
}