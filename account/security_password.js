$(document).ready(function() {
    $('#chp-old').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-chp-old').hide();
        else
            $('#help-chp-old').show();
    });
    
    $('#chp-new').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-chp-new').hide();
        else
            $('#help-chp-new').show();
    });
    
    $('#chp-new, #chp-new2').on('input', function() {
        if($('#chp-new').val() == $('#chp-new2').val())
            $('#help-chp-new2').hide();
        else
            $('#help-chp-new2').show();        
    });
    
    $('#chp-form').submit(function(event) {
        event.preventDefault();
        
        let oldP = $('#chp-old').val();
        let newP = $('#chp-new').val();
        let newP2 = $('#chp-new2').val();
        
        if(!validatePassword(oldP) || !validatePassword(newP) || newP != newP2) {
            msgBox('Fill the form correctly');
            return;
        }
        
        api(
            'PUT',
            '/account/password',
            {
                oldPassword: oldP,
                password: newP
            }
        ).then(function() {
            msgBox('Your password has been changed', 'Success');
        });
    });
});