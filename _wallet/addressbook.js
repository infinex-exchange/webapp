$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#adbk-name').on('input', function() {
        if(validateAdbkName($(this).val()))
            $('#help-adbk-name').hide();
        else
            $('#help-adbk-name').show();
    });
});

function removeAdbk(adbkid) {
    $.ajax({
        url: config.apiUrl + '/wallet/addressbook/delete',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            adbkid: adbkid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.adbk-item[data-adbkid="' + adbkid + '"]').remove();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });     
}

function renderAdbkItem(adbkid, data) {
	var memo = '';
    var memoName = '';
    var memoInner = '';
    if(typeof(data.memo) !== 'undefined' && typeof(data.memo_name) !== 'undefined') {
        memoName = data.memo_name;
        memo = data.memo;
        memoInner = `
            <br>
            <h6 class="d-inline secondary">
                ${data.memo_name}:
            </h6>
            <small>
                ${data.memo}
            </small>
        `;
    }
    
    return `
        <div class="adbk-item row p-2 hoverable" onClick="mobileAdbkDetails(this)"
            data-adbkid="${adbkid}" data-name="${data.name}" data-network="${data.network_description}"
            data-asset="${data.asset}" data-address="${data.address}" data-memo-name="${memoName}"
            data-memo="${memo}">
            <div class="my-auto d-none d-lg-block" style="width: 10%">
                <img width="16" height="16" src="${data.icon_url}">
                ${data.asset}
            </div>
            <div class="my-auto d-none d-lg-block" style="width: 15%">
                ${data.network_description}
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 20%">
	            <span class="name">${data.name}</span>
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 35%">
	            ${data.address}
                ${memoInner}
            </div>
            <div class="my-auto text-end d-none d-lg-block" style="width: 20%">
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="showRenameAdbkPrompt(${adbkid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="removeAdbk(${adbkid})">Remove</a>
            </div>
            
            <div class="m-auto d-lg-none" style="width: 60px">
                <img width="40" height="40" src="${data.icon_url}">
            </div>
            <div class="d-lg-none" style="width: calc(100% - 60px)">
                <h5 class="secondary name">${data.name}</h5>
                ${data.address}
                ${memoInner}
            </div>
        </div>
    `;
}

function showRenameAdbkPrompt(adbkid) {
    var item = $('.adbk-item[data-adbkid="' + adbkid + '"]');
    var oldName = item.data('name');
    
    $('#adbk-rename-form').unbind('submit');
    $('#adbk-rename-form').submit(function(event) {
        event.preventDefault();
        
        var name = $('#adbk-name').val();
        
        if(!validateAdbkName(name)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-adbk-rename').modal('hide');
        
        $.ajax({
            url: config.apiUrl + '/wallet/addressbook/rename',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                adbkid: adbkid,
                new_name: name
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                item.data('name', name);
                item.find('.name').html(name);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });     
    });
    
    $('#adbk-name').val(oldName);
    $('#help-adbk-name').hide();
    $('#modal-adbk-rename').modal('show');
}

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/wallet/addressbook',
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
                $.each(data.addressbook, function(adbkid, data) {
                    $('#adbk-data').append(renderAdbkItem(adbkid, data));
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

function mobileAdbkDetails(item) {
    if($(window).width() > 991) return;
    
    var adbkid = $(item).data('adbkid');
    
    $('#madbk-name').html($(item).data('name'));
    $('#madbk-rename-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        showRenameAdbkPrompt(adbkid);
    });
    $('#madbk-remove-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        removeAdbk(adbkid);
    });
    $('#madbk-address').html($(item).data('address'));
    $('#madbk-network').html($(item).data('network'));
    $('#madbk-asset').html($(item).data('asset'));
    
    var memo = $(item).data('memo');
    if(memo != '') {
        $('#madbk-memo-name').html($(item).data('memo-name') + ':');
        $('#madbk-memo').html(memo);
        $('#madbk-memo-wrapper').show();
    }
    else
        $('#madbk-memo-wrapper').hide();
    
    $('#modal-adbk-details').modal('show');
}