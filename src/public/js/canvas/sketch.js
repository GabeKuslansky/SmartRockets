
let canvas, level;

const width = 600, height = 600, arrayOfObjects = [];

function setup() {
	canvas = createCanvas(width, height);
	level = new Level();
	level.initLevel();
	organizeCanvasForDOM();
	//Create population
	editor = new LevelEditorContainer(width, height);

}

function draw() {
	//Clear
	background(204, 198, 198);

	//Stroke weight
	strokeWeight(5);
	
	//Update Input
	editor.update();

	//update level
	level.update();
	
	//Update Physics
	updatePhysics()

	//Render
	level.draw();

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