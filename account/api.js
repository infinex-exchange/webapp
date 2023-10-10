function renderApiKey(data) {
    return `
        <div data-id="${data.keyid}" class="api-keys-item row p-2 hoverable" onClick="showApiKey(this)"
         data-api-key="${data.apiKey}" data-description="${data.description}">
            <div class="col-12 col-lg-4 my-auto wrap">
                <h5 class="secondary api-key-description d-lg-none">${data.description}</h5>
                <span class="api-key-description d-none d-lg-inline">${data.description}</span>
            </div>
            <div class="col-12 col-lg-5">
                <div class="row flex-nowrap">
                    <div class="col-auto col-lg-10 my-auto wrap">
                        <span class="wrap" id="api-key-${data.keyid}">${data.apiKey}</span>
                    </div>
                    <div class="col-auto col-lg-2 my-auto">
                        <a href="#_" class="secondary" data-copy="#api-key-${data.keyid}" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-lg-block my-auto">
                <button type="button" class="btn btn-primary btn-sm" onClick="editApiKey(${data.keyid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" onClick="removeApiKey(${data.keyid})">Remove</a>
            </div>
        </div>
    `;      
}

function removeApiKey(keyid) {
    yesNoPrompt(
        'Are you sure you want to remove this API key?',
        function() {
            api(
                'DELETE',
                '/account/v2/api-keys/' + keyid
            ).then(function() {
                window.apiKeysScr.remove(keyid);
            });
        }
    );
}

function addApiKey() {
    window.fvAddEdit.onSubmit(function(data) {
        $('#modal-ak-desc-prompt').modal('hide');
        
        api(
            'POST',
            '/account/v2/api-keys',
            data
        ).then(function(resp) {
            window.apiKeysScr.append({
                keyid: resp.keyid,
                apiKey: resp.apiKey,
                description: data.description
            });
        });
        
        return true;
    });
    window.fvAddEdit.reset();
    
    $('#modal-ak-desc-prompt').modal('show');
}

function editApiKey(keyid) {
    let old = window.apiKeysScr.get(keyid);
    let oldDescription = old.data('description');
    let oldApiKey = old.data('api-key');
    
    window.fvAddEdit.onSubmit(function(data) {
        $('#modal-ak-desc-prompt').modal('hide');
        
        api(
            'PATCH',
            '/account/v2/api-keys/' + keyid,
            data
        ).then(function() {
            window.apiKeysScr.replace(keyid, {
                keyid: keyid,
                apiKey: oldApiKey,
                description: data.description
            });
        });
        
        return true;
    });
    
    $('#api-key-description').val(oldDescription).trigger('input');
    $('#modal-ak-desc-prompt').modal('show');
}

function showApiKey(item) {
    if($(window).width() > 991) return;
    
    let keyid = $(item).data('id');
    
    $('#makd-description').html($(item).data('description'));
    $('#makd-rename-btn').unbind('click').on('click', function() {
        $('#modal-api-key-details').modal('hide');
        editApiKey(keyid);
    });
    $('#makd-remove-btn').unbind('click').on('click', function() {
        $('#modal-api-key-details').modal('hide');
        removeApiKey(keyid);
    });
    $('#makd-api-key').html($(item).data('api-key'));
    
    $('#modal-api-key-details').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
        
    window.fvAddEdit = new FormValidator(
        $('api-key-description-form'),
        null
    );
    window.fvAddEdit.text(
        'description',
        $('#api-key-description'),
        true,
        validateApiKeyDescription
    );
    
    window.apiKeysScr = new InfiniteScrollOffsetPg(
        '/account/v2/api-keys',
        'apiKeys',
        renderApiKey,
        $('#api-keys-data')
    );
});