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
                '/account/api-keys/' + keyid
            ).then(function() {
                window.apiKeysScr.remove(keyid);
            });
        }
    );
}

function addApiKey() {
    $('#api-key-description-form').unbind('submit');
    $('#api-key-description-form').submit(function(event) {
        event.preventDefault();
        
        let description = $('#api-key-description').val();
        
        if(!validateApiKeyDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-ak-desc-prompt').modal('hide');
        
        api(
            'POST',
            '/account/api-keys',
            {
                description: description
            }
        ).then(function(data) {
            window.apiKeysScr.append({
                keyid: data.keyid,
                apiKey: data.apiKey,
                description: description
            });
        });
    });
    
    $('#api-key-description').val('');
    $('#help-api-key-description').hide();
    $('#modal-ak-desc-prompt').modal('show');
}

function editApiKey(keyid) {
    let old = window.apiKeysScr.get(keyid);
    let oldDescription = old.data('description');
    let oldApiKey = old.data('api-key');
    
    $('#api-key-description-form').unbind('submit');
    $('#api-key-description-form').submit(function(event) {
        event.preventDefault();
        
        var description = $('#api-key-description').val();
        
        if(!validateApiKeyDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-ak-desc-prompt').modal('hide');
        
        api(
            'PATCH',
            '/account/api-keys/' + keyid,
            {
                description: description
            }
        ).then(function() {
            window.apiKeysScr.replace(keyid, {
                keyid: keyid,
                apiKey: oldApiKey,
                description: description
            });
        });   
    });
    
    $('#api-key-description').val(oldDescription);
    $('#help-api-key-description').hide();
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
        
    $('#api-key-description').on('input', function() {
        if(validateApiKeyDescription($(this).val()))
            $('#help-api-key-description').hide();
        else
            $('#help-api-key-description').show();
    });
    
    window.apiKeysScr = new InfiniteScrollOffsetPg(
        '/account/api-keys',
        'apiKeys',
        renderApiKey,
        '#api-keys-data'
    );
});