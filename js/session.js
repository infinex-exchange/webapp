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
            window.loggedIn = false;
            $(document).trigger('authChecked');
            return;
        }
        
        // Api key in local storage, need to check is still valid
        apiRawNoSession(
            'GET',
            '/account/sessions/current',
            null,
            tmpApiKey
        ).then(
            function() {
                // Session is valid, move api key to session storage and setup globals
                window.apiKey = tmpApiKey;
                window.userName = localStorage.getItem('_userName');
                window.loggedIn = true;
                
                sessionStorage.setItem('apiKey', apiKey);
                sessionStorage.setItem('userName', userName);
                
                $(document).trigger('authChecked');
            }
        ).catch(
            function() {
                // Session is invalid, destroy local storage vars
                
                window.loggedIn = false;
                
                localStorage.removeItem('_apiKey');
                localStorage.removeItem('_userName');
                
                $(document).trigger('authChecked');
            }
        );
        
        return;
    };
    
    // Api key present in session storage, setup globals
    window.apiKey = tmpApiKey;
    window.userName = sessionStorage.getItem("userName");
    window.loggedIn = true;
    
    $(document).trigger('authChecked');
});

$(document).onFirst('authChecked', function() {
    window.multiEvents['authChecked'] = true;
    
    if(window.loggedIn) {
        $('.guest-only').hide();
        $('.user-only').show();
        
        if($('#root').hasClass('guest-only'))
            msgBox('You have no authorization to view this site', null, '/');
    } else {
        $('.guest-only').show();
        $('.user-only').hide();
        
        if($('#root').hasClass('user-only'))
            gotoLogin();
    }
});