function api2fa(method, url, data = null, redirectOnError = false) {
    return new Promise(function(resolve, reject) {
        function retry(code = null) {
            if(code)
                if(data === null)
                    data = {};
                data["code2FA"] = code;
            
            apiRaw(
                method,
                url,
                data
            ).then(
                resolve
            ).catch(
                function(error) {
                    if(error.code == 'REQUIRE_2FA' || error.code == 'INVALID_2FA') {
                        $('#2fa-code').val('');
                        $('#2fa-submit').prop('disabled', true);
                    }
                    
                    if(error.code == 'REQUIRE_2FA') {
                        $('#2fa-provider').html(error.msg);
                        
                        $('#2fa-form').unbind('submit').on('submit', function(event) {
                            event.preventDefault();
                            $('#2fa-modal').modal('hide');
                            retry( $('#2fa-code').val() );
                        });
                         
                        $('#2fa-modal').modal('show');
                    }
                    else if(error.code == 'INVALID_2FA') {
                        msgBox(
                            error.msg,
                            null,
                            function() {
                                $('#2fa-modal').modal('show');
                            }
                        );
                    }
                    
                    else {
                        msgBox(
                            error.msg,
                            null,
                            redirectOnError ? '/' : null
                        );
                    }
                }
            );
        }
        
        retry();
    });
}

$(document).ready(function() {
    $('#2fa-code').on('input', function() {
        if(validate2FA($(this).val())) {
            $('#help-2fa-code').hide();
            $('#2fa-submit').prop('disabled', false);  
        }
        else {
            $('#help-2fa-code').show();
            $('#2fa-submit').prop('disabled', true);  
        }
    });
});

function validate2FA(code) {
    return code.match(/^[0-9]{4,20}$/);
}