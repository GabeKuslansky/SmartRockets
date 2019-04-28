
$('#populationSlider').change(function() {
    const value = $(this).val()
    populationSize = Number(value);
    $('#populationValue').text(value)
});

$('#mutationSlider').change(function() {
    const value = $(this).val();
    mutateChance = Number(value)/100;
    $('#mutationValue').text(value);
});

$('#lifespanSlider').change(function() {
    const value = $(this).val();
    populationLifespan = Number(value);

    const displayValue = (value/rocketFrameRate).toFixed(1)
    $('#lifespanValue').text(displayValue);
});

$('#scaleXForm').change(function() {
    const value = $(this).val();
    let scale = Number(value);
    let oldscale = editor.previousSelectedObject.scale.x;
    if(scale > 0){
        //check for collision
        editor.previousSelectedObject.scale.x = value;
        updatePhysics(false);
        if(checkCollision(editor.previousSelectedObject.physics) || 
                (level.target != null && level.target.intersectsTarget(editor.previousSelectedObject.physics)) ||
                (level.spawnCoordinate != null && level.spawnCoordinate.intersectsSpawnPoint(editor.previousSelectedObject.physics))){
            editor.previousSelectedObject.scale.x = oldscale;
            document.getElementById("scaleXForm").value = oldscale;
        }
    }
    else
        document.getElementById("scaleXForm").value = oldscale;
});

$('#scaleYForm').change(function() {
    const value = $(this).val();
    let scale = Number(value);
    let oldscale = editor.previousSelectedObject.scale.y;
    if(scale > 0){
        //check for collision
        editor.previousSelectedObject.scale.y = value;
        updatePhysics(false);
        if(checkCollision(editor.previousSelectedObject.physics)||
                (level.target != null && level.target.intersectsTarget(editor.previousSelectedObject.physics)) ||
                (level.spawnCoordinate != null && level.spawnCoordinate.intersectsSpawnPoint(editor.previousSelectedObject.physics))){
            editor.previousSelectedObject.scale.y = oldscale;
            document.getElementById("scaleYForm").value = oldscale;
        }
    }
    else
        document.getElementById("scaleYForm").value = oldscale;
});

$('#positionXForm').change(function() {
    const value = $(this).val();

    let previous = editor.previousSelectedObject.position.x;
    editor.previousSelectedObject.position.x = Number(value);
    if(checkCollision(editor.previousSelectedObject.physics)||
                (level.target != null && level.target.intersectsTarget(editor.previousSelectedObject.physics)) ||
                (level.spawnCoordinate != null && level.spawnCoordinate.intersectsSpawnPoint(editor.previousSelectedObject.physics))){
        editor.previousSelectedObject.position.x = previous;
    }

    //change start position if there is no population
    if(level.population == null)
        editor.previousSelectedObject.startPosition.x = editor.previousSelectedObject.position.x;
    
});

$('#positionYForm').change(function() {
    const value = $(this).val();

    let previous = editor.previousSelectedObject.position.y;
    editor.previousSelectedObject.position.y = Number(value)*-1; //y flipped
    if(checkCollision(editor.previousSelectedObject.physics)||
                (level.target != null && level.target.intersectsTarget(editor.previousSelectedObject.physics)) ||
                (level.spawnCoordinate != null && level.spawnCoordinate.intersectsSpawnPoint(editor.previousSelectedObject.physics))){
        editor.previousSelectedObject.position.y = previous;
    }

    //change start position if there is no population
    if(level.population == null)
        editor.previousSelectedObject.startPosition.y = editor.previousSelectedObject.position.y;
});

$('#forceXForm').change(function() {
    const value = $(this).val();
    //change start force
    editor.selectedObject.startForce.x = Number(value);
});

$('#forceYForm').change(function() {
    const value = $(this).val();
    //change start force
    editor.previousSelectedObject.startForce.y = Number(value)*-1; //y flipped
});

$('#rotateXForm').change(function() {
    const value = $(this).val();
    //change rotation point
    editor.previousSelectedObject.rotationPoint.x = Number(value);
});

$('#rotateYForm').change(function() {
    const value = $(this).val();
    //change rotation point
    editor.previousSelectedObject.rotationPoint.y = Number(value)*-1; //y flipped
});

$('#intervalForm').change(function() {
    const value = $(this).val();
    //change rotation interval
    editor.previousSelectedObject.step = Number(value);
});

function togglePause(val){
    if (val === undefined) {
        gamePaused = !gamePaused;
    } else {
        gamePaused = val;
    }

    const btn = $('#togglePauseBtn');
    gamePaused ? btn.removeClass('btn-danger').addClass('btn-success').html('<i class="fa fa-play"></i>') : btn.addClass('btn-danger').removeClass('btn-success').html('<i class="fa fa-pause"></i>');
}

function setFollow(){
    
    followRocket = true;
 
    const btn = $('#togglePauseBtn');
    gamePaused ? btn.removeClass('btn-danger').addClass('btn-success').html('<i class="fa fa-play"></i>') : btn.addClass('btn-danger').removeClass('btn-success').html('<i class="fa fa-pause"></i>');
}

function createPopulation(){
    if(level.initialized)
        level.createPopulation();
}
function killPopulation(){
    if(level.initialized)
        level.killPopulation();
}

function selectRotation(){
    editor.rotationPointSelect = true;
}

function dieOnImpact(){
    dieOnCollision = !dieOnCollision;
}

function fitnessSelectDistance(){
    $('#fitnessSelect').text("Distance Priority");
    currentFitness = 0;
}

function fitnessSelectDistanceTime(){
    $('#fitnessSelect').text("Distance & Time");
    currentFitness = 1;
}

function fitnessSelectDistanceTimePrio(){
    $('#fitnessSelect').text("Time Priority");
    currentFitness = 2;
}

function selectionSelectNatural(){
    $('#selectionSelect').text("Natural");
    currentSelection = 0;
}

function selectionSelectBest(){
    $('#selectionSelect').text("Best");
    currentSelection = 1;
}

function crossoverSelectMidpoint(){
    $('#crossoverSelect').text("Midpoint");
    crossoverSelection = 0;
}

function crossoverSelectRandom(){
    $('#crossoverSelect').text("Random");
    crossoverSelection = 1;
}

function toggleKinematic(){
    editor.previousSelectedObject.physics.isKinematic = !editor.previousSelectedObject.physics.isKinematic;
}