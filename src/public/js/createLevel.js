let levelStructure = {"index":0,"levelStructure":{"obstacles":[{"name":"BoxObstacle","x":150,"y":250}],"width":600,"height":600,"spawnCoordinate":{"x":300,"y":500},"populationSize":50,"lifespan":150,"target":{"x":300,"y":50,"r":40}},"metadata":{"views":0,"author":"someone","highestCompletionTime":0},"_id":"paG4iuqeBLgFczw8","createdAt":{"$$date":1553610336655},"updatedAt":{"$$date":1553610336655}}.levelStructure;
const editing = true;
const saveLevel = () => {
   const levelStructure = level.serialize();
    axios.post('/level', levelStructure);
}