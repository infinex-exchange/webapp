$( document ).on('authChecked', function() {
    if(loggedIn) {
        $('.navbar-user-name').html(userName);
    }
});