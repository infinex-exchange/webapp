window.sdYes = false;
window.swXid = null;

function gotoStep(step) {
    $('.support-step').addClass('d-none');
    $('#' + step).removeClass('d-none');
}

function submitConfirmation() {
    msgBox(
        'Your request has been accepted. We will try to solve your issue soon. Please wait for a reply.',
        'Success',
        '/'
    );
}

function onCoinSelected(symbol) {
    window.selectNet.reset('/wallet/v2/io/networks?asset=' + symbol);
}

function renderWithdrawal(data) { 
    let time = new Date(data.createTime * 1000).toLocaleString();
    
    return `
        <div data-id="${data.xid}" class="col-12 col-md-6 col-lg-4 sw-trans-item hoverable px-1 py-2"
         onClick="selectWithdrawal(this)">
        <div class="row m-0">

            <div style="width: 60px" class="my-auto p-2">
                <img width="40" height="40" src="${data.asset.iconUrl}">
            </div>
            
            <div style="width: calc(100% - 60px)" class="my-auto">
                <small class="secondary">${time}</small>
                <br>
                ${data.amount} ${data.asset.symbol}
                <br>
                <small>${data.network.name}</small>
            </div>
            
        </div>
        </div>
    `;
}

function selectWithdrawal(item) {
    let data = $(item).data();
    
    if(data.status == 'CANCELED') {
        gotoStep('support-withdrawal-canceled');
        return;
    }
    if(data.status == 'PENDING' || data.status == 'PROCESSING') {
        gotoStep('support-withdrawal-pending');
        return;
    }
    
    let orderTime = new Date(data.createTime * 1000);
    let nowTime = new Date();
    
    let msBetweenDates = Math.abs(orderTime.getTime() - nowTime.getTime());
    let hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    
    if(hoursBetweenDates < 8) {    
        gotoStep('support-withdrawal-lt8h');
        return;
    }
    
    window.swXid = data.xid;
    
    $('.sw-trans-item').not(item).remove();
    $(item).removeClass('col-md-6 col-lg-4');
}

$(document).ready(function() {
    window.fvLogin = new FormValidator(
        $('#form-login'),
        function(data) {
            api(
                'POST',
                '/info/v2/support/login',
                data
            ).then(submitConfirmation);
            
            return true;
        }
    );
    window.fvLogin.text(
        'email',
        $('#sl-email'),
        true,
        validateEmail,
        'Incorrect e-mail format'
    );
    window.fvLogin.text(
        'description',
        $('#sl-description'),
        true,
        function() { return true; }
    );
    
    $('[data-goto]').click(function() {
        let datafor = $(this).data('for');
        if(typeof(datafor) !== 'undefined') {
            if(window.loggedIn && !datafor.includes('user')) {
                msgBox('This topic cannot be used as logged in user');
                return;
            }
            if(!window.loggedIn && !datafor.includes('guest')) {
                gotoLogin();
                return;
            }
        }
        
        gotoStep($(this).data('goto'));
    });
});

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
        null,
        false,
        true
    );
    
    window.fvDeposit = new FormValidator(
        $('#form-deposit'),
        function(data) {
            if(!window.sdYes)
                return false;
            
            api(
                'POST',
                '/info/v2/support/deposit',
                data
            ).then(submitConfirmation);
            
            return true;
        }
    );
    window.fvDeposit.select(
        'asset',
        window.selectCoin,
        true,
        function() { return true; }
    );
    window.fvDeposit.select(
        'network',
        window.selectNet,
        true,
        function() { return true; }
    );
    window.fvDeposit.text(
        'txid',
        $('#sd-txid'),
        true,
        function() { return true; }
    );
    window.fvDeposit.text(
        'description',
        $('#sd-description'),
        true,
        function() { return true; }
    );
    
    window.fvWithdrawal = new FormValidator(
        $('#form-withdrawal'),
        function(data) {
            if(window.wdXid === null)
                return false;
            
            api(
                'POST',
                '/info/v2/support/withdrawal',
                {
                    ...data,
                    xid: window.wdXid
                }
            ).then(submitConfirmation);
            
            return true;
        }
    );
    window.fvWithdrawal.text(
        'description',
        $('#sw-description'),
        true,
        function() { return true; }
    );
    
    window.fvOther = new FormValidator(
        $('#form-other'),
        function(data) {
            api(
                'POST',
                '/info/v2/support/other',
                data
            ).then(submitConfirmation);
            
            return true;
        }
    );
    window.fvOther.text(
        'description',
        $('#so-description'),
        true,
        function() { return true; }
    );
    
    window.scrWithdrawals = new InfiniteScrollOffsetPg(
        '/wallet/v2/io/transactions?type=WITHDRAWAL&limit=18',
        'transactions',
        renderWithdrawal,
        $('#sw-list'),
        false,
        null,
        null,
        null,
        function() { // on first page loaded
            window.scrWithdrawals.freeze();
        }
    );
    
    $('#sd-yes').click(function() {
        window.sdYes = true;
        $('.sd-ynprompt').addClass('d-none');
        $('.sd-yes-answer').removeClass('d-none');
    });
});