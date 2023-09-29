window.renderingStagesTarget = 1;

$(document).ready(function() {
    $('#forget-email').on('input', function() {
        if(validateEmail($(this).val()))
            $('#help-email').hide();
        else
            $('#help-email').show();
    });
    
    $('#forget-code').on('input', function() {
        if(validateVeriCode($(this).val()))
            $('#help-code').hide();
        else
            $('#help-code').show();
    });
    
    $('#forget-password').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-password').hide();
        else
            $('#help-password').show();
    });
    
    $('#forget-password, #forget-password2').on('input', function() {
        if($('#forget-password').val() == $('#forget-password2').val())
            $('#help-password2').hide();
        else
            $('#help-password2').show();        
    });
    
    $('#forget-form-step1').submit(function(event) {
        event.preventDefault();
        
        let email = $(this).find('#forget-email').val();
        
        if(!validateEmail(email)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'DELETE',
            '/account/password'
        ).then(function() {
            $('#forget-form-step1-wrapper').hide();
            $('#forget-form-step2-wrapper').show();
        });
    });
    
    $('#forget-form-step2').submit(function(event) {
        event.preventDefault();
        
        let email = $('#forget-email').val();
        let code = $('#forget-code').val();
        let password = $('#forget-password').val();
        let password2 = $('#forget-password2').val();
        
        if(!validateVeriCode(code) || !validatePassword(password) || password != password2) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'PATCH',
            '/account/password',
            {
                email: email,
                code: code,
                password: password
            }
        ).then(function() {
            msgBox(
                'Your password was changed. Login now',
                'Success',
                '/account/login'
            );
        });
    });
    
    let urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get('email');
    let code = urlParams.get('code');
    
    if( ( email != null && !validateEmail(email) ) ||
        ( code != null && !validateVeriCode(code) )
    ) {
        msgBox('This action cannot be performed. Check if the copied link is correct.', null, '/');
        return;
    }
    
    if(email != null && code != null) {
        $('#forget-form-step1-wrapper').hide();
        $('#forget-email').val(email);
        $('#forget-code').val(code);
        $('#forget-code').trigger('input');
    } else {
        $('#forget-form-step2-wrapper').hide();
    }
    
    $(document).trigger('renderingStage');    
});