$(document).ready(function() {
    window.fvChp = new FormValidator(
        $('#chp-form'),
        function(data) {
            delete data.password2;
            
            api(
                'PUT',
                '/account/v2/password',
                data
            ).then(function() {
                msgBox('Your password has been changed', 'Success');
                window.fvChp.reset();
            });
            
            return true;
        }
    );
    window.fvChp.text(
        'oldPassword',
        $('#chp-old'),
        true,
        validatePassword,
        'The password must be at least 8 characters long and contain one lowercase letter, ' +
        'one uppercase letter, and one digit'
    );
    window.fvChp.text(
        'password',
        $('#chp-new'),
        true,
        function(val) {
            $('#chp-new2').trigger('input');
            return validatePassword(val);
        },
        'The password must be at least 8 characters long and contain one lowercase letter, ' +
        'one uppercase letter, and one digit'
    );
    window.fvChp.text(
        'password2',
        $('#chp-new2'),
        true,
        function(val) {
            return val == $('#chp-new').val();
        },
        'Passwords does not match'
    );
});