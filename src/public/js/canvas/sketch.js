
let canvas, level = new Level(), editor;

const width = 600, height = 600, arrayOfObjects = [];

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	if(createLevel)
		level.initLevel();
	if(editing)
		editor = new LevelEditorContainer(width, height);
}

function draw() {
	//Clear
	background(204, 198, 198);

	if(level.initialized){
		//Stroke weight
		strokeWeight(5);
		
		//Update Input
		if(editing)
			editor.update();

		//update level
		level.update();
		
		//Update Physics
		updatePhysics()

		//Render
		level.draw();
		
		if(editing)
			editor.draw();
	}
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