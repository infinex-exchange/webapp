$(document).ready(function() {
    $('#login-form, #tfa-form').submit(function(event) {
        event.preventDefault();
        
        let email = $('#login-email').val().toLowerCase();
        let password = $('#login-password').val();
        let remember = $('#login-remember').prop('checked');
        let tfa = $('#tfa-code').val();
        
        if(!email.length ||
           !password.length ||
           ($(this).is('#tfa-form') && !tfa.length)
        ) {
            msgBox('Fill the form correctly');
            return;
        }
        
        let data = {
            email: email,
            password: password,
            remember: remember
        };
        
        if(tfa.length)
	        data['code2FA'] = tfa;
        
        api(
            'POST',
            '/account/sessions',
            data
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
        })
        .catch(function(error) {
            if(error == 'REQUIRE_2FA')
                $('#login-form, #tfa-form').toggleClass('d-grid d-none');
        });
    }); 
});