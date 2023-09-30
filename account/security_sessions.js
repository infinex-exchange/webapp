window.renderingStagesTarget = 3;

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

function renderSession(data) {
    let browserIcon = 'fa-solid fa-question';
    if(data.browser.includes('Chrome'))
        browserIcon = 'fa-brands fa-chrome';
    else if(data.browser.includes('Firefox'))
        browserIcon = 'fa-brands fa-firefox';
    else if(data.browser.includes('Edge'))
        browserIcon = 'fa-brands fa-edge';
    else if(data.browser.includes('Safari'))
        browserIcon = 'fa-brands fa-safari';
    
    let osIcon = 'fa-solid fa-question';
    if(data.os.includes('Windows'))
        osIcon = 'fa-brands fa-windows';
    else if(data.os.includes('Android'))
        osIcon = 'fa-brands fa-android';
    else if(data.os.includes('macOS'))
        osIcon = 'fa-brands fa-apple';
    else if(data.os.includes('iOS'))
        osIcon = 'fa-brands fa-apple';
    else if(data.os.includes('Linux'))
        osIcon = 'fa-brands fa-linux';
    
    let csInfo = '';
    let csOnClick = 'killSession(' + data.sid + ')';
    let csButton = 'Kill';
    if(data.current) {
        csInfo = '<br>(<strong class="small">This</strong>)';
        csOnClick = 'logOut()';
        csButton = 'Logout';
    }
    
    let time = new Date(data.lastAct * 1000).toLocaleString();
    
    return `
        <div class="sessions-item row p-2 hoverable" data-id="${data.sid}">
            <div style="width: 17%">
                #${data.sid}
                ${csInfo}
            </div>
            <div style="width: 21%">
                <i class="${deviceTypeIconDict[data.device]}"></i>
                <span class="d-none d-lg-inline">
                    ${data.device}<br>
                </span>
                <i class="${browserIcon}"></i>
                <span class="d-none d-lg-inline">
                    ${data.browser}<br>
                </span>
                <i class="${osIcon}"></i>
                <span class="d-none d-lg-inline">
                    ${data.os}
                </span>
            </div>
            <div style="width: 37%">
                ${time}
            </div>
            <div style="width: 25%">
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="${csOnClick}">${csButton}</a>
            </div>
        </div>
    `;
}

function killSession(sid) {
    api(
        'DELETE',
        '/account/sessions/' + sid
    ).then(
        function() {
            window.sessionsScr.remove(sid);
        }
    );
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.sessionsScr = new InfiniteScrollOffsetPg(
        '/account/sessions',
        'sessions',
        renderSession,
        $('#sessions-data')
    );
});