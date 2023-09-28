function setColorModeInternal(colorMode) {
    if(colorMode == 'dark') {
        $('#css-dark').attr('rel', 'stylesheet');
        $('#css-light').attr('rel', 'stylesheet alternate');
    }
    else if(colorMode == 'light') {
        $('#css-dark').attr('rel', 'stylesheet alternate');
        $('#css-light').attr('rel', 'stylesheet');
    }
}

if(localStorage.getItem("colorMode") === null) {
    localStorage.setItem('colorMode', 'dark');
}    
setColorModeInternal(localStorage.getItem('colorMode'));

function setColorMode(colorMode) {
    setColorModeInternal(colorMode);
    if(colorMode == 'dark') {
        $('#switch-to-dark').hide();
        $('#switch-to-light').show();
    }
    else if(colorMode == 'light') {
        $('#switch-to-dark').show();
        $('#switch-to-light').hide();
    }
    localStorage.setItem('colorMode', colorMode);
    if(typeof(window.multiEvents['themeInitialized']) != 'undefined')
        $(document).trigger('themeChanged', colorMode);
}

$(document).ready(function() {
    setColorMode(localStorage.getItem('colorMode'));
    $(document).trigger('themeInitialized');
    
    $('#switch-to-dark').click(function() {
        setColorMode('dark');
    });

    $('#switch-to-light').click(function() {
        setColorMode('light');
    });
});

$(document).onFirst('themeInitialized', function() {
    window.multiEvents['themeInitialized'] = true;
});