window.renderingStagesTarget = 1;

$(document).ready(function() {
    $('#api-key-description').on('input', function() {
        if(validateApiKeyDescription($(this).val()))
            $('#help-api-key-description').hide();
        else
            $('#help-api-key-description').show();
    });
});

function removeAK(sid) {
    api(
        'DELETE',
        '/account/api-keys/' + sid
    ).then(function() {
        $('.sessions-item[data-sid=' + sid + ']').remove();
    });
}

function addChangeApiKey(sid, api_key, description) {
    let elem = $('.sessions-item[data-sid=' + sid + ']');
    if(elem.length) {
        elem.data('description', description);
        elem.find('.api-key-description').html(description);
    }
    else $('#api-keys-data').append(`
        <div class="sessions-item row p-2 hoverable" onClick="mobileApiKeyDetails(this)"
         data-sid="${sid}" data-api-key="${api_key}" data-description="${description}">
            <div class="col-12 col-lg-4 my-auto wrap">
                <h5 class="secondary api-key-description d-lg-none">${description}</h5>
                <span class="api-key-description d-none d-lg-inline">${description}</span>
            </div>
            <div class="col-12 col-lg-5">
                <div class="row flex-nowrap">
                    <div class="col-auto col-lg-10 my-auto wrap">
                        <span class="wrap" id="api-key-${sid}">${api_key}</span>
                    </div>
                    <div class="col-auto col-lg-2 my-auto">
                        <a href="#_" class="secondary" data-copy="#api-key-${sid}" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-lg-block my-auto">
                <button type="button" class="btn btn-primary btn-sm" onClick="showEditAKPrompt(${sid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" onClick="removeAK(${sid})">Remove</a>
            </div>
        </div>
    `);      
}

function showAddAKPrompt() {
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
            addChangeApiKey(data.sid, data.apiKey, description);
        });
    });
    
    $('#api-key-description').val('');
    $('#help-api-key-description').hide();
    $('#modal-ak-desc-prompt').modal('show');
}

function showEditAKPrompt(sid) {
    let oldDescription = $('.sessions-item[data-sid=' + sid + ']').attr('data-description');
    
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
            '/account/api-keys/' + sid,
            {
                description: description
            }
        ).then(function() {
            addChangeApiKey(sid, null, description);
        });   
    });
    
    $('#api-key-description').val(oldDescription);
    $('#help-api-key-description').hide();
    $('#modal-ak-desc-prompt').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    //
        $.ajax({
            url: config.apiUrl + '/account/api_keys/list',
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
                    addChangeApiKey(sid, v.api_key, v.description); 
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

function mobileApiKeyDetails(item) {
    if($(window).width() > 991) return;
    
    let sid = $(item).data('sid');
    
    $('#makd-description').html($(item).data('description'));
    $('#makd-rename-btn').unbind('click').on('click', function() {
        $('#modal-api-key-details').modal('hide');
        showEditAKPrompt(sid);
    });
    $('#makd-remove-btn').unbind('click').on('click', function() {
        $('#modal-api-key-details').modal('hide');
        removeAK(sid);
    });
    $('#makd-api-key').html($(item).data('api-key'));
    
    $('#modal-api-key-details').modal('show');
}