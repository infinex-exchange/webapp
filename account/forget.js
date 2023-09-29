$(document).ready(function() {
    $('#forget-email').on('input', function() {
        if(validateEmail($(this).val()))
            $('#help-email').hide();
        else
            $('#help-email').show();
    });
    
    $('#forget-code').on('input', function() {
        if(validateVeriCode($(this).val()))
            $('#help-code').hide();
        else
            $('#help-code').show();
    });
    
    $('#forget-password').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-password').hide();
        else
            $('#help-password').show();
    });
    
    $('#forget-password, #forget-password2').on('input', function() {
        if($('#forget-password').val() == $('#forget-password2').val())
            $('#help-password2').hide();
        else
            $('#help-password2').show();        
    });
    
    $('#forget-form-step1').submit(function(event) {
        event.preventDefault();
        
        var email = $(this).find('#forget-email').val();
        
        if(!validateEmail(email)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/account/forget/step1',
            type: 'POST',
            data: JSON.stringify({
                email: email,
            }),
            datatype: 'json'
        })
        .done(function (data) {
            if(data.success) {
                $('#forget-form-step1-wrapper').hide();
                $('#forget-form-step2-wrapper').show();
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
        });
    });
    
    $('#forget-form-step2').submit(function(event) {
        event.preventDefault();
        
        var email = $('#forget-email').val();
        var code = $('#forget-code').val();
        var password = $('#forget-password').val();
        var password2 = $('#forget-password2').val();
        
        if(!validateVeriCode(code) || !validatePassword(password) || password != password2) {
            msgBox('Fill the form correctly');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/account/forget/step2',
            type: 'POST',
            data: JSON.stringify({
                email: email,
                code: code,
                password: password
            }),
            datatype: 'json'
        })
        .done(function (data) {
            if(data.success) {
                msgBoxRedirect('Your password was changed. Login now', '/account/login');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();
        });
    });
    
    window.renderingStagesTarget = 1;
    
    var urlParams = new URLSearchParams(window.location.search);
    var email = urlParams.get('email');
    var code = urlParams.get('code');
    
    if( ( email != null && !validateEmail(email) ) ||
        ( code != null && !validateVeriCode(code) )
    ) {
        msgBoxRedirect('This action cannot be performed. Check if the copied link is correct.', '/');
        return;
    }
    
    if(email != null && code != null) {
        $('#forget-form-step1-wrapper').hide();
        $('#forget-email').val(email);
        $('#forget-code').val(code);
        $('#forget-code').trigger('input');
    } else {
        $('#forget-form-step2-wrapper').hide();
    }
    
    $(document).trigger('renderingStage');    
});