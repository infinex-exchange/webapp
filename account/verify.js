window.renderingStagesTarget = 1;

$(document).ready(function() {   
    $('#verify-code').on('input', function() {
        if(validateVeriCode($(this).val()))
            $('#help-code').hide();
        else
            $('#help-code').show();
    });
    
    $('#verify-form').submit(function(event) {
        event.preventDefault();
        
        let code = $(this).find('#verify-code').val();
        
        if(!validateVeriCode(code)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'PATCH',
            '/account',
            {
                email: window.emailAddr,
                code: code
            }
        ).then(function() {
            msgBox(
                'Your account is registered and active. Login now.',
                'Success',
                '/account/login'
            );
        });
    });
    
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
        $('#verify-code').val(code);
        $('#verify-form').submit();
    }

    $(document).trigger('renderingStage');
   
});