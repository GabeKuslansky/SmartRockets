function Population(lifespan, startx, starty, m, size)
{
    this.mutationRate = m;
    this.population = new Array(size);
    this.mating = [];
    this.generation = 0;
	this.size = size;
	this.lifespan = lifespan;
    this.rockets = [];
    this.mating = [];

    for (var i = 0; i < size; i++) {
        var position = createVector(startx / 2, starty + 20);
        this.population[i] = new Rocket(position, new DNA(), size, startx, starty);
    }
    /*
	//Create population
    for (var i = 0; i < size; i++)
    {
		this.rockets.push(new Rocket(startx, starty, i));
	}
	*/
}

Population.prototype.getIDs = function ()
{
    for (var i = 0; i < this.rockets.length; i++)
    {
		console.log(this.rockets[i].getID());
	}
};

Population.prototypes.live = function (ob) {
    for (var i = 0; i < this.population.length; i++) {
        this.population[i].checkTarget();
    }
};

Population.prototype.targetReached = function () {
    for (var i = 0; i < this.population.length; i++) {
        if (this.population[i].hitTarget) return true;
    }
    return false;
};

//Update
Population.prototype.update = function ()
{
    for (var i = 0; i < this.rockets.length; i++)
    {
		this.rockets[i].update();
	}
};

//Draw
Population.prototype.draw = function ()
{
    for (var i = 0; i < this.rockets.length; i++)
    {
		this.rockets[i].draw();
	}
};

//Get rocket by index
Population.prototype.getRocketByIndex = function (index) {
    return this.rockets[index];
};

Population.prototype.evaluate = function () {
    var maxFitness = this.getMaxFitness(); //calc total fitness of whole population
    for (var i = 0; i < this.population.length; i++) {
        var fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
        var n = int(fitnessNormal * 100);
        for (var j = 0; j < n; j++) {
            this.matingPool.push(this.population[j]);
        }
    }
};

Population.prototype.selection = function () {
    for (var i = 0; i < this.population.length; i++) {
        var A = int(random(this.matingPool.length));
        var B = int(random(this.matingPool.length));
        var parentA = this.matingPool[A];
        var parentB = this.matingPool[B];
        var parentAgenes = parentA.getDNA();
        var parentBgenes = parentB.getDNA();
        var child = parentAgenes.crossover(parentBgenes);
        child.mutate(this.mutationRate);
        var position = createVector(width / 2, height + 20);
        this.population[i] = new Rocket(position, child, this.population.length);
    }
    this.generations++;
};

Population.prototype.failed = function ()
{
    for (var i = 0; i < this.rockets.length; i++)
    {
        if (!this.rockets[i].crashed) return false;
    }
    return true;
};

Population.prototype.run = function () {
    for (var a = 0; a < size; a++) {
        this.rockets[a].update();
        this.rockets[a].draw();
    }
};

Population.prototype.getGenerations = function () {
    return this.generations;
};

Population.prototype.fitness = function () {
    for (var i = 0; i < this.population.length; i++) {
        this.population[i].fitness();
    }
};

Population.prototype.getMaxFitness = function () {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
        if (this.population[i].getFitness() > record) {
            record = this.population[i].getFitness();
        }
    }
    return record;
};