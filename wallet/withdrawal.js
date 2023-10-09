window.timeoutTypingAddress = null;
window.timeoutTypingMemo = null;

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
            
            $('#withdraw-balance').html(
                darkBalance(
                    data.avbl,
                    window.paAmount.prec
                )
            );
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
        
        // Setup fee input
        let feePrec = getFeePrec(data.feeMin, data.feeMax);
        window.inpFee.setPrec(feePrec);
        window.paFee.setPrec(feePrec);
        window.paFee.setRange(data.feeMin, data.feeMax);
        window.paFee.set(50);
        
        // Store fees to revert from internal transfer 0, 0
        window.origFeeMin = data.feeMin;
        window.origFeeMax = data.feeMax;
        
        // Reset form
        window.validAddress = false;
        window.validMemo = true;
        $('#withdraw-save').prop('checked', false).trigger('change');
        
        $('#withdraw-step3').show();
        $('html, body').animate({
            scrollTop: $("#withdraw-step3").offset().top
        }, 1000);
    });
}

function onAdbkSelected(key, val, data) {
    let memo;
    
    if(key === null) {
        // Typed address
        $('#withdraw-save-wrapper').show();
        memo = null;
        
        clearTimeout(window.timeoutTypingAddress);
        window.timeoutTypingAddress = setTimeout(
            function() {
                validateAddress(val)
            },
            750
        )
    }
    else {
        // Selected address
        $('#withdraw-save-wrapper').hide();
        memo = data.memo;
    }
    
    $('#withdraw-memo').val(memo ? memo : '');
}

function validateAddress(address) {
    window.validAddress = false;
    
    api(
        'POST',
        '/wallet/v2/io/withdrawal/' + window.selectNet.key,
        {
            address: address
        }
    ).then(function(data) {
        window.validAddress = data.validAddress;
        
        if(data.validAddress)
            $('#help-address').hide();
        else
            $('#help-address').show();
        
        if(data.internal) {
            window.paFee.setRange(0, 0);
            $('#withdraw-internal-notice').removeClass('d-none');
        }
        else {
            window.paFee.setRange(window.origFeeMin, window.origFeeMax);
            $('#withdraw-internal-notice').addClass('d-none');
        }
    });
}

function validateMemo(memo) {
    if(memo == '') {
        window.validMemo = true;
        $('#help-memo').hide();
        return;
    }
    
    window.validMemo = false;
    
    api(
        'POST',
        '/wallet/v2/io/withdrawal/' + window.selectNet.key,
        {
            memo: memo
        }
    ).then(function(data) {
        window.validMemo = data.validMemo;
        
        if(data.validMemo)
            $('#help-memo').hide();
        else
            $('#help-memo').show();
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
            window.paAmount.setRange(null, newMax);
            $('#withdraw-amount-max').html(
                darkBalance(newMax.toString(), window.paAmount.prec)
            );
        },
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
        alert(1);
        if (this.checked) {
            $('#withdraw-save-wrapper').addClass('ui-card-light');
            $('#withdraw-save-expand').show(); 
        } else {
            $('#withdraw-save-expand').hide();
            $('#withdraw-save-wrapper').removeClass('ui-card-light');
            $('#withdraw-save-name').val('');
            window.validAdbkName = false;
            $('#help-save-name').hide();
        }
    });
    
    // Validate save name
    $('#withdraw-save-name').on('input', function() {
	    if(validateAdbkName($(this).val())) {
		    window.validAdbkName = true;
		    $('#help-save-name').hide();
	    }
	    else {
		    window.validAdbkName = false;
		    $('#help-save-name').show();
	    }
    });
    
    // Validate memo
    $('#withdraw-memo').on('input', function() {
        clearTimeout(window.timeoutTypingMemo);
        window.timeoutTypingMemo = setTimeout(
            function() {
                validateMemo( $('#withdraw-memo').val() );
            },
            750
        );
    });
    
    // Submit withdrawal
    $('#withdraw-form').on('submit', function(event) {
        event.preventDefault();
        
        // Validate data
        var address = $('#select-adbk').val();
        if(address == '') {
            msgBox('Missing address');
            return;
        }
        
        var amount = new BigNumber($('#withdraw-amount').data('val'));
        if(amount.isNaN() || amount.isZero()) {
            msgBox('Missing amount');
            return;
        }
        
        var fee = new BigNumber($('#withdraw-fee').val());
        
        var adbkSave = $('#withdraw-save').prop('checked');
        var adbkName = $('#withdraw-save-name').val();
        if(adbkSave && adbkName == '') {
	        msgBox('Missing saved address name');
	        return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['asset'] = $('#select-coin').val();
        data['network'] = $('#select-net').data('network');
        data['address'] = address;
        data['amount'] = amount.toFixed(window.wdAmountPrec);
        data['fee'] = fee.toFixed(window.wdAmountPrec);
        
        var memo = $('#withdraw-memo').val();
        if(memo != '')
            data['memo'] = memo;
            
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        if(adbkSave)
	        data['adbk_name'] = adbkName;
        
        if(!window.validAddress ||
           (memo != '' && !window.validMemo) ||
           (adbkSave && !window.validAdbkName))
        {
	        msgBox('Fill the form correctly');
	        return;
        }
            
        // Post
        $.ajax({
            url: config.apiUrl + '/wallet/withdraw',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#withdraw-step2').hide();
                $('#withdraw-step3').hide();
                window.latestWithdrawalXid = data.xid;
                updateTxHistory();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
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