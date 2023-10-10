function getFeePrec(feeMin, feeMax) {
    let feeMinDec = new BigNumber(feeMin);
    let feeMaxDec = new BigNumber(feeMax);
    return Math.max(feeMinDec.dp(), feeMaxDec.dp());
}

function onCoinSelected(symbol) {
    $('#withdraw-step2, #withdraw-step3').hide();
    
    api(
        'GET',
        '/wallet/v2/balances/' + symbol
    ).then(
        function(data) {
            window.bnAvbl = new BigNumber(data.avbl);
            window.paAmount.setPrec(data.defaultPrec);
            window.paAmount.setRange(null, window.bnAvbl);
            
            window.selectNet.reset('/wallet/v2/io/networks?asset=' + symbol);
            
            $('#withdraw-step2').show();
        }
    );
    
    $('.asset-symbol').html(symbol);
}

function onNetSelected(symbol) {
    $('#withdraw-step3').hide();
    
    window.selectAdbk.reset('/wallet/v2/addressbook?network=' + symbol);
    
    api(
        'GET',
        '/wallet/v2/io/withdrawal/' + symbol + '/' + window.selectCoin.key
    ).then(function(data) {
        // Memo name
        if(data.memoName) {
            $('#withdraw-memo-name').html(data.memoName + ':');
            $('#withdraw-memo-wrapper').removeClass('d-none');
        }
        else {
            $('#withdraw-memo-wrapper').addClass('d-none');
        }
        
        // Warnings
        if(data.warnings.length > 0) {
            let warnHtml = data.warnings.join('<br><br>');
            $('#withdraw-warning-content').html(warnHtml);
            $('#withdraw-warning').removeClass('d-none')
        }
        else
            $('#withdraw-warning').addClass('d-none');
        
        // Operating warning
        if(data.operating)
            $('#withdraw-operating-warning').addClass('d-none');
        else
            $('#withdraw-operating-warning').removeClass('d-none');
            
        // Contract
        if(data.contract) {
            $('#withdraw-contract').html(data.contract);
            $('#withdraw-contract-wrapper').removeClass('d-none');
        }
        else {
            $('#withdraw-contract-wrapper').addClass('d-none');
        }
        
        // Setup amount input
        window.inpAmount.setPrec(data.prec);
        window.paAmount.setRange(data.minAmount);
        
        // Min amount
        $('#withdraw-amount-min').html(data.minAmount);
        
        // Setup fee input
        let feePrec = getFeePrec(data.feeMin, data.feeMax);
        window.inpFee.setPrec(feePrec);
        window.paFee.setPrec(feePrec);
        window.paFee.setRange(data.feeMin, data.feeMax);
        
        // Store fees to revert from internal transfer 0, 0
        window.origFeeMin = data.feeMin;
        window.origFeeMax = data.feeMax;
        
        // Reset form
        window.fvWithdrawal.reset();
        window.paFee.set(50);
        $('#withdraw-save').attr('checked', false).trigger('change');
    });
}

function onAdbkSelected(key, val, data) {
    if(key === null) {
        // Typed address
        toggleSaveAs(true);
        $('#withdraw-memo').val('').trigger('input');
    }
    else {
        // Selected address
        toggleSaveAs(false);
        $('#withdraw-memo').val(memo); // no need to validate
    }
}

function validateAddress(address) {
    return api(
        'POST',
        '/wallet/v2/io/withdrawal/' + window.selectNet.key,
        {
            address: address
        }
    ).then(function(data) {
        if(data.internal) {
            window.paFee.setRange(0, 0);
            $('#withdraw-internal-notice').removeClass('d-none');
        }
        else {
            window.paFee.setRange(window.origFeeMin, window.origFeeMax);
            $('#withdraw-internal-notice').addClass('d-none');
        }
        
        return data.validAddress;
    });
}

function validateMemo(memo) {
    return api(
        'POST',
        '/wallet/v2/io/withdrawal/' + window.selectNet.key,
        {
            memo: memo
        }
    ).then(function(data) {
        return data.validMemo;
    });
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.selectCoin = new SelectCoin(
        $('#select-coin'),
        '/wallet/v2/assets',
        onCoinSelected
    );
    
    window.selectNet = new SelectNet(
        $('#select-net'),
        null,
        onNetSelected,
        false,
        true
    );
    
    window.selectAdbk = new SelectAdbk(
        $('#select-adbk'),
        null,
        onAdbkSelected
    );
    
    window.inpAmount = new DecimalInput( $('#withdraw-amount') );
    window.paAmount = new PercentageAmount(
        window.inpAmount,
        $('#withdraw-amount-range')
    );
    
    window.inpFee = new DecimalInput( $('#withdraw-fee') );
    window.paFee = new PercentageAmount(
        window.inpFee,
        $('#withdraw-fee-range'),
        true,
        true
    );
    window.inpFee.onChange(
        function(val) {
            let newMax = window.bnAvbl.minus(val);
            if(newMax.isNegative())
                newMax = new BigNumber(0);
            window.paAmount.setRange(null, newMax);
            $('#withdraw-amount-max').html(
                darkBalance(newMax.toString(), window.paAmount.prec)
            );
        },
        true
    );
    
    window.fvWithdrawal = new FormValidator(
        $('#withdraw-form'),
        function(data) {
            console.log(data);
            /*
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
            */
            return true;
        }
    );
    window.fvWithdrawal.select(
        'address',
        window.selectAdbk,
        true,
        validateAddress,
        'Address is invalid',
        750
    );
    window.fvWithdrawal.text(
        'memo',
        $('#withdraw-memo'),
        false,
        validateMemo,
        'Memo is invalid',
        750
    );
    window.fvWithdrawal.text(
        'adbkSaveName',
        $('#withdraw-save-name'),
        false,
        validateAdbkName
    );
    window.fvWithdrawal.decimal(
        'amount',
        window.inpAmount,
        true
    );
    window.fvWithdrawal.decimal(
        'fee',
        window.inpFee,
        true
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
 
    // Expand save name
    $('#withdraw-save').on('change', function() {
        if (this.checked) {
            window.fvWithdrawal.setRequired('adbkSaveName', true);
            
            $('#withdraw-save-wrapper').addClass('ui-card-light');
            $('#withdraw-save-expand').show();
        } else {
            $('#withdraw-save-expand').hide();
            $('#withdraw-save-wrapper').removeClass('ui-card-light');
            
            window.fvWithdrawal.setRequired('adbkSaveName', false);
            $('#withdraw-save-name').val('').trigger('input');
        }
    });

    var txHistoryData = {
        api_key: window.apiKey,
        type: 'WITHDRAWAL'
    };
    initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true, 10);
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestWithdrawalXid) === 'undefied')
        return;
    
    let newItem = $('.tx-history-item[data-xid="' + window.latestWithdrawalXid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});