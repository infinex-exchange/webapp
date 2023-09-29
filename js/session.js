function logOut() {
    api(
        'DELETE',
        '/account/sessions/current'
    ).finally(function() {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('apiKey');
        localStorage.removeItem('_userName');
        localStorage.removeItem('_apiKey');
        
        window.location.replace('/account/login');
    });
}

function gotoLogin() {
    window.location.replace('/account/login?back=' + encodeURI(window.location.pathname));
}

$(document).ready(function() {
    let tmpApiKey = sessionStorage.getItem("apiKey");
    if(tmpApiKey === null) {
        // No apiKey in session storage, but may be in local storage if remember=true
        
        tmpApiKey = localStorage.getItem("_apiKey");
        if(tmpApiKey === null) {
            // No apiKey in local storage, not logged in
            var loggedIn = false;
            $(document).trigger('authChecked');
            return;
        }
        
        // Api key in local storage, need to check is still valid
        rawApi(
            'GET',
            '/account/sessions/current',
            {},
            tmpApiKey
        ).done(
            function(data) {
                // Session is valid, move api key to session storage and setup globals
                var apiKey = tmpApiKey;
                var userName = localStorage.getItem('_userName');
                var loggedIn = true;
                
                sessionStorage.setItem('apiKey', apiKey);
                sessionStorage.setItem('userName', userName);
                
                $(document).trigger('authChecked');
            }
        ).fail(
            function(jqXHR, textStatus, errorThrown) {
                // Session is invalid, destroy local storage vars
                
                var loggedIn = false;
                
                localStorage.removeItem('_apiKey');
                localStorage.removeItem('_userName');
                
                $(document).trigger('authChecked');
            }
        );
        
        return;
    };
    
    // Api key present in session storage, setup globals
    var apiKey = tmpApiKey;
    var userName = sessionStorage.getItem("userName");
    var loggedIn = true;
    
    $(document).trigger('authChecked');
});

$(document).onFirst('authChecked', function() {
    window.multiEvents['authChecked'] = true;
    
    if(window.loggedIn) {
        $('.guest-only').hide();
        $('.user-only').show();
        
        if($('#root').hasClass('guest-only'))
            msgBox('You have no authorization to view this site', '/');
    } else {
        $('.guest-only').show();
        $('.user-only').hide();
        
        if($('#root').hasClass('user-only'))
            gotoLogin();
    }
});