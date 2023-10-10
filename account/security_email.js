function cheStep1() {
    $('#che-submit-btn').prop('disabled', true);
    $('#che-code-get').prop('disabled', false);
    $('#che-pending').addClass('d-none').removeClass('d-flex');
    window.fvStep1.reset();
    $('#form-che-step1').removeClass('d-none');
}

function cheStep2(newEmail) {
    $('#che-submit-btn').prop('disabled', false);
    $('#che-code-get').prop('disabled', true);
    $('#form-che-step1').addClass('d-none');
    $('#che-pending-email').html(newEmail);
    $('#che-pending').addClass('d-flex').removeClass('d-none');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.fvStep1 = new FormValidator(
        $('#form-che-step1'),
        function(data) {
            data.email = data.email.toLowerCase();
            
            api(
                'PUT',
                '/account/v2/email',
                data
            ).then(function() {
                cheStep2(data.email);
            });
            
            return true;
        }
    );
    window.fvStep1.text(
        'email',
        $('#che-email'),
        true,
        validateEmail,
        'Incorrect e-mail format'
    );
    window.fvStep1.text(
        'password',
        $('#che-password'),
        true,
        validatePassword,
        'The password must be at least 8 characters long and contain one lowercase letter, ' +
        'one uppercase letter, and one digit'
    );
    
    window.fvStep2 = new FormValidator(
        $('#form-che-step2'),
        function(data) {
            api(
                'PATCH',
                '/account/v2/email',
                data
            ).then(function() {
                msgBox('Your e-mail address has been changed', 'Success');
                cheStep1();
            });
            
            return true;
        }
    );
    window.fvStep2.text(
        'code',
        $('#che-code'),
        true,
        validateVeriCode,
        'Code must be 6 digits long'
    );
    
    $('#che-code-get').click(function() {
        $('#form-che-step1').submit();
    });
    
    $('#che-cancel').click(function() {
        api(
            'DELETE',
            '/account/v2/email',
        ).then(cheStep1);
    });
    
    api(
        'GET',
        '/account/v2/email'
    ).then(function(data) {
        if(data.pendingChange)
            cheStep2(data.pendingChange);
        else
            cheStep1();
        
        $(document).trigger('renderingStage');
    });
});