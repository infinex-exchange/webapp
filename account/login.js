$(document).ready(function() {
    fvLogin = new FormValidator(
        $('#login-form'),
        function(data) {
            data.email = data.email.toLowerCase();
            data['remember'] = $('#login-remember').prop('checked');
            
            api2fa(
                'POST',
                '/account/v2/sessions',
                data
            ).then(function (resp) {
                sessionStorage.setItem('apiKey', resp.apiKey);
                sessionStorage.setItem('userName', data.email);
            
                if(data.remember) {
                    localStorage.setItem('_apiKey', resp.apiKey);
                    localStorage.setItem('_userName', data.email);
                }
            
                let redirectUrl = '/';
                let urlParams = new URLSearchParams(window.location.search);
                let back = urlParams.get('back');
                if(back != null)
                    redirectUrl = window.location.origin + back;
                window.location.replace(redirectUrl);
            });
        }
    );
    fvLogin.text('email', $('#login-email'), true, validateEmail);
    fvLogin.text('password', $('#login-password'), true, validatePassword);
});