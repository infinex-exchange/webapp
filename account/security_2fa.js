const mapProviderToIcon = {
    EMAIL: 'fa-solid fa-envelope',
    GA: 'fa-brands fa-google'
};

function renderProvider(provider, data) {
    let icon = mapProviderToIcon[provider];
    let configuredColor = data.configured ? 'text-success' : 'text-danger';
    let configuredText = data.configured ? 'Available' : 'Not available';
    let enabledColor = data.enabled ? 'text-success' : 'text-danger';
    let enabledText = data.enabled ? 'Active' : 'Not active';
    
    let buttons = '';
    if(!data.configured)
        buttons += `
            <button
             type="button"
             class="btn btn-primary btn-sm"
             onClick="configureProvider('${provider}')"
            >
                Configure
            </button>
        `;
    else {
        buttons += `
            <button
             type="button"
             class="btn btn-primary btn-sm"
             onClick="removeProvider('${provider}')"
            >
                Remove
            </button>
        `;
        
        if(!data.enabled)
            buttons += `
                <button
                 type="button"
                 class="btn btn-primary btn-sm"
                 onClick="useProvider('${provider}')"
                >
                    Use
                </button>
            `;
    }
    
    return `
        <div class="col-12 col-lg-6">
            <div class="alert alert-secondary d-flex align-items-center" role="alert">
                <div class="px-2">
                    <i class="${icon} fa-2x"></i>
                </div>
                <div class="px-2">
                    ${data.description}<br>
                    <strong class="${configuredColor}">${configuredText}</strong>
                    <strong class="${enabledColor}">${enabledText}</strong>
                </div>
                <div class="ms-auto px-2">
                  ${buttons}
                </div>
            </div>
        </div>
    `;
}

function renderCase(caseid, data) {
    let checked = data.enabled ? 'checked' : '';
    
    return `
        <div class="col-12 py-2">
            <div class="pretty p-switch p-bigger">
                <input
                 type="checkbox"
                 class="2fa-case"
                 data-case="${caseid}"
                 id="case-${caseid}"
                 ${checked}
                >
                <div class="state p-primary">
                    <label for="case-${caseid}">
                        ${data.description}
                    </label>
                </div>
            </div>  
        </div>
    `;
}

function reload2faProviders() {
    $('#providers-data').empty();
    
    api(
        'GET',
        '/account/v2/mfa/providers'
    ).then(function(data) {
        for(const provider in data.providers)
            $('#providers-data').append(
                renderProvider(provider, data.providers[provider])
            );
        
        $(document).trigger('renderingStage');
    });
}

function reload2faCases() {
    $('#cases-data').empty();
    
    api(
        'GET',
        '/account/v2/mfa/cases'
    ).then(function(data) {
        for(const caseid in data.cases)
            $('#cases-data').append(
                renderCase(caseid, data.cases[caseid])
            );
                    
        $(document).trigger('renderingStage');
    });                 
}

function configureProvider(provider) {
    api2fa(
        'PUT',
        '/account/v2/mfa/providers/' + provider
    ).then(function(data) {
        if(provider == 'GA') {
            window.qrcode.clear();
            window.qrcode.makeCode(data.url);
            $('#modal-configure').modal('show');
            window.location = data.url;
        }
        
        reload2faProviders();
    });
}

function removeProvider(provider) {
    api2fa(
        'DELETE',
        '/account/v2/mfa/providers/' + provider
    ).then(reload2faProviders);
}

function useProvider(provider) {
    api2fa(
        'POST',
        '/account/v2/mfa/providers/' + provider
    ).then(reload2faProviders);
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.qrcode = new QRCode("mc-qrcode", {
        correctLevel : QRCode.CorrectLevel.H
    });
    
    $('.btn-save-cases').on('click', function() {
        let cases = new Object();
        
        $('.2fa-case').each(function(){
            cases[ $(this).data('case') ] = $(this).prop('checked');
        });
        
        api2fa(
            'PATCH',
            '/account/v2/mfa/cases',
            {
                cases: cases
            }
        ).then(reload2faCases);
    });
    
    reload2faProviders();
    reload2faCases();
});