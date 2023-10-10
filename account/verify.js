window.renderingStagesTarget = 1;

$(document).ready(function() {
    window.fvVerify = new FormValidator(
        $('#verify-form'),
        function(data) {
            data['email'] = window.emailAddr;
            
            api(
                'PATCH',
                '/account/v2/signup',
                data
            ).then(function() {
                msgBox(
                    'Your account is registered and active. Login now.',
                    'Success',
                    '/account/login'
                );
            });
            
            return true;
        }
    );
    window.fvVerify.text(
        'code',
        $('#verify-code'),
        true,
        validateVeriCode,
        'Code must be 6 digits long'
    );
    
    let urlParams = new URLSearchParams(window.location.search);
    
    let email = urlParams.get('email');
    let code = urlParams.get('code');
    
    if(email == null) {
        msgBox(
            'This action cannot be performed. Check if the copied link is correct.',
            null,
            '/'
        );
        return;
    }
    
    window.emailAddr = email;
    $('#verify-email-addr').html(email);
    
    if(code != null && validateVeriCode(code) ) {
        $('#verify-code').val(code).trigger('input');
        $('#verify-form').submit();
    }

    $(document).trigger('renderingStage');
   
});