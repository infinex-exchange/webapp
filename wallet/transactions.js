$(document).ready(function() {
    window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var txHistoryData = {
            api_key: window.apiKey
        };
        initTxHistory($('#transactions-data'), $('#transactions-preloader'), txHistoryData, false, false);
    }
});