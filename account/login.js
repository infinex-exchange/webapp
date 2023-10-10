$(document).ready(function() {
    let formLogin = new Form(
        $('#login-form'),
        function(data) {
            console.log(data);
            alert(data);
        }
    );
    formLogin.text('email', true, validateEmail);
    formLogin.text('password', true, validatePassword);
    /*$('#login-form').submit(function(event) {
        event.preventDefault();
        
        let email = $('#login-email').val().toLowerCase();
        let password = $('#login-password').val();
        let remember = $('#login-remember').prop('checked');
        
        if(!validateEmail(email) ||
           !validatePassword(password)
        ) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api2fa(
            'POST',
            '/account/v2/sessions',
            {
                email: email,
                password: password,
                remember: remember
            }
        ).then(function (data) {
            sessionStorage.setItem('apiKey', data.apiKey);
            sessionStorage.setItem('userName', email);
        
            if(remember) {
                localStorage.setItem('_apiKey', data.apiKey);
                localStorage.setItem('_userName', email);
            }
        
            let redirectUrl = '/';
            let urlParams = new URLSearchParams(window.location.search);
            let back = urlParams.get('back');
            if(back != null)
                redirectUrl = window.location.origin + back;
            window.location.replace(redirectUrl);
        });
    });*/ 
});