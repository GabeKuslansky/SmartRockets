let backimg;
let clipBlack;
let clipEarth;
//let clipMars;
let clipRocket;
let clipSatellite;
let clipAsteroid;
let clipSign;

let canvas, level = new Level(), editor, cameraPosition, cameraTarget, gamePaused, levelShouldLoad = false, followRocket = true, trackedRocket, canSwap = true;

const width = 800, height = 800, arrayOfObjects = [];
const rocketFrameRate = 60;
const lerpDist = 0.08;
const cameraSpeed = 10;
const swapPeriod = 3000;

function preload(){
	backimg = loadImage('/public/images/assets/SpaceBackground.jpg');
	clipBlack = loadImage('/public/images/assets/Black_hole.png');
	clipEarth = loadImage('/public/images/assets/earth.png');
	//clipMars = loadImage('/public/images/assets/clipMars.png');
	clipRocket = loadImage('/public/images/assets/rockets.png');
	clipSatellite = loadImage('/public/images/assets/sattelite.png');
	clipAsteroid = loadImage('/public/images/assets/asteroidFixed.png');
	clipSign = loadImage('/public/images/assets/ufoSign.png');
}

function setup() {
	canvas = createCanvas(width, height);
	organizeCanvasForDOM();
	if(createLevel)
		level.initLevel();
	if(editing)
		editor = new LevelEditorContainer(width, height);
	cameraPosition = createVector(0, 0);
	cameraTarget = createVector(0, 0);
	frameRate(rocketFrameRate);
}

function draw() {
	//Clear
	background(255, 255, 255);
	image(backimg, 0, 0, width, height);
	if(level.initialized){
		//Stroke weight
		strokeWeight(5);
		
		//Update Input
		if(editing){
			editor.update();
		}
		
		if(followRocket){
			//check if we have a population
			if(level.initialized){
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
		
		//Update Physics
			updatePhysics();
		}

		//Render
		//camera pos
		cameraPosition.x = lerp(cameraPosition.x, cameraTarget.x, lerpDist);
		cameraPosition.y = lerp(cameraPosition.y, cameraTarget.y, lerpDist);
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
	$(htmlCanvas).appendTo('#canvasContainer').addClass('border border-dark border-rounded');
	$(htmlCanvas).css({position: '', left: '', top: ''}).addClass('');
}