$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    initTxHistory(
        null,
        $('#transactions-data'),
        null,
        false,
        null
    );
});