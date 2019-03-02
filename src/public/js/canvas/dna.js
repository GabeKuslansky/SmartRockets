let mutateChance = 0.001;
function DNA(genes) 
{
	//Generate random if passing in a number
	//Or use passed in genes array
	if(typeof genes == 'number'){
		this.genes = [];
		for(var i = 0; i < genes; i++){
			this.genes.push(p5.Vector.random2D());
		}
	}
	else{
		this.genes = genes;
	}

////////////////////////////////////

}

DNA.crossoverRandom = function(parentA, parentB)
{
	var newgenes = [];
	for (var i = 0; i < parentA.genes.length; i++)
	{
	  var rand = random(1);
	  if (rand > .5)
	  {
		newgenes.push(parentA.genes[i]);
	  } 
	  else
	  {
		newgenes.push(parentB.genes[i]);
	  }
	}
	return new DNA(newgenes);
}

DNA.crossoverMidpoint = function(parentA, parentB)
{
	var newgenes = [];
	var midpoint = random(parentA.genes.length - 1);
	for (var i = 0; i < parentA.genes.length; i++){
		if(i < midpoint)
			newgenes.push(parentA.genes[i]);
		else
			newgenes.push(parentB.genes[i]);
	}
		
	return new DNA(newgenes);
}


DNA.prototype.mutate = function()
{
	for (var i = 0; i < this.genes.length; i++)
	{
	  if (random(1) < mutateChance) 
		this.genes[i] = p5.Vector.random2D();
	}
}