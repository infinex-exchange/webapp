$(document).ready(function() {
    $('#login-form, #tfa-form').submit(function(event) {
        event.preventDefault();
        
        var email = $('#login-email').val().toLowerCase();
        var password = $('#login-password').val();
        var remember = $('#login-remember').prop('checked');
        var tfa = $('#tfa-code').val();
        
        if(!email.length ||
           !password.length ||
           ($(this).is('#tfa-form') && !tfa.length)
        ) {
            msgBox('Fill the form correctly');
            return;
        }
        
        var data = {
            email: email,
            password: password,
            remember: remember
        };
        
        if(tfa.length)
	        data = Object.assign(data, {code_2fa: tfa});
    
        $.ajax({
            url: config.apiUrl + '/account/login',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json"
        })
        .done(function (data) {
            if(data.success) {
                sessionStorage.setItem('apiKey', data.api_key);
                sessionStorage.setItem('userName', email);
            
                if(remember) {
                    localStorage.setItem('_apiKey', data.api_key);
                    localStorage.setItem('_userName', email);
                }
            
                var redirectUrl = '/';
                var urlParams = new URLSearchParams(window.location.search);
                var back = urlParams.get('back');
                if(back != null) {
                    redirectUrl = window.location.origin + back;
                }
                window.location.replace(redirectUrl);
            } else if(data.need_2fa) {
	            $('#login-form, #tfa-form').toggleClass('d-grid d-none');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
        });
    });
    
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');    
});