
let canvas, level = new Level(), gamePaused, levelShouldLoad = false;

const width = 800, height = 800;
const rocketFrameRate = 60;

let deleteQueue = [];

//Camera stuff
let cameraPosition, cameraTarget, trackedRocket, canSwap = true;
let followRocket = false;
const lerpDist = 0.08;
const cameraSpeed = 10;
const swapPeriod = 3000;

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	if(createLevel){
		level.initLevel();
		editor = new Editor(width, height);
		canvas.mousePressed(mousePressedCallback);
		canvas.mouseReleased(mouseReleasedCallback);
	}
	cameraPosition = createVector(0, 0);
	cameraTarget = createVector(0, 0);
	frameRate(rocketFrameRate);
	rectMode(CENTER);
	//Stroke weight
	strokeWeight(5);
}

function draw() {
	//Clear
	background(204, 198, 198);

	if(level.initialized){

		//Events
		
		//Update Input
		if(createLevel)
			editor.update();

		if(followRocket){
			//check if we have a population
			if(level.population != null){
				if(canSwap){
					canSwap = false;
					setTimeout(function(){ canSwap = true;}, swapPeriod);
					trackedRocket = level.population.maxRocket;
				}
				if(trackedRocket != null){
					cameraTarget.x = -trackedRocket.position.x + width/2;
					cameraTarget.y = -trackedRocket.position.y + height/2
				}
			}
		}
		//W
		if(keyIsDown(87)){
			cameraTarget.y += cameraSpeed;
			followRocket = false;
		}
		//A
		if(keyIsDown(65)){
			cameraTarget.x += cameraSpeed;
			followRocket = false;
		}
		//S
		if(keyIsDown(83)){
			cameraTarget.y -= cameraSpeed;
			followRocket = false;
		}
		//D
		if(keyIsDown(68)){
			cameraTarget.x -= cameraSpeed;
			followRocket = false;
		}
		//SpaceBar
		if(keyIsDown(32)){
			cameraTarget.x = 0;
			cameraTarget.y = 0;
			followRocket = false;
		}
		//update level
		if(!gamePaused){
			level.update();
		}

		//Update Physics
		updatePhysics();

		//Render
		if(createLevel)
			editor.draw();
		//camera pos
		cameraPosition.x = lerp(cameraPosition.x, cameraTarget.x, lerpDist);
		cameraPosition.y = lerp(cameraPosition.y, cameraTarget.y, lerpDist);
		translate(cameraPosition.x, cameraPosition.y);
		level.draw();
		

	}
	else if(levelShouldLoad){
		level.initLevel();
		levelShouldLoad = false;
	}

	//Delete Queue
	  for(let i = 0; i < deleteQueue.length; i++){
		//Delete obstacle
		deleteQueue[i].deleteObstacle();
	}
	deleteQueue = [];
}

function mouseDragged(){
	editor.mouseDragged();
}

function keyPressed(){
	if(createLevel)
		editor.keyPressed();
}

function mousePressedCallback(){
	editor.mousePressed();
}

function mouseReleasedCallback(){
	editor.mouseReleased();
}

function organizeCanvasForDOM() {
	const htmlCanvas = document.getElementById('defaultCanvas0');
	$(htmlCanvas).appendTo('#canvasContainer').addClass('border border-dark border-rounded');
	$(htmlCanvas).css({position: '', left: '', top: ''}).addClass('');
}