function reload2faConfig() {
    $.ajax({
        url: config.apiUrl + '/account/2fa',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.providers, function(k, v) {
                var div = $('.2fa-provider[data-provider="' + k + '"]');
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
            
            $.each(data.cases, function(k, v) {
                $('.2fa-case[data-case="' + k + '"]').prop('checked', v);
            });
                    
            $(document).trigger('renderingStage');
        } else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });                 
}

$(document).ready(function() {
    window.qrcode = new QRCode("mc-qrcode", {
        correctLevel : QRCode.CorrectLevel.H
    });
                
    function btnConfigure(event) {
        event.preventDefault();
        
        var provider = $(this).closest('.2fa-provider').data('provider');
        if(typeof(provider) == 'undefined')
            provider = $(this).data('provider');
        else
            $('#2fa-form').data('provider', provider);
        
        $('#2fa-form').unbind('submit');
        $('#2fa-form').bind('submit', btnConfigure);
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['provider'] = provider
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        $.ajax({
            url: config.apiUrl + '/account/2fa/configure',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                if($(window).width() < 992) {
                    window.location = data.ga_qr;
                }
                else {
                    window.qrcode.clear();
                    window.qrcode.makeCode(data.ga_qr);
                    $('#modal-configure').modal('show');
                }
                
                reload2faConfig();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    }
    
    $('.btn-configure').on('click', btnConfigure);
    
    function btnRemove(event) {
        event.preventDefault();
        
        var provider = $(this).closest('.2fa-provider').data('provider');
        if(typeof(provider) == 'undefined')
            provider = $(this).data('provider');
        else
            $('#2fa-form').data('provider', provider);
        
        $('#2fa-form').unbind('submit');
        $('#2fa-form').bind('submit', btnRemove);
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['provider'] = provider;
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        $.ajax({
            url: config.apiUrl + '/account/2fa/remove',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                reload2faConfig();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    }
    
    $('.btn-remove').on('click', btnRemove);
    
    function btnUse(event) {
        event.preventDefault();
        
        var provider = $(this).closest('.2fa-provider').data('provider');
        if(typeof(provider) == 'undefined')
            provider = $(this).data('provider');
        else
            $('#2fa-form').data('provider', provider);
        
        $('#2fa-form').unbind('submit');
        $('#2fa-form').bind('submit', btnUse);
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['provider'] = provider;
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        $.ajax({
            url: config.apiUrl + '/account/2fa/use',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                reload2faConfig();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    }
    
    $('.btn-use').on('click', btnUse);
    
    function btnSaveCases(event) {
        event.preventDefault();
        
        $('#2fa-form').unbind('submit');
        $('#2fa-form').bind('submit', btnSaveCases);
        
        var cases = new Object();
        
        $('.2fa-case').each(function(){
            cases[ $(this).data('case') ] = $(this).prop('checked');
        });
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['cases'] = cases;
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        $.ajax({
            url: config.apiUrl + '/account/2fa/cases',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                reload2faConfig();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    }
    
    $('.btn-save-cases').on('click', btnSaveCases);
});

$(document).on('authChecked', function() {
    if(window.loggedIn)
        reload2faConfig();
});