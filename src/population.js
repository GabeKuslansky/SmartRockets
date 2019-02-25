function Population(size, lifespan, startx, starty){
	this.size = size;
	this.lifespan = lifespan;
	this.rockets = [];
	this.currentGene = 0;
	this.startx = startx;
	this.starty = starty;
	
	this.target = new Target(300, 50, 20);
		
	//Create population
	this.createRandomPop();
}

//Create random population
Population.prototype.createRandomPop = function(){
	//Create population
	for(var i = 0; i < this.size; i++){
		this.rockets.push(new Rocket(this.startx, this.starty, new DNA(this.lifespan), this.target));
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
	this.target.draw();
};

//Get rocket by index
Population.prototype.getRocketByIndex = function(index){
	return this.rockets[index];
}

//Create New Generation
Population.prototype.nextGeneration = function(){
	
	//Calculate fitness
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].calcFitness();
	}
	
	//Sort rockets by fitness value. 0 index the best
	this.rockets.sort(function(a, b){return b.fitness - a.fitness});
	
	//Max fitness un-normalized
	var maxFitness = this.rockets[0].fitness;
	
	//console.log(maxFitness);
	
	//Normalize fitness
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].fitness /= maxFitness;
	}
	
	
	var matingPool = [];
	
	//Add highest fitness to mating pool.
	for(var i = 0; i < this.rockets.length; i++){
		if(random(1) < this.rockets[i].fitness)
			matingPool.push(this.rockets[i]);
	}
	
	//Delete rockets
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].deleteRocket();
	}
	this.rockets = [];

	//Create population
	for(var i = 0; i < this.size; i++){
		//Get indexes of parents
		var parentA = int(random(0, matingPool.length-1));
		var parentB = int(random(0, matingPool.length-1));
		
		//Make sure parents dont equal each other. Need to have at least 2 rockets
		if(matingPool.length != 1)
			while(parentA != parentB)
				parentB = int(random(0, this.size-1));
		
		this.rockets.push(new Rocket(this.startx, this.starty, DNA.crossoverMidpoint(matingPool[parentA].DNA, matingPool[parentB].DNA), this.target))
	}
	
	//Mutate DNA
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].DNA.mutate();
	}
}





function Target(x, y, radius){
	
	this.position = createVector(x, y);
	this.radius = radius;
	
}
//Draw
Target.prototype.draw = function(){
	
	circle(this.position.x, this.position.y, this.radius);
}