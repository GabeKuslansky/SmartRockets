
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
        editor.selectedObject.scale.x = value;
    }
});

$('#scaleYForm').change(function() {
    const value = $(this).val();
    let scale = Number(value);
    if(scale != 0){
        editor.selectedObject.scale.y = value;
    }
});

$('#positionXForm').change(function() {
    const value = $(this).val();
    //change start position if there is no population
    if(level.population == null)
        editor.selectedObject.startPosition.x = Number(value);
    else
        editor.selectedObject.position.x = Number(value);
});

$('#positionYForm').change(function() {
    const value = $(this).val();
    //change start position if there is no population
    if(level.population == null)
        editor.selectedObject.startPosition.y = Number(value);
    else
        editor.selectedObject.position.y = Number(value);
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