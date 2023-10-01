function updateFees(feeMin, feeMax) {
    var feeMinDec = new BigNumber(feeMin);
    var feeMaxDec = new BigNumber(feeMax);
    var dp = Math.max(feeMinDec.dp(), feeMaxDec.dp());
    var feeStep = new BigNumber(10);
    feeStep = feeStep.pow(-dp).dp(dp).toString();
    
    $('#withdraw-fee-range').attr('min', feeMin)
                            .attr('max', feeMax)
                            .attr('step', feeStep)
                            .val(feeMin)
                            .trigger('input');
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-coin').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // Download balance and init net selector when coin selected
    $('#select-coin').on('change', function() {
        $('#withdraw-step2').hide();
        $('#withdraw-step3').hide();
        var asset = $('#select-coin').val();
        
         $.ajax({
            url: config.apiUrl + '/wallet/balances',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                symbols: [ asset ]
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                window.wdRawBalance = new BigNumber(data.balances[asset].avbl);
                initSelectNet(asset);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    // Show net selector when networks list downloaded
    $('#select-net').on('dataLoaded', function() {
        $('#withdraw-step2').show();
    });
    
    // Download info and show step3 when network selected
    $('#select-net').on('change', function() {        
        $('#withdraw-step3').hide();
        
        initSelectAdbk($('#select-coin').val(), $('#select-net').data('network'));
        
        $.ajax({
            url: config.apiUrl + '/wallet/withdraw/info',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                asset: $('#select-coin').val(),
                network: $('#select-net').data('network')
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                // Reset validation variables
                window.validAddress = false;
                window.validMemo = false;
                window.validAdbkName = false;
                
                // Reset form
                $('#withdraw-form').get(0).reset();
                $('small[id^="help-"]').hide();
                $('#withdraw-amount').data('val', '').val('').trigger('prevalidated');
                $('#withdraw-save').trigger('change');
                
                // Operating warning
                if(data.operating)
                    $('#withdraw-operating-warning').addClass('d-none');
                else
                    $('#withdraw-operating-warning').removeClass('d-none');
                
                // Experimental warning
                if(!data.experimental)
                    $('#withdraw-experimental-warning').addClass('d-none');
                else
                    $('#withdraw-experimental-warning').removeClass('d-none');
                
                // Precision
                window.wdAmountPrec = data.prec;
                
                // Round raw balance to this precision
                window.wdBalance = window.wdRawBalance.dp(data.prec, BigNumber.ROUND_DOWN);
                $('#withdraw-balance').html(window.wdBalance.toString());
                
                window.wdFeeMinOrig = data.fee_min;
                window.wdFeeMaxOrig = data.fee_max;
                updateFees(data.fee_min, data.fee_max);
                
                // Memo
                if(typeof(data.memo_name) !== 'undefined') {
                    $('#withdraw-memo-name').html(data.memo_name + ':');
                    $('#withdraw-memo-wrapper').removeClass('d-none');
                }
                else {
                    $('#withdraw-memo-wrapper').addClass('d-none');
                }
                
                // Contract
                if(typeof(data.contract) !== 'undefined') {
                    $('#withdraw-contract').html(data.contract);
                    $('#withdraw-contract-wrapper').removeClass('d-none');
                }
                else {
                    $('#withdraw-contract-wrapper').addClass('d-none');
                }
                
                $('#withdraw-step3').show();
                $('html, body').animate({
                    scrollTop: $("#withdraw-step3").offset().top
                }, 1000);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    
    
    
    // Fee range -> fee input
    $('#withdraw-fee-range').on('input', function() {
        window.wdAmountMax = window.wdBalance.minus( $(this).val() ).dp(window.wdAmountPrec);
        if(window.wdAmountMax.isNegative())
	        window.wdAmountMax = new BigNumber(0);
        $('#withdraw-amount-max').html(window.wdAmountMax.toString());
        $('#withdraw-fee').val($(this).val());
        $('#withdraw-amount').trigger('prevalidated');
    });
    
    
    
    
    // Lock format and precision of amount input
    $('#withdraw-amount').on('input', function () {
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + window.wdAmountPrec + "})?$");
        var newVal = $(this).val();
        
        // Revert bad format (real visible value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('val') );
        }
        
        // Drop . on last position (data-val only)
        else if(newVal.slice(-1) == '.') {
            $(this).data('val', newVal.substring(0, newVal.length - 1));
        }
        
        // Change . to 0. on first position (data-val only)
        else if(newVal.startsWith('.')) {
            $(this).data('val', '0' + newVal);
        }
        
        // Save data-val when everythink ok
        else $(this).data('val', newVal);
    
        $(this).trigger('prevalidated');
    });
    
    // Move data-val to real visible value
    $('#withdraw-amount').on('focusout', function() {
        $(this).val( $(this).data('val') );
    });
    
    
    
    
    // Amount input -> amount range
    $('#withdraw-amount').on('prevalidated', function() {
        var amount = new BigNumber($(this).data('val'));
        var perc = 0;
        if(!amount.isNaN())
            perc = amount.dividedBy(window.wdAmountMax).multipliedBy(100).toFixed(0);
        $('#withdraw-amount-range').val(perc).trigger('_input');
    });
    
    // Amount range -> amount input
    $('#withdraw-amount-range').on('input', function() {
        var amount = window.wdAmountMax.
            multipliedBy( $(this).val() ).
            dividedBy(100).
            dp(window.wdAmountPrec).
            toString();
        
        $('#withdraw-amount').data('val', amount)
                             .val(amount);
    });
    
    
    
    
    // Drop amount to available balance
    $('#withdraw-amount').on('prevalidated', function() {
        var amount = new BigNumber($(this).data('val'));
        if(amount.gt(window.wdAmountMax)) {
            $('#withdraw-amount, #withdraw-amount-max').addClass('blink-red');
            setTimeout(function() {
                $('#withdraw-amount, #withdraw-amount-max').removeClass('blink-red');
                
                var max = window.wdAmountMax.toString();
                $('#withdraw-amount').data('val', max)
                                    .val(max)
                                    .trigger('prevalidated');
            }, 1000);
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
        var addr = $('#select-adbk').val();
        var memo = $('#withdraw-memo').val();
        
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
    
    initSelectCoin();
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var txHistoryData = {
            api_key: window.apiKey,
            type: 'WITHDRAWAL'
        };
        initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true, 10);
        
        var pathArray = window.location.pathname.split('/');
        var pathLast = pathArray[pathArray.length - 1];
        if(pathLast != 'withdraw' && pathLast != '') {
            var symbol = pathLast.toUpperCase();
            $('#select-coin').val(symbol).trigger('change');
        }
    }
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestWithdrawalXid) === 'undefied')
        return;
    
    var newItem = $('.tx-history-item[data-xid="' + window.latestWithdrawalXid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});