$( document ).on('authChecked', function() {
    if(window.loggedIn) {
        $('.navbar-user-name').html(window.userName);
    }
});