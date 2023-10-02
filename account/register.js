window.renderingStagesTarget = 1;

function refreshCaptcha(email) {
    return api(
        'GET',
        '/account/v2/signup/captcha?email=' + encodeURI(email)
    ).then(function(data) {
        $('#reg-captcha-img').attr('src', data.img);
        window.captchaChallenge = data.challenge;
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
        
        let email = $('#reg-email').val();
        let password = $('#reg-password').val();
        let password2 = $('#reg-password2').val();
        
        if(!validateEmail(email) || !validatePassword(password) || password != password2) {
            msgBox('Fill the form correctly');
            return;
        }
        
        refreshCaptcha(email).then(function() {
            $('#reg-form-step1-wrapper').hide();
            $('#reg-form-step2-wrapper').show();
        });
    });
    
    $('#reg-form-step2').submit(function(event) {
        event.preventDefault();
        
        let email = $('#reg-email').val();
        let password = $('#reg-password').val();
        let captchaResponse = $('#reg-captcha').val();
        
        if(!validateCaptchaResp(captchaResponse)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        let data = {
            email: email,
            password: password,
            captchaChallenge: window.captchaChallenge,
            captchaResponse: captchaResponse
        };
        
        // Refid
        if(localStorage.getItem('refid') !== null) {
            let expires = localStorage.getItem('refid_expires');
            let date = new Date();
            if(date <= expires)
                data['refid'] = parseInt(localStorage.getItem('refid'));
        }
        
        api(
            'POST',
            '/account/v2/signup',
            data
        ).then(function(data) {
            window.location.replace('/account/verify?email=' + encodeURI(email));
        });
    });
    
    $('#reg-form-step2-wrapper').hide();
    $(document).trigger('renderingStage');
});