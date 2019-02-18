function Population(size, lifespan, startx, starty)
{
	this.size = size;
	this.lifespan = lifespan;
    this.rockets = [];
    this.mating = [];
		
	//Create population
    for (var i = 0; i < size; i++)
    {
		this.rockets.push(new Rocket(startx, starty, i));
	}
	
}

Population.prototype.getIDs = function ()
{
    for (var i = 0; i < this.rockets.length; i++)
    {
		console.log(this.rockets[i].getID());
	}
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
Population.prototype.getRocketByIndex = function (index)
{
	return this.rockets[index];
}

Population.prototype.evaluate = function () {
    var maxfit = 0;
    for (var i = 0; i < size; i++) {
        this.rockets[i].calcFitness();
        if (this.rockets[i].fitness > maxfit) maxfit = this.rockets[i].fitness;
    }

    for (var i = 0; i < size; i++) this.rockets[i].fitness /= maxfit;
    this.mating = [];
    for (var i = 0; i < popSize; i++) {
        var n = this.rockets[i].fitness * 100;
        for (var j = 0; j < n; j++) this.mating.push(this.rockets[i]);
    }
};

Population.prototype.selection = function () {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
        var parentA = random(this.mating);
        var parentB = random(this.mating);
        if (parentA.fitness > parentB.fitness) {
            var child = parentA.dna.crossover(parentB.dna);
        }
        else {
            var child = parentB.dna.crossover(parentA.dna);
        }
        child.mutation();
        newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
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
    for (var a = 0; a < popSize; a++) {
        this.rockets[a].update();
        this.rockets[a].show();
    }
};