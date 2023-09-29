window.renderingStage = 0;
window.multiEvents = {};

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

$(document).ready(function() {
    if(typeof window.renderingStagesTarget === 'undefined')
        $(document).trigger('renderingComplete');
});