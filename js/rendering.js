var renderingStage = 0;
var multiEvents = {};

$(document).on('renderingStage', function() {
    window.renderingStage++;

    if(window.renderingStage == window.renderingStagesTarget) {
        $(document).trigger('renderingComplete');
    }
});

$(document).onFirst('renderingComplete', function() {
    window.multiEvents['renderingComplete'] = true;
    $('.preloader-wrapper').fadeOut();
});