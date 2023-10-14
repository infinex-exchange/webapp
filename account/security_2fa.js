function reload2faProviders() {
    api(
        'GET',
        '/account/v2/mfa/providers'
    ).then(function(data) {
        $.each(data.providers, function(k, v) {
            let div = $('.2fa-provider[data-provider="' + k + '"]');
            if(v.configured) {
                div.find('.status-avbl').show();
                div.find('.status-not-avbl').hide();
                div.find('.btn-configure').hide();
                div.find('.btn-remove').show();
                if(v.enabled) {
                    div.find('.status-active').show();
                    div.find('.status-not-active').hide();
                    div.find('.btn-use').hide();
                }
                else {
                    div.find('.status-active').hide();
                    div.find('.status-not-active').show();
                    div.find('.btn-use').show();
                }
            }
            else {
                div.find('.status-avbl').hide();
                div.find('.status-not-avbl').show();
                div.find('.btn-configure').show();
                div.find('.btn-remove').hide();
                div.find('.status-active, .status-not-active, .btn-use').hide();
            }
        });
        
        $(document).trigger('renderingStage');
    });
}

function reload2faCases() {
    api(
        'GET',
        '/account/v2/mfa/cases'
    ).then(function(data) {
        $.each(data.cases, function(k, v) {
            $('.2fa-case[data-case="' + k + '"]').prop('checked', v);
        });
                    
        $(document).trigger('renderingStage');
    });                 
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.qrcode = new QRCode("mc-qrcode", {
        correctLevel : QRCode.CorrectLevel.H
    });
                
    $('.btn-configure').on('click', function() {
        let provider = $(this).closest('.2fa-provider').data('provider');
        
        api2fa(
            'PUT',
            '/account/v2/mfa/providers/' + provider
        ).then(function(data) {
            if($(window).width() < 992) {
                window.location = data.url;
            }
            else {
                window.qrcode.clear();
                window.qrcode.makeCode(data.url);
                $('#modal-configure').modal('show');
            }
            
            reload2faProviders();
        });
    });
    
    $('.btn-remove').on('click', function() {
        let provider = $(this).closest('.2fa-provider').data('provider');
        
        api2fa(
            'DELETE',
            '/account/v2/mfa/providers/' + provider
        ).then(reload2faProviders);
    });
    
    $('.btn-use').on('click', function() {
        let provider = $(this).closest('.2fa-provider').data('provider');
        
        api2fa(
            'POST',
            '/account/v2/mfa/providers/' + provider
        ).then(reload2faProviders);
    });
    
    $('.btn-save-cases').on('click', function() {
        let cases = new Object();
        
        $('.2fa-case').each(function(){
            cases[ $(this).data('case') ] = $(this).prop('checked');
        });
        
        api2fa(
            'PATCH',
            '/account/v2/mfa/cases',
            {
                cases: cases
            }
        ).then(reload2faCases);
    });
    
    reload2faProviders();
    reload2faCases();
});