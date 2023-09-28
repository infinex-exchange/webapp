function refreshCaptcha(email) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: config.apiUrl + '/account/register/captcha',
            type: 'POST',
            data: JSON.stringify({
                email: email
            }),
            datatype: 'json'
        })
        .done(function (data) {
            if(data.success) {
                $('#reg-captcha-img').attr('src', data.img);
                window.captchaChallenge = data.challenge;
                resolve();   
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
        });
    });
}

$(document).ready(function() {
    $('#reg-email').on('input', function() {
        if(validateEmail($(this).val()))
            $('#help-email').hide();
        else
            $('#help-email').show();
    });
    
    $('#reg-password').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-password').hide();
        else
            $('#help-password').show();
    });
    
    $('#reg-password, #reg-password2').on('input', function() {
        if($('#reg-password').val() == $('#reg-password2').val())
            $('#help-password2').hide();
        else
            $('#help-password2').show();        
    });
    
    $('#reg-captcha').on('input', function() {
        if(validateCaptchaResp($(this).val()))
            $('#help-captcha').hide();
        else
            $('#help-captcha').show();
    });
    
    $('#reg-captcha-change').click(function() {
        refreshCaptcha($('#reg-email').val());
    });
    
    $('#reg-form-step1').submit(function(event) {
        event.preventDefault();
        
        var email = $('#reg-email').val();
        var password = $('#reg-password').val();
        var password2 = $('#reg-password2').val();
        
        if(!validateEmail(email) || !validatePassword(password) || password != password2) {
            msgBox('Fill the form correctly');
            return;
        }
        
        refreshCaptcha(email).then(function(data) {
            $('#reg-form-step1-wrapper').hide();
            $('#reg-form-step2-wrapper').show();
        }).catch(function(err) {
        });
    });
    
    $('#reg-form-step2').submit(function(event) {
        event.preventDefault();
        
        var email = $('#reg-email').val();
        var password = $('#reg-password').val();
        var captchaResponse = $('#reg-captcha').val();
        var captchaChallenge = window.captchaChallenge;
        
        if(!validateCaptchaResp(captchaResponse)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        var data = {
            email: email,
            password: password,
            captcha_challenge: captchaChallenge,
            captcha_response: captchaResponse
        };
        
        // Refid
        if(localStorage.getItem('refid') !== null) {
            var expires = localStorage.getItem('refid_expires');
            var date = new Date();
            if(date <= expires)
                Object.assign(data, {
                    refid: parseInt(localStorage.getItem('refid'))
                });
        }
        
        $.ajax({
            url: config.apiUrl + '/account/register',
            type: 'POST',
            data: JSON.stringify(data),
            datatype: 'json'
        })
        .done(function (data) {
            if(data.success) {
                window.location.replace('/account/verify?email=' + encodeURI(email));
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
        });
    });
    
    window.renderingStagesTarget = 1;
    $('#reg-form-step2-wrapper').hide();
    $(document).trigger('renderingStage');
});