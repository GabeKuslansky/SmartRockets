
$('#populationSlider').change(function() {
    const value = $(this).val()
    level.population.size = value;
    $('#populationValue').text(value)
});

$('#mutationSlider').change(function() {
    const value = $(this).val();
    mutateChance = value/100;
    $('#mutationValue').text(value);
});

$('#lifespanSlider').change(function() {
    const value = $(this).val();
    level.population.lifespan = value;

    const displayValue = (value/rocketFrameRate).toFixed(1)
    $('#lifespanValue').text(displayValue);
});

function togglePause(val){
    if (val === undefined) {
        gamePaused = !gamePaused;
    } else {
        gamePaused = val;
    }

    const btn = $('#togglePauseBtn');
    gamePaused ? btn.removeClass('btn-danger').addClass('btn-success').html('Play <i class="fa fa-play"></i>') : btn.addClass('btn-danger').removeClass('btn-success').html('Pause <i class="fa fa-pause"></i>');
}