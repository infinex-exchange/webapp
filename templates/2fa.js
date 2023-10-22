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
    
    $('#2fa-submit').on('click', function() {
        $('#2fa-modal').modal('hide');
        setTimeout(function() {
            $('#2fa-code').val('');
        }, 200);
    });
});

function start2fa(provider) {
    $('#2fa-code').val('');
    $('#2fa-provider').html(provider);
    $('#2fa-submit').prop('disabled', true);  
    $('#2fa-modal').modal('show');
}