$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-coin').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // Download balance and init net selector when coin selected
    $('#select-coin').on('change', function() {
        $('#transfer-step2').hide();
        var asset = $('#select-coin').val();
        
         $.ajax({
            url: config.apiUrl + '/wallet/balances_ex',
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
                // Reset validation variables
                window.validAddress = false;
                window.validMemo = false;
                
                // Reset form
                $('#transfer-form').get(0).reset();
                $('small[id^="help-"]').hide();
                $('#transfer-amount').data('val', '').val('').trigger('prevalidated');
                
                // Precision
                window.transferAmountPrec = data.balances[asset].max_prec;
                
                // Round raw balance to this precision
                window.transferBalance = new BigNumber(data.balances[asset].avbl);
                window.transferBalance = window.transferBalance.dp(window.transferAmountPrec, BigNumber.ROUND_DOWN);
                $('#transfer-balance').html(window.transferBalance.toString());
                
                $('#transfer-step2').show();
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    
    
     
    // Lock format and precision of amount input
    $('#transfer-amount').on('input', function () {
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + window.transferAmountPrec + "})?$");
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
    $('#transfer-amount').on('focusout', function() {
        $(this).val( $(this).data('val') );
    });
    
    
    
    
    // Amount input -> amount range
    $('#transfer-amount').on('prevalidated', function() {
        var amount = new BigNumber($(this).data('val'));
        var perc = 0;
        if(!amount.isNaN())
            perc = amount.dividedBy(window.transferBalance).multipliedBy(100).toFixed(0);
        $('#transfer-amount-range').val(perc).trigger('_input');
    });
    
    // Amount range -> amount input
    $('#transfer-amount-range').on('input', function() {
        var amount = window.transferBalance.
            multipliedBy( $(this).val() ).
            dividedBy(100).
            dp(window.transferAmountPrec).
            toString();
        
        $('#transfer-amount').data('val', amount)
                             .val(amount);
    });
    
    
    
    
    // Drop amount to available balance
    $('#transfer-amount').on('prevalidated', function() {
        var amount = new BigNumber($(this).data('val'));
        if(amount.gt(window.transferBalance)) {
            $('#transfer-amount, #transfer-balance').addClass('blink-red');
            setTimeout(function() {
                $('#transfer-amount, #transfer-balance').removeClass('blink-red');
                
                var max = window.transferBalance.toString();
                $('#transfer-amount').data('val', max)
                                    .val(max)
                                    .trigger('prevalidated');
            }, 1000);
        }
    });
    
    
    
    
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
    
    
    
    
    // Submit withdraw
    $('#transfer-form, #2fa-form').on('submit', function(event) {
        // Prevent standard submit
        event.preventDefault();
        
        // Validate data
        var address = $('#transfer-address').val();
        if(address == '') {
            msgBox('Missing address');
            return;
        }
        
        var amount = new BigNumber($('#transfer-amount').data('val'));
        if(amount.isNaN() || amount.isZero()) {
            msgBox('Missing amount');
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['asset'] = $('#select-coin').val();
        data['address'] = address;
        data['amount'] = amount.toFixed(window.transferAmountPrec);
        
        var memo = $('#transfer-memo').val();
        if(memo != '')
            data['memo'] = memo;
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        if(!window.validAddress ||
           (memo != '' && !window.validMemo))
        {
	        msgBox('Fill the form correctly');
	        return;
        }
            
        // Post
        $.ajax({
            url: config.apiUrl + '/wallet/transfer',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#transfer-step2').hide();
                window.latestTransferXid = data.xid;
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
    
    initSelectCoin();
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var txHistoryData = {
            api_key: window.apiKey,
            type: ['TRANSFER_IN', 'TRANSFER_OUT']
        };
        initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true);
        
        var pathArray = window.location.pathname.split('/');
        var pathLast = pathArray[pathArray.length - 1];
        if(pathLast != 'transfer' && pathLast != '') {
            var symbol = pathLast.toUpperCase();
            $('#select-coin').val(symbol).trigger('change');
        }
    }
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestTransferXid) === 'undefied')
        return;
    
    var newItem = $('.tx-history-item[data-xid="' + window.latestTransferXid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});