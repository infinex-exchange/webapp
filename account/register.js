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
    window.fvStep1 = new FormValidator(
        $('#reg-form-step1'),
        function(data) {
            data.email = data.email.toLowerCase();
            delete data.password2;
            window.step1Data = data;
            
            refreshCaptcha(data.email).then(function() {
                $('#reg-form-step1-wrapper').hide();
                $('#reg-form-step2-wrapper').show();
            });
            
            return true;
        }
    );
    window.fvStep1.text(
        'email',
        $('#reg-email'),
        true,
        validateEmail,
        'Incorrect e-mail format'
    );
    window.fvStep1.text(
        'password',
        $('#reg-password'),
        true,
        function(val) {
            $('#reg-password2').trigger('input');
            return validatePassword(val);
        },
        'The password must be at least 8 characters long and contain one lowercase letter, ' +
        'one uppercase letter, and one digit'
    );
    window.fvStep1.text(
        'password2',
        $('#reg-password2'),
        true,
        function(val) {
            return val == $('#reg-password').val();
        },
        'Passwords does not match'
    );
    
    window.fvStep2 = new FormValidator(
        $('#reg-form-step2'),
        function(data) {
            data = { ...data, ...window.step1Data };
            data['captchaChallenge'] = window.captchaChallenge;
            
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
            ).then(function() {
                window.location.replace('/account/verify?email=' + encodeURI(data.email));
            });
            
            return true;
        }
    );
    window.fvStep2.text(
        'captchaResponse',
        $('#reg-captcha'),
        true,
        validateCaptchaResp,
        'Captcha must be 4 characters long, case is ignored, no zeros and "O" letters'
    );
    
    $('#reg-captcha-change').click(function() {
        refreshCaptcha(window.step1Data.email);
    });
    
    $('#reg-form-step2-wrapper').hide();
    $(document).trigger('renderingStage');
});

function validateCaptchaResp(captcha) {
    return captcha.match(/^[a-np-zA-NP-Z1-9]{4}$/);
}