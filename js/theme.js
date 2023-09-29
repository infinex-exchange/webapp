function setTheme(theme) {
    $('link.theme-css').attr('rel', 'stylesheet alternate');
    $(`link.theme-css[data-theme="${theme}"]`).attr('rel', 'stylesheet');
    
    $('.theme-switch').hide();
    $(`.theme-switch[data-theme!="${theme}"]`).show();
    
    localStorage.setItem('theme', theme);
    
    if(typeof(window.multiEvents['themeInitialized']) != 'undefined')
        $(document).trigger('themeChanged', theme);
    else
        $(document).trigger('themeInitialized', theme);
}

$(document).ready(function() {
    let lcTheme = localStorage.getItem('theme');
    setTheme(lcTheme ? lcTheme : 'dark');
    
    $('.theme-switch').click(function() {
        setTheme( $(this).data('theme') );
    });
});

$(document).onFirst('themeInitialized', function() {
    window.multiEvents['themeInitialized'] = true;
});