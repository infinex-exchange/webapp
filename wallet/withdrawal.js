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
            
            $('#withdraw-balance').html(data.avbl);
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
        
        $('#withdraw-step3').show();
        $('html, body').animate({
            scrollTop: $("#withdraw-step3").offset().top
        }, 1000);
    });
}

function onAdbkSelected() {
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
    
    // Hide save controls if already in adbk
    $('#select-adbk, #withdraw-memo').on('input', function() {
        let addr = $('#select-adbk').val();
        let memo = $('#withdraw-memo').val();
        
        if($('.select-adbk-item[data-address="' + addr + '"][data-memo="' + memo + '"]').length) {
            $('#withdraw-save-wrapper').hide();
            $('#withdraw-save').prop('checked', false).trigger('change');
        }
        else {
            $('#withdraw-save-wrapper').show();
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
    
    
    
    
    
    
    
    
    
    // Validate address
    $('#select-adbk').on('input', function() {
        if(typeof(window.addrTypingTimeout) !== 'undefined')
            clearTimeout(window.addrTypingTimeout);
        window.addrTypingTimeout = setTimeout(function() {
            
            $.ajax({
                url: config.apiUrl + '/wallet/withdraw/validate',
                type: 'POST',
                data: JSON.stringify({
                    api_key: window.apiKey,
                    asset: $('#select-coin').val(),
                    network: $('#select-net').data('network'),
                    address: $('#select-adbk').val()
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(!data.success) {
                    msgBox(data.error);
                }
                else if(!data.valid_address) {
	                window.validAddress = false;
                    $('#help-address').show();
                }
                else {
	                window.validAddress = true;
                    $('#help-address').hide();
                }
                
                if(window.validAddress && data.internal) {
                    updateFees('0', '0');
                    $('#withdraw-internal-notice').removeClass('d-none');
                }
                else {
                    updateFees(window.wdFeeMinOrig, window.wdFeeMaxOrig);
                    $('#withdraw-internal-notice').addClass('d-none');
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
            
        }, 750);
    });
    
    // Validate memo
    $('#withdraw-memo').on('input', function() {
        if(typeof(window.memoTypingTimeout) !== 'undefined')
            clearTimeout(window.memoTypingTimeout);
        window.memoTypingTimeout = setTimeout(function() {
            if($('#withdraw-memo').val() == '') {
                window.validMemo = false;
                $('#help-memo').hide();
                return;
            }
            
            $.ajax({
                url: config.apiUrl + '/wallet/withdraw/validate',
                type: 'POST',
                data: JSON.stringify({
                    api_key: window.apiKey,
                    asset: $('#select-coin').val(),
                    network: $('#select-net').data('network'),
                    memo: $('#withdraw-memo').val()
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(!data.success) {
                    msgBox(data.error);
                }
                else if(!data.valid_memo) {
	                window.validMemo = false;
                    $('#help-memo').show();
                }
                else {
	                window.validMemo = true;
                    $('#help-memo').hide();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
            
        }, 750);
    });
    
    // Submit withdraw
    $('#withdraw-form, #2fa-form').on('submit', function(event) {
        // Prevent standard submit
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