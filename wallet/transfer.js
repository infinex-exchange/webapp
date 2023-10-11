function onCoinSelected(symbol) {
    $('#transfer-step2').hide();
    
    api(
        'GET',
        '/wallet/v2/balances/' + symbol
    ).then(
        function(data) {
            // Setup amount input
            window.inpAmount.setPrec(data.defaultPrec);
            window.paAmount.setPrec(data.defaultPrec);
            let minAmount = new BigNumber(1);
            minAmount = minAmount.shiftedBy(-data.defaultPrec);
            window.paAmount.setRange(minAmount, data.avbl);
            
            // Min amount
            $('#withdraw-amount-min').html(data.minAmount);
            
            // Reset form
            window.fvTransfer.reset();
            
            $('#withdraw-step2').show();
        }
    );
    
    $('.asset-symbol').html(symbol);
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.selectCoin = new SelectCoin(
        $('#select-coin'),
        '/wallet/v2/assets',
        onCoinSelected
    );
    
    window.inpAmount = new DecimalInput( $('#transfer-amount') );
    window.paAmount = new PercentageAmount(
        window.inpAmount,
        $('#transfer-amount-range')
    );
    
    window.fvTransfer = new FormValidator(
        $('#transfer-form'),
        function(data) {
            data = {
                ...data,
                type: 'TRANSFER_OUT',
                asset: window.selectCoin.key
            };
            
            api2fa(
                'POST',
                '/wallet/v2/transactions',
                data
            ).then(function(resp) {
                $('#transfer-step2').hide();
                selectCoin.reset();
                
                // TODO legacy code under this line
                window.latestTransferXid = data.xid;
                updateTxHistory();
            });
            
            return true;
        }
    );
    window.fvTransfer.text(
        'address',
        $('#transfer-address'),
        true,
        validateEmail,
        'Invalid e-mail address'
    );
    window.fvTransfer.text(
        'memo',
        $('#withdraw-memo'),
        false,
        validateTransferMessage
    );
    window.fvTransfer.decimal(
        'amount',
        window.inpAmount,
        true
    );
        
    let pathArray = window.location.pathname.split('/');
    let pathLast = pathArray[pathArray.length - 1];
    if(pathLast != 'transfer' && pathLast != '') {
        let symbol = pathLast.toUpperCase();
        api(
            'GET',
            '/wallet/v2/assets/' + symbol
        ).then(
            function(data) {
                window.selectCoin.setCustom(data);
            }
        );
    }
    
    // TODO: legacy code

    var txHistoryData = {
        api_key: window.apiKey,
        type: ['TRANSFER_IN', 'TRANSFER_OUT']
    };
    initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true);
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestTransferXid) === 'undefied')
        return;
    
    var newItem = $('.tx-history-item[data-xid="' + window.latestTransferXid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});