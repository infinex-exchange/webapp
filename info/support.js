function gotoStep(step) {
    $('.support-step').addClass('d-none');
    $('#' + step).removeClass('d-none');
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');

    window.swXid = null;
    window.sdYes = false;
    
    $('[data-goto]').click(function() {
        var datafor = $(this).data('for');
        if(typeof(datafor) !== 'undefined') {
            if(window.loggedIn && !datafor.includes('user')) {
                msgBox('This option cannot be used as a logged in user');
                return;
            }
            if(!window.loggedIn && !datafor.includes('guest')) {
                gotoLogin();
                return;
            }
        }
        
        gotoStep($(this).data('goto'));
    });
    
    $('#select-coin').on('change', function() {
        if($('#select-coin').data('experimental') == 'true') {
            gotoStep('support-experimental');
            return;
        }

        initSelectNet($('#select-coin').val());
    });

    $('#sd-yes').click(function() {
        window.sdYes = true;
        $('.sd-ynprompt').addClass('d-none');
        $('.sd-yes-answer').removeClass('d-none');
    });

    $('#sl-submit').click(function() {
        var email = $('#sl-email').val();
        var description = $('#sl-description').val();

        if(email == '' || description == '') {
            supportFormError();
            return;
        }

        supportAjax({
            email: email,
            description: description
        });
    });

    $('#so-submit').click(function() {
        var email = $('#so-email').val();
        var description = $('#so-description').val();

        if((!window.loggedIn && email == '') || description == '') {
            supportFormError();
            return;
        }

        var data = new Object();
        data.description = description;
        if(!window.loggedIn) data.email = email;

        supportAjax(data);
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
                if(v.status == 'CANCELED')
                    return;

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
        <div class="col-12 col-md-6 col-lg-4 sw-trans-item hoverable px-1 py-2" data-xid="${data.xid}" data-time="${unixTime}" onClick="selectWithdrawal(this)">
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

    window.swXid = $(item).data('xid');

    $('.sw-trans-item').not(item).remove();
    $(item).removeClass('col-lg-6');
    
    var then = new Date($(item).data('time'));
    var now = new Date();
    
    var msBetweenDates = Math.abs(then.getTime() - now.getTime());
    var hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    
    if(hoursBetweenDates < 8)    
        gotoStep('support-withdrawal-lt8h');
}

function supportAjax(data) {
    if(window.loggedIn)
        data = Object.assign(data, {
            api_key: window.apiKey
        });

    $.ajax({
        url: config.apiUrl + '/info/support',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            msgBoxRedirect('Your request was successfully submited. Please wait for a reply.');
        }
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn();
    });
}

function supportFormError() {
    msgBox('Please fill in the form correctly');
}
