
let width = 600, height = 600, pop, levelEditorContainer, canvas;
function setup() {
  canvas = createCanvas(width, height);

  //Create population
  pop = new Population(1, 100, width/4, 0);
  pop.getIDs();

  levelEditorContainer = new LevelEditorContainer(width, height);

  phys = new PhysicsObject(createVector(width/2, 40), false)
  phys.addColliderBox(0, 0, 55, 55);
}

function draw() {

  //Clear
  background(0, 100, 200);

  //Update AI
  pop.update();

  //Update Physics
  updatePhysics()

  //Render
  pop.draw();
  levelEditorContainer.draw();
  rect(width/2, 40, 55, 55);
}
