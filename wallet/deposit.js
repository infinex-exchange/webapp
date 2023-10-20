function onCoinSelected(symbol) {
    $('#deposit-step3').hide();
    window.selectNet.reset('/wallet/v2/io/networks?asset=' + symbol);
    $('#deposit-step2').show();
}

function onNetSelected(symbol) {
    $('#deposit-step3').hide();
    
    api(
        'GET',
        '/wallet/v2/io/deposit/' + symbol + '/' + window.selectCoin.key
    ).then(
        function(data) {
            // Confirmations target
            $('#deposit-confirmations').html(data.confirmTarget);
            
            // Memo
            if(data.memoName != null && data.memo != null) {
                $('#deposit-memo-name').html(data.memoName);
                $('#deposit-memo').html(data.memo);
                $('#deposit-memo-wrapper').removeClass('d-none');
            }
            else
                $('#deposit-memo-wrapper').addClass('d-none');
            
            // QR
            if(data.qrCode != null) {
                window.qrcode.clear();
                window.qrcode.makeCode(data.qrCode);
                $('#deposit-qr-wrapper').removeClass('d-none');
            }
            else
                $('#deposit-qr-wrapper').addClass('d-none');
            
            // Warnings
            if(data.warnings.length > 0) {
                let warnHtml = data.warnings.join('<br><br>');
                $('#deposit-warning-content').html(warnHtml);
                $('#deposit-warning').removeClass('d-none')
            }
            else
                $('#deposit-warning').addClass('d-none');
            
            // Operating warning
            if(data.operating)
                $('#deposit-operating-warning').addClass('d-none');
            else
                $('#deposit-operating-warning').removeClass('d-none');
            
            // Contract
            if(data.contract) {
                $('#deposit-contract').html(data.contract);
                $('#deposit-contract-wrapper').removeClass('d-none');
            }
            else {
                $('#deposit-contract-wrapper').addClass('d-none');
            }
            
            // Address
            $('#deposit-addr').html(data.address);
            
            // Min amount
            $('#deposit-min-amount').html(data.minAmount);
            $('#deposit-min-symbol').html(window.selectCoin.key);
            
            $('#deposit-step3').show();
            if($(window).width() > 991) return;
            $('html, body').animate({
                scrollTop: $("#deposit-step3").offset().top
            }, 1000);
        }
    );
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;

    window.qrcode = new QRCode("deposit-qrcode", {
        correctLevel : QRCode.CorrectLevel.H
    });
    
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
        
    let pathArray = window.location.pathname.split('/');
    let pathLast = pathArray[pathArray.length - 1];
    if(pathLast != 'deposit' && pathLast != '') {
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
    
    initTxHistory('DEPOSIT');
});