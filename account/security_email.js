function cheStep1() {
    $('#che-submit-btn').prop('disabled', true);
    $('#che-code-get').prop('disabled', false);
    $('#che-pending').addClass('d-none').removeClass('d-flex');
    $('.che-step1').show();
    $('#che-form')[0].reset();
}

function cheStep2(newEmail) {
    $('#che-submit-btn').prop('disabled', false);
    $('#che-code-get').prop('disabled', true);
    $('.che-step1').hide();
    $('#che-pending-email').html(newEmail);
    $('#che-pending').addClass('d-flex').removeClass('d-none');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    $('#che-email').on('input', function() {
        if(validateEmail($(this).val()))
            $('#help-che-email').hide();
        else
            $('#help-che-email').show();
    });
    
    $('#che-password').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-che-password').hide();
        else
            $('#help-che-password').show();
    });
    
    $('#che-code').on('input', function() {
        if(validateVeriCode($(this).val()))
            $('#help-che-code').hide();
        else
            $('#help-che-code').show();
    });
    
    $('#che-form').submit(function(event) {
        event.preventDefault();
        
        let code = $('#che-code').val();
        
        if(!validateVeriCode(code)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'PATCH',
            '/account/email',
            {
                code: code
            }
        ).then(function() {
            msgBox('Your e-mail address has been changed', 'Success');
            chestep1();
        });
    });
    
    $('#che-code-get').click(function() {
        let email = $('#che-email').val();
        let pass = $('#che-password').val();
        
        if(!validateEmail(email) || !validatePassword(pass)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'PUT',
            '/account/email',
            {
                password: pass,
                email: email
            }
        ).then(function() {
            cheStep2(email);
        });
    });
    
    $('#che-cancel').click(function() {
        api(
            'DELETE',
            '/account/email',
        ).then(cheStep1);
    });
    
    api(
        'GET',
        '/account/email'
    ).then(function(data) {
        if(data.pendingChange)
            cheStep2(data.pendingChange);
        else
            cheStep1();
        
        $(document).trigger('renderingStage');
    });
});