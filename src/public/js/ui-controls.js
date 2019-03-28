
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