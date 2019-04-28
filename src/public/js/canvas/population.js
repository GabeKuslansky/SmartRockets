let populationSize = 50;
let populationLifespan = 360;
let currentSelection = 0;
let crossoverSelection = 0;
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
		this.rockets.push(new Rocket(level.spawnCoordinate.position.x, level.spawnCoordinate.position.y, new DNA(this.lifespan)));
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
	
	

	//Selection
	var matingPool = [];
	switch(currentSelection){

		//Natural
		case 0:
			//Add highest fitness to mating pool. Ensure mating pool is half of population
			while(matingPool.length <= this.rockets.length/2){
				for(var i = 0; i < this.rockets.length && matingPool.length <= this.rockets.length/2; i++){
					if(random(1) < this.rockets[i].fitness){
						matingPool.push(this.rockets[i]);
					}
				}
			}
			break;

		//Best Half
		case 1:
			//Get best half of fitness
			//first sort rockets by fitness
			this.rockets.sort(function(a, b){return b.fitness-a.fitness}); //descending order with index 0 highest
			for(let i = 0; i <= this.rockets.length/2; i++){
				matingPool.push(this.rockets[i]);
			}
			break;

		default:
			throw "Selection Type Not Found!";
	}

		
	//Delete rockets
	this.deletePopulation();
	
	//Create population
	var newPop = [];
	let size = populationSize;
	let currentCrossoverSelection = crossoverSelection;
	for(var i = 0; i < size; i++){
		//Get indexes of parents
		var parentA = int(random(0, matingPool.length-1));
		var parentB = int(random(0, matingPool.length-1));
		
		//Make sure parents dont equal each other. Need to have at least 2 rockets
		while(parentA == parentB && matingPool.length != 1)
			parentB = int(random(0, matingPool.length-1));
		
		switch(currentCrossoverSelection){
			//midpoint crossover
			case 0:
				this.rockets.push(new Rocket(level.spawnCoordinate.position.x, level.spawnCoordinate.position.y, DNA.crossoverRandom(matingPool[parentA].DNA, matingPool[parentB].DNA)));
				break;
			//random
			case 1:
				this.rockets.push(new Rocket(level.spawnCoordinate.position.x, level.spawnCoordinate.position.y, DNA.crossoverMidpoint(matingPool[parentA].DNA, matingPool[parentB].DNA)));
				break;
			default:
				throw "No Crossover Type Found!";
		}
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
	
	level.reset()

}
