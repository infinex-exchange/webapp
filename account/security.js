var deviceTypeIconDict = {
    desktop: 'fa-solid fa-computer',
    mobile: 'fa-solid fa-mobile-screen',
    tv: 'fa-solid fa-tv',
    console: 'fa-regular fa-gamepad',
    mediaplayer: 'fa-solid fa-tv',
    car: 'fa-regular fa-car',
    watch: 'fa-regular fa-clock',
    unkown: 'fa-solid fa-question'
};

function killSession(sid) {
    $.ajax({
        url: config.apiUrl + '/account/session/kill',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            sid: sid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.sessions-item[data-sid=' + sid + ']').remove();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });     
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#chp-old').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-chp-old').hide();
        else
            $('#help-chp-old').show();
    });
    
    $('#chp-new').on('input', function() {
        if(validatePassword($(this).val()))
            $('#help-chp-new').hide();
        else
            $('#help-chp-new').show();
    });
    
    $('#chp-new, #chp-new2').on('input', function() {
        if($('#chp-new').val() == $('#chp-new2').val())
            $('#help-chp-new2').hide();
        else
            $('#help-chp-new2').show();        
    });
    
    $('#chp-form').submit(function(event) {
        event.preventDefault();
        
        var oldP = $('#chp-old').val();
        var newP = $('#chp-new').val();
        var newP2 = $('#chp-new2').val();
        
        if(!validatePassword(oldP) || !validatePassword(newP) || newP != newP2) {
            msgBox('fill in the form correctly first');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/account/change',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                password: newP,
                old_password: oldP
            }),
            datatype: 'json'
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                alert(1);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/account/session/list',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $.each(data.sessions, function(sid, v) {
                        var browserIcon = 'fa-solid fa-question';
                        if(v.browser.includes('Chrome'))
                            browserIcon = 'fa-brands fa-chrome';
                        else if(v.browser.includes('Firefox'))
                            browserIcon = 'fa-brands fa-firefox';
                        else if(v.browser.includes('Edge'))
                            browserIcon = 'fa-brands fa-edge';
                        else if(v.browser.includes('Safari'))
                            browserIcon = 'fa-brands fa-safari';
                        
                        var osIcon = 'fa-solid fa-question';
                        if(v.os.includes('Windows'))
                            osIcon = 'fa-brands fa-windows';
                        else if(v.os.includes('Android'))
                            osIcon = 'fa-brands fa-android';
                        else if(v.os.includes('macOS'))
                            osIcon = 'fa-brands fa-apple';
                        else if(v.os.includes('iOS'))
                            osIcon = 'fa-brands fa-apple';
                        else if(v.os.includes('Linux'))
                            osIcon = 'fa-brands fa-linux';
                        
                        var csInfo = '';
                        var csOnClick = 'killSession(' + sid + ')';
                        var csButton = 'Kill';
                        if(v.current_session) {
                            csInfo = '<br>(<strong>Current</strong>)';
                            csOnClick = 'logOut()';
                            csButton = 'Logout';
                        }
                        
                        $('#sessions-data').append(`
                            <div class="sessions-item row p-2 hoverable" data-sid="${sid}">
                                <div class="col-2">
                                    #${sid}
                                    ${csInfo}
                                </div>
                                <div class="col-3">
                                    <i class="${deviceTypeIconDict[v.device]}"></i>
                                    <span class="d-none d-lg-inline">
                                        ${v.device}<br>
                                    </span>
                                    <i class="${browserIcon}"></i>
                                    <span class="d-none d-lg-inline">
                                        ${v.browser}<br>
                                    </span>
                                    <i class="${osIcon}"></i>
                                    <span class="d-none d-lg-inline">
                                        ${v.os}
                                    </span>
                                </div>
                                <div class="col-4">
                                    ${v.lastact}
                                </div>
                                <div class="col-3">
                                    <button type="button" class="btn btn-primary btn-sm font-1" onClick="${csOnClick}">${csButton}</a>
                                </div>
                            </div>
                        `);
                });
                        
                $(document).trigger('renderingStage');
            } else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });     
    }
});