window.renderingStagesTarget = 1;

$(document).ready(function() {
    window.fvStep1 = new FormValidator(
        $('#forget-form-step1'),
        function(data) {
            data.email = data.email.toLowerCase();
            window.step1Data = data;
            
            api(
                'DELETE',
                '/account/v2/password',
                data
            ).then(function() {
                $('#forget-form-step1-wrapper').hide();
                $('#forget-form-step2-wrapper').show();
            });
            
            return true;
        }
    );
    window.fvStep1.text(
        'email',
        $('#forget-email'),
        true,
        validateEmail,
        'Incorrect e-mail format'
    );
    
    window.fvStep2 = new FormValidator(
        $('#forget-form-step2'),
        function(data) {
            delete data.password2;
            data = { ...data, ...window.step1Data };
            
            api(
                'PATCH',
                '/account/v2/password',
                data
            ).then(function() {
                msgBox(
                    'Your password was changed. Login now',
                    'Success',
                    '/account/login'
                );
            });
            
            return true;
        }
    );
    window.fvStep2.text(
        'code',
        $('#forget-code'),
        true,
        validateVeriCode,
        'Code must be 6 digits long'
    );
    window.fvStep2.text(
        'password',
        $('#forget-password'),
        true,
        function(val) {
            $('#forget-password2').trigger('input');
            return validatePassword(val);
        },
        'The password must be at least 8 characters long and contain one lowercase letter, ' +
        'one uppercase letter, and one digit'
    );
    window.fvStep2.text(
        'password2',
        $('#forget-password2'),
        true,
        function(val) {
            return val == $('#forget-password').val();
        },
        'Passwords does not match'
    );
    
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
        window.step1Data = { email: email };
        $('#forget-code').val(code).trigger('input');
    } else {
        $('#forget-form-step2-wrapper').hide();
    }
    
    $(document).trigger('renderingStage');    
});