function strMiddleCut(s, chars) {
    return s.substr(0, chars) + '...' + s.substr(-chars);
}

function gotoUiCard(card) {
    $('[data-ui-card]').addClass('d-none');
    $('[data-ui-card~="' + card + '"]').removeClass('d-none');
    $('.nav-link[data-ui-card-target]').removeClass('active');
    $('.nav-link[data-ui-card-target~="' + card + '"]').addClass('active');
}

function copyButton(t) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(
                $($(t).data('copy')).html()
            );
            var icon = $(t).find('.fa-copy');
            icon.removeClass('fa-copy').addClass('fa-check');
            setTimeout(function() {
                icon.removeClass('fa-check').addClass('fa-copy');
            }, 1000);
        }
}

$( document ).ready(function() {
    // Dropdown on hover
    $('.dropdown-on-hover').hover(function() {
        $(this).find('.dropdown-menu').addClass('show');
    },
    function() {
        $(this).find('.dropdown-menu').removeClass('show');
    });
    
    // Mobile navbar
    $('.nav-link[data-ui-card-target]').onFirst('click', function() {
        gotoUiCard($(this).attr('data-ui-card-target'));        
    });
    
    var urlCard = window.location.hash.substr(1);
    if($('[data-ui-card~="' + urlCard + '"]').length)
        gotoUiCard(urlCard);
    else {
        var initialLink = $('.nav-link.active[data-ui-card-target]');
        if(initialLink.length) {
            var icTarget = initialLink.data('ui-card-target');
            if($('[data-ui-card~="' + icTarget + '"]').length)
                gotoUiCard(icTarget);
            else
                initialLink.removeClass('active');
        }
    }
    
    // Auto active menu item
    var loc = window.location.pathname;
    if(loc.startsWith('/')) loc = loc.substr(1);
    if(loc.endsWith('/')) loc = loc.slice(0, -1);
    
    $('.auto-active').each(function() {
        var href = $(this).attr('href');
        if(href.startsWith('/')) href = href.substr(1);
        if(href.endsWith('/')) href = href.slice(0, -1);
        
        if(loc == href)
            $(this).addClass('active');
    });
    
    $('.auto-active-group').each(function() {
        if($(this).parent().find('.auto-active.active').length !== 0)
            $(this).addClass('active');
    });
    
    // user-scalable=no not works on iOS
    document.addEventListener('dblclick', (event) => {
        event.preventDefault()
    }, { passive: false });
    
    // Copy button
    $('.copy-button').on('click', function() {
        copyButton(this);
    });
    
    // Range with value label
    $('.range-value').each(function() {
        var valItem = $(this);
        $('#' + $(this).attr('for')).on('input _input', function() {
            valItem.html($(this).val() + valItem.attr('suffix'));
            var left = $(this).val() / $(this).attr('max') * $(this).width() - (valItem.width() / 2);
            if(left < 0) left = 0;
            if(left > $(this).width() - valItem.width()) left = $(this).width() - valItem.width();
            valItem.css('left', left);
        }).trigger('input');
    });
    
    // Store refid
    var usp = new URLSearchParams(window.location.search);
    if(usp.has('r')) {
        var refid = usp.get('r');
        var date = new Date();
        var expires = date.getTime() + (3 * 24 * 60 * 60 * 1000);
        localStorage.setItem('refid', refid);
        localStorage.setItem('refid_expires', expires);
    }
    
    // Init tooltips
    $('[data-toggle="tooltip"]').tooltip();
});
