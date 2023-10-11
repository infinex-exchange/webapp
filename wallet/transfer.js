function getMinAmount(prec) {
    let minAmount = new BigNumber(1);
    minAmount = minAmount.shiftedBy(-prec);
    return minAmount.toFixed(prec);
}

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
            window.paAmount.setRange(0, data.avbl);
            
            // Min amount
            $('#withdraw-amount-min').html(data.minAmount);
            
            // TODO: reset form, the same in withdrawal.js
            window.validAddress = false;
            window.validMemo = true;
            $('#withdraw-memo').val('');
            $('#withdraw-save').prop('checked', false).trigger('change');
            $('#transfer-form').get(0).reset();
            $('small[id^="help-"]').hide();
            $('#transfer-amount').data('val', '').val('').trigger('prevalidated');
            
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
    
    window.inpAmount = new DecimalInput( $('#withdraw-amount') );
    window.paAmount = new PercentageAmount(
        window.inpAmount,
        $('#withdraw-amount-range')
    );
        
    let pathArray = window.location.pathname.split('/');
    let pathLast = pathArray[pathArray.length - 1];
    if(pathLast != 'withdrawal' && pathLast != '') {
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
    
    // Validate address
    $('#transfer-address').on('input', function() {
        if(validateEmail($(this).val())) {
	        window.validAddress = true;
            $('#help-address').hide();
        }
        else {
	        window.validAddress = false;
            $('#help-address').show();
        }
    });
    
    // Validate memo
    $('#transfer-memo').on('input', function() {
        if(validateTransferMessage($(this).val())) {
            window.validMemo = true;
            $('#help-memo').hide();
        }
        else {
            window.validMemo = false;
            $('#help-memo').show();
        }
    });
    
    // Submit withdrawal
    $('#withdraw-form').on('submit', function(event) {
        event.preventDefault();
        
        let adbkSave = $('#withdraw-save').prop('checked');
        
        if(
            !window.validAddress ||
            !window.validMemo ||
            (adbkSave && !window.validAdbkName) ||
            window.inpAmount.get() === null
        ) {
            msgBox('Fill the form correctly');
            return;
        }
        
        
        let data = {
            type: 'WITHDRAWAL',
            asset: window.selectCoin.key,
            network: window.selectNet.key,
            address: window.selectAdbk.val,
            amount: window.inpAmount.get(),
            fee: window.inpFee.get()
        };
        
        let memo = $('#withdraw-memo').val();
        if(memo != '')
            data.memo = memo;
        
        if(adbkSave)
            data.adbkSaveName = $('#withdraw-save-name').val();
        
        api2fa(
            'POST',
            '/wallet/v2/transactions',
            data
        ).then(function(resp) {
            $('#withdraw-step3, #withdraw-step2').hide();
            selectCoin.reset();
            
            // TODO legacy code under this line
            window.latestWithdrawalXid = data.xid;
            updateTxHistory();
        });
    });

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