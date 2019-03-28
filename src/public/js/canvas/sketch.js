
let canvas, level = new Level(), editor, cameraSpeed = 10, cameraPosition, gamePaused, levelShouldLoad = false;

const width = 600, height = 600, arrayOfObjects = [];
const rocketFrameRate = 60;

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	if(createLevel)
		level.initLevel();
	if(editing)
		editor = new LevelEditorContainer(width, height);
	cameraPosition = createVector(0, 0);
	frameRate(rocketFrameRate);
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

		//W
		if(keyIsDown(87)){
		  cameraPosition.y += cameraSpeed;
		}
		//A
		if(keyIsDown(65)){
		  cameraPosition.x += cameraSpeed;
		}
		//S
		if(keyIsDown(83)){
		  cameraPosition.y -= cameraSpeed;
		}
		//D
		if(keyIsDown(68)){
		  cameraPosition.x -= cameraSpeed;
		}
		//SpaceBar
		if(keyIsDown(32)){
		  cameraPosition.x = 0;
		  cameraPosition.y = 0;
		}
		//update level
		if(!gamePaused){
			level.update();
		
		//Update Physics
			updatePhysics();
		}

		//Render
		//camera pos
		translate(cameraPosition.x, cameraPosition.y);
		level.draw();
		
		if(editing)
			editor.draw();
	}
	if(levelShouldLoad){
		level.initLevel();
		levelShouldLoad = false;
	}
}	

function mousePressed(){
	
	if(editing)
		editor.mousePressed();
}

function mouseReleased(){
	if(editing)
		editor.mouseReleased();
}

function organizeCanvasForDOM() {
	const htmlCanvas = document.getElementById('defaultCanvas0');
	$(htmlCanvas).appendTo('#canvasContainer');
	$(htmlCanvas).css({position: '', left: '', top: ''}).addClass('');
}