function Population(size, lifespan, startx, starty){
	this.size = size;
	this.lifespan = lifespan;
	this.rockets = [];
	this.currentGene = 0;
	this.startx = startx;
	this.starty = starty;
			
	//Create population
	this.createRandomPop();
	
	this.maxFitness = 0;
}

//Create random population
Population.prototype.createRandomPop = function(){
	//Create population
	for(var i = 0; i < this.size; i++){
		this.rockets.push(new Rocket(this.startx, this.starty, new DNA(this.lifespan), level.target));
	}
		
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
};

//Draw
Population.prototype.draw = function(){
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].draw();
	}
	
	push();
	textSize(32);
	fill(55, 145, 155);
	if(this.maxFitness == 1/level.target.radius)
		text("Max Fitness: MAX", 10, 30); 
	else
		text("Max Fitness: " + int(this.maxFitness*10000), 10, 30); 
	pop();

};

//Get rocket by index
Population.prototype.getRocketByIndex = function(index){
	return this.rockets[index];
}

//Create New Generation
Population.prototype.nextGeneration = function(){
	
	//Calculate fitness and max fitness
	this.maxFitness = 0;
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].calcFitness();
		if(this.maxFitness < this.rockets[i].fitness)
			this.maxFitness = this.rockets[i].fitness;
	}
		
	
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
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].deleteRocket();
	}

	this.rockets = [];
	

	//Create population
	var newPop = [];
	let size = this.size;
	for(var i = 0; i < size; i++){
		//Get indexes of parents
		var parentA = int(random(0, matingPool.length-1));
		var parentB = int(random(0, matingPool.length-1));
		
		//Make sure parents dont equal each other. Need to have at least 2 rockets
		while(parentA == parentB && matingPool.length != 1)
			parentB = int(random(0, matingPool.length-1));
		
		this.rockets.push(new Rocket(this.startx, this.starty, DNA.crossoverMidpoint(matingPool[parentA].DNA, matingPool[parentB].DNA), level.target));
	}
	
	
	//Mutate DNA
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].DNA.mutate();
	}
	
	
}
