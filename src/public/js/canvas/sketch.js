
let canvas, level = new Level(), gamePaused, levelShouldLoad = false;
let backimg;
let clipBlack;
let clipEarth;
let clipMars;
let clipRocket;
let clipSatellite;
let clipAsteroid;
let clipSign;
let clipSattelite2

const width = 800, height = 800;
const tile_size = 400;
const columns = width/tile_size;
const rows = height/tile_size;
const rocketFrameRate = 60;

let deleteQueue = [];

//Camera stuff
let cameraPosition, cameraTarget, trackedRocket, canSwap = true;
let followRocket = false;
const lerpDist = 0.08;
const cameraSpeed = 10;
const swapPeriod = 3000;



function preload(){
	backimg = loadImage('/public/images/assets/SpaceBackground.jpg');
	clipBlack = loadImage('/public/images/assets/Black_hole.png');
	clipEarth = loadImage('/public/images/assets/earth.png');
	clipEarth.resize(100,100);
	clipMars = loadImage('/public/images/assets/mars.png');
	clipRocket = loadImage('/public/images/assets/rockets.png');
	clipRocket.resize(25,25);
	clipSatellite = loadImage('/public/images/assets/satteliteFixed.png');
	clipSatellite.resize(120,80);
	clipAsteroid = loadImage('/public/images/assets/asteroidBetter.png');
	clipAsteroid.resize(100,100);
	clipSign = loadImage('/public/images/assets/ufoSign.png');
	clipSattelite2= loadImage('/public/images/assets/image(2).png');
	clipSattelite2.resize(100,60)
}

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	if(createLevel){
		level.initLevel();
		editor = new Editor(width, height);
		canvas.mousePressed(mousePressedCallback);
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
		updatePhysics(!gamePaused && level.population != null);

		//camera pos
		cameraPosition.x = lerp(cameraPosition.x, cameraTarget.x, lerpDist);
		cameraPosition.y = lerp(cameraPosition.y, cameraTarget.y, lerpDist);
		push();
		for(let row = -1; row < rows+1; row++){
			for(let column = -1; column < columns+1; column++){
				image(backimg, row*tile_size+(cameraPosition.x%tile_size), column*tile_size+(cameraPosition.y%tile_size), tile_size, tile_size);
			}
		}
		translate(cameraPosition.x, cameraPosition.y);
		level.draw();
		pop();

		//Render Editor
		if(createLevel)
		editor.draw();
		

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
	if(createLevel)
		editor.mouseDragged();
}

function keyPressed(){
	if(createLevel)
		editor.keyPressed();
}

function mousePressedCallback(){
	editor.mousePressed();
}

function mouseReleased(){
	if(createLevel)
		editor.mouseReleased();
}

function organizeCanvasForDOM() {
	const htmlCanvas = document.getElementById('defaultCanvas0');
	$(htmlCanvas).appendTo('#canvasContainer').addClass('border border-dark border-rounded');
	$(htmlCanvas).css({position: '', left: '', top: ''}).addClass('');
}