let populationSize = 50;
let populationLifespan = 360;
function Population(){
		//size of population
		this.size = populationSize;
		//lifespan
		this.lifespan = populationLifespan;
		this.rockets = [];
		this.currentGene = 0;

		this.maxRocket = null;

		//Create population
		this.createRandomPop();
						
		this.maxFitness = 0;
		this.displayFitness = 0;
}

//Create random population
Population.prototype.createRandomPop = function(){
	//Create population
	for(var i = 0; i < this.size; i++){
		this.rockets.push(new Rocket(level.spawnCoordinate.x, level.spawnCoordinate.y, new DNA(this.lifespan), level.target));
	}
		
}

Population.prototype.deletePopulation = function(){
	for(let i = 0; i < this.rockets.length; i++)
		this.rockets[i].deleteRocket();
	this.rockets = [];
}

//Update
Population.prototype.update = function(){

	
	if(this.currentGene >= this.lifespan){
		//Generation lifespan over
		this.nextGeneration();
		this.currentGene = 0;
	}
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].update();
	}
	this.currentGene++;
	
	this.calcMaxFitness();

};

//Draw
Population.prototype.draw = function(){

	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].draw();
	}
	
	if(this.displayFitness == 1/level.target.radius)
		$('#maxFitnessValue').text('MAX'); 
	else
		$('#maxFitnessValue').text(int(this.displayFitness*10000), 10, 30); 


};

//Get rocket by index
Population.prototype.getRocketByIndex = function(index){
	return this.rockets[index];
}

Population.prototype.calcMaxFitness = function(){
	//Calculate fitness and max fitness
	this.maxFitness = 0;
	let index = null;
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].calcFitness();
		if(this.maxFitness < this.rockets[i].fitness){
			this.maxFitness = this.rockets[i].fitness;
			this.maxRocket = this.rockets[i];
		}
	}
}

//Create New Generation
Population.prototype.nextGeneration = function(){

	//reset camera follow
	canSwap = true;
		
	this.displayFitness = this.maxFitness;
	//Normalize fitness
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].fitness /= this.maxFitness;
	}
	
	
	var matingPool = [];
	
	//Add highest fitness to mating pool. Ensure mating pool is half of population
	while(matingPool.length <= this.rockets.length/2){
		for(var i = 0; i < this.rockets.length && matingPool.length <= this.rockets.length/2; i++){
			if(random(1) < this.rockets[i].fitness && !this.rockets[i].mating){
				matingPool.push(this.rockets[i]);
				this.rockets[i].mating = false;
			}
		}
	}
		
	//Delete rockets
	this.deletePopulation();
	

	//Create population
	var newPop = [];
	let size = populationSize;
	for(var i = 0; i < size; i++){
		//Get indexes of parents
		var parentA = int(random(0, matingPool.length-1));
		var parentB = int(random(0, matingPool.length-1));
		
		//Make sure parents dont equal each other. Need to have at least 2 rockets
		while(parentA == parentB && matingPool.length != 1)
			parentB = int(random(0, matingPool.length-1));
		
		this.rockets.push(new Rocket(level.spawnCoordinate.x, level.spawnCoordinate.y, DNA.crossoverMidpoint(matingPool[parentA].DNA, matingPool[parentB].DNA), level.target));
	}
	
	
	//Mutate DNA
	let lifespanDif = populationLifespan-this.lifespan;
	this.lifespan = populationLifespan;
	for(var i = 0; i < this.rockets.length; i++){
		//Resize DNA if needed
		if(lifespanDif > 0){
			for(let j = 0; j < lifespanDif; j++)
				this.rockets[i].DNA.genes.push(p5.Vector.random2D());
		}
		else if(lifespanDif < 0){
			for(let j = 0; j > lifespanDif; j--)
				this.rockets[i].DNA.genes.pop();
		}
		
		this.rockets[i].DNA.mutate();
	}
	
	level.objectReset();
}
