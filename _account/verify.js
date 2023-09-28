$(document).ready(function() {   
    $('#verify-code').on('input', function() {
        if(validateVeriCode($(this).val()))
            $('#help-code').hide();
        else
            $('#help-code').show();
    });
    
    $('#verify-form').submit(function(event) {
        event.preventDefault();
        
        var code = $(this).find('#verify-code').val();
        
        if(!validateVeriCode(code)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/account/verify',
            type: 'POST',
            data: JSON.stringify({
                email: window.emailAddr,
                code: code
            }),
            datatype: 'json'
        })
        .done(function (data) {
            if(data.success) {
                msgBoxRedirect('Your account is registered and active. Login now.', '/account/login');
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
    
    if(email == null) {
        msgBoxRedirect('This action cannot be performed. Check if the copied link is correct.', '/');
        return;
    }
    
    window.emailAddr = email;
    $('#verify-email-addr').html(email);
    
    if(code != null && validateVeriCode(code) ) {
        $('#verify-code').val(code);
        $('#verify-form').submit();
    }

    $(document).trigger('renderingStage');
   
});