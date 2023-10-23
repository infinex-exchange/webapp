function gotoStep(step) {
    $('.support-step').addClass('d-none');
    $('#' + step).removeClass('d-none');
}

function onCoinSelected(symbol) {
    window.selectNet.reset('/wallet/v2/io/networks?asset=' + symbol);
}

$(document).ready(function() {
    window.fvLogin = new FormValidator(
        $('#form-login'),
        function(data) {
            api(
                'POST',
                '/info/v2/support/login',
                data
            );
            
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
        true
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
            //
        }
    );
    
    window.fvWithdrawal = new FormValidator(
        $('#form-withdrawal'),
        function(data) {
            //
        }
    );
    
    window.fvOther = new FormValidator(
        $('#form-other'),
        function(data) {
            //
        }
    );
});

/*$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');

    window.swXid = null;
    window.sdYes = false;
    

    $('#sd-yes').click(function() {
        window.sdYes = true;
        $('.sd-ynprompt').addClass('d-none');
        $('.sd-yes-answer').removeClass('d-none');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    initSelectCoin();
    
    $.ajax({
        url: config.apiUrl + '/wallet/transactions',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            offset: 0,
            type: 'WITHDRAWAL'
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            var i = 0;

            $.each(data.transactions, function(k, v) {
                if(i > 19)
                    return;

                i++;
                
                $('#sw-list').append(renderWithdrawal(v));
            });
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
});

function renderWithdrawal(data) { 
    var unixTime = data.create_time * 1000;
    var cTime = new Date(unixTime).toLocaleString();
    
    return `
        <div class="col-12 col-md-6 col-lg-4 sw-trans-item hoverable px-1 py-2" data-xid="${data.xid}" data-time="${unixTime}"
         data-assetid="${data.asset}" data-status="${data.status}" onClick="selectWithdrawal(this)">
        <div class="row m-0">

            <div style="width: 60px" class="my-auto p-2">
                <img width="40" height="40" src="${data.icon_url}">
            </div>
            
            <div style="width: calc(100% - 60px)" class="my-auto">
                <small class="secondary">${cTime}</small>
                <br>
                ${data.amount} ${data.asset}
                <br>
                <small>${data.network_description}</small>
            </div>
            
        </div>
        </div>
    `;
}

function selectWithdrawal(item) {
    if(window.swXid !== null)
        return;

    var status = $(item).data('status');
    if(status == 'CANCELED') {
        gotoStep('support-withdrawal-canceled');
        return;
    }
    if(status == 'PENDING' || status == 'PROCESSING') {
        gotoStep('support-withdrawal-pending');
        return;
    }
    
    var then = new Date($(item).data('time'));
    var now = new Date();
    
    var msBetweenDates = Math.abs(then.getTime() - now.getTime());
    var hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    
    if(hoursBetweenDates < 8) {    
        gotoStep('support-withdrawal-lt8h');
        return;
    }
    
    var assetid = $(item).data('assetid');
    
    $.ajax({
        url: config.apiUrl + '/wallet/assets',
        type: 'POST',
        data: JSON.stringify({
            symbols: [ assetid ]
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            if(data.assets[assetid].experimental) {
                gotoStep('support-experimental');
                return;
            }
            
            window.swXid = $(item).data('xid');
            
            $('.sw-trans-item').not(item).remove();
            $(item).removeClass('col-md-6 col-lg-4');
        }
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn();
    });
}*/