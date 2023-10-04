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
        let icon = $(t).find('.fa-copy');
        icon.removeClass('fa-copy').addClass('fa-check');
        setTimeout(function() {
            icon.removeClass('fa-check').addClass('fa-copy');
        }, 1000);
    }
}

function prettyBalance(amount, prec) {
    let bn = new BigNumber(amount);
    if(bn.isZero())
        return '0';
    bn = bn.dp(prec, BigNumber.ROUND_DOWN);
    if(bn.isZero())
        return '< 0.' + '0'.repeat(prec-1) + '1';
    else
        return bn.toString();
}

$(document).ready(function() {
    // Dropdown on hover
    $('.dropdown-on-hover').hover(
        function() {
            $(this).find('.dropdown-menu').addClass('show');
        },
        function() {
            $(this).find('.dropdown-menu').removeClass('show');
        }
    );
    
    // Mobile navbar
    $('.nav-link[data-ui-card-target]').onFirst('click', function() {
        gotoUiCard($(this).attr('data-ui-card-target'));        
    });
    
    // Select ui card from url# or default
    let urlCard = window.location.hash.substr(1);
    if($('[data-ui-card~="' + urlCard + '"]').length)
        gotoUiCard(urlCard);
    else {
        let initialLink = $('.nav-link.active[data-ui-card-target]');
        if(initialLink.length) {
            let icTarget = initialLink.data('ui-card-target');
            if($('[data-ui-card~="' + icTarget + '"]').length)
                gotoUiCard(icTarget);
            else
                initialLink.removeClass('active');
        }
    }
    
    // Auto active menu item
    let loc = window.location.pathname;
    if(loc.startsWith('/')) loc = loc.substr(1);
    if(loc.endsWith('/')) loc = loc.slice(0, -1);
    
    $('.auto-active').each(function() {
        let href = $(this).attr('href');
        if(href.startsWith('/')) href = href.substr(1);
        if(href.endsWith('/')) href = href.slice(0, -1);
        
        if(loc == href)
            $(this).addClass('active');
    });
    
    $('.auto-active-group').each(function() {
        if($(this).parent().find('.auto-active.active').length !== 0)
            $(this).addClass('active');
    });
    
    // Fix for user-scalable=no not working on iOS
    document.addEventListener('dblclick', (event) => {
        event.preventDefault()
    }, { passive: false });
    
    // Copy button
    $('.copy-button').on('click', function() {
        copyButton(this);
    });
    
    // Range with value label
    $('.range-value').each(function() {
        let valItem = $(this);
        $('#' + $(this).attr('for')).on('input _input', function() {
            valItem.html($(this).val() + valItem.attr('suffix'));
            let left = $(this).val() / $(this).attr('max') * $(this).width() - (valItem.width() / 2);
            if(left < 0) left = 0;
            if(left > $(this).width() - valItem.width()) left = $(this).width() - valItem.width();
            valItem.css('left', left);
        }).trigger('input');
    });
    
    // Store refid
    let usp = new URLSearchParams(window.location.search);
    if(usp.has('r')) {
        let refid = usp.get('r');
        let date = new Date();
        let expires = date.getTime() + (3 * 24 * 60 * 60 * 1000);
        localStorage.setItem('refid', refid);
        localStorage.setItem('refid_expires', expires);
    }
    
    // Init tooltips
    $('[data-toggle="tooltip"]').tooltip();
});
