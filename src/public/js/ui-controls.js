
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
    if(scale != 0){
        editor.previousSelectedObject.scale.x = value;
    }
});

$('#scaleYForm').change(function() {
    const value = $(this).val();
    let scale = Number(value);
    if(scale != 0){
        editor.previousSelectedObject.scale.y = value;
    }
});

$('#positionXForm').change(function() {
    const value = $(this).val();
    //change start position if there is no population
    if(level.population == null)
        editor.previousSelectedObject.startPosition.x = Number(value);
    editor.previousSelectedObject.position.x = Number(value);
});

$('#positionYForm').change(function() {
    const value = $(this).val();
    //change start position if there is no population
    if(level.population == null)
        editor.previousSelectedObject.startPosition.y = Number(value)*-1; //y flipped
    editor.previousSelectedObject.position.y = Number(value)*-1; //y flipped
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

$('#rotationForm').click(function() {
    editor.updateRotation = false;
});

$('#rotationForm').change(function() {
    const value = $(this).val();
    //change start rotation if there is no population
    if(level.population == null)
        editor.previousSelectedObject.startRotation = Number(value);
    //change current rotation
    editor.previousSelectedObject.setRotation(Number(value));
    editor.updateRotation = true;
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