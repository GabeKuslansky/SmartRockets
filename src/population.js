function Population(size, lifespan, startx, starty){
	this.size = size;
	this.lifespan = lifespan;
	this.rockets = [];
		
	//Create population
	for(var i = 0; i < size; i++){
		this.rockets.push(new Rocket(startx, starty, i));
	}
	
}

Population.prototype.getIDs = function(){
	for(var i = 0; i < this.rockets.length; i++){
		console.log(this.rockets[i].getID());
	}
};

//Update
Population.prototype.update = function(){
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].update();
	}
};

//Draw
Population.prototype.draw = function(){
	for(var i = 0; i < this.rockets.length; i++){
		this.rockets[i].draw();
	}
};

//Get rocket by index
Population.prototype.getRocketByIndex = function(index){
	return this.rockets[index];
}