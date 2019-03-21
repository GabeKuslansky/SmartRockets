
let population, canvas;

const width = 600, height = 600, arrayOfObjects = [];

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	//Create population
	population = new Population(50, 150, width/2, height-100);
	arrayOfObjects.push(new BoxObstacle(150, 250));
	editor = new LevelEditorContainer(width, height);

}

function draw() {
	//Clear
	background(204, 198, 198);

	//Stroke weight
	strokeWeight(5);
	
	//Update Input
	editor.update();
	
	//Update AI
	population.update();

	//Update Physics
	updatePhysics()

	//Render
	population.draw();
	for(var i = 0; i < arrayOfObjects.length; i++)
	arrayOfObjects[i].draw();
	editor.draw();
}	

function mousePressed(){
	
	editor.mousePressed();
}

function mouseReleased(){
	editor.mouseReleased();
}

function organizeCanvasForDOM() {
	const htmlCanvas = document.getElementById('defaultCanvas0');
	$(htmlCanvas).appendTo('#canvasContainer');
	$(htmlCanvas).css({position: '', left: '', top: ''}).addClass('');
}