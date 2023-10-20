function renderAddress(data) {
	let memoInner = '';
    if(data.network.memo) {
        memoInner = `
            <br>
            <h6 class="d-inline secondary">
                ${data.network.memoName}:
            </h6>
            <small>
                ${data.memo}
            </small>
        `;
    }
    
    return `
        <div data-id="${data.adbkid}" class="adbk-item row p-2 hoverable" onClick="showAddress(this)">
            <div class="my-auto d-none d-lg-block" style="width: 15%">
                <img width="16" height="16" src="${data.network.iconUrl}">
                ${data.network.name}
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 20%">
	            <span class="name">${data.name}</span>
            </div>
            <div class="my-auto wrap d-none d-lg-block" style="width: 35%">
	            ${data.address}
                ${memoInner}
            </div>
            <div class="my-auto text-end d-none d-lg-block" style="width: 20%">
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="editAddress(${data.adbkid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" style="width: 70px" onClick="deleteAddress(${data.adbkid})">Remove</a>
            </div>
            
            <div class="m-auto d-lg-none" style="width: 60px">
                <img width="40" height="40" src="${data.network.iconUrl}">
            </div>
            <div class="d-lg-none" style="width: calc(100% - 60px)">
                <h5 class="secondary name">${data.name}</h5>
                ${data.address}
                ${memoInner}
            </div>
        </div>
    `;
}

function deleteAddress(adbkid) {
    yesNoPrompt(
        'Are you sure you want to remove this address from addressbook?',
        function() {
            api(
                'DELETE',
                '/wallet/v2/addressbook/' + adbkid
            ).then(function() {
                window.scrAdbk.remove(adbkid);
            });
        }
    );
}

function editAddress(adbkid) {
    let old = window.scrAdbk.get(adbkid);
    let oldName = old.data('name');
    
    window.fvAddEdit.onSubmit(function(data) {
        $('#modal-adbk-rename').modal('hide');
        
        api(
            'PATCH',
            '/wallet/v2/addressbook/' + adbkid,
            data
        ).then(function(resp) {
            window.scrAdbk.replace(adbkid, resp);
        });
        
        return true;
    });
    
    $('#adbk-name').val(oldName).trigger('input');
    $('#modal-adbk-rename').modal('show');
}

function showAddress(item) {
    if($(window).width() > 991) return;
    
    let data = $(item).data();
    
    $('#madbk-name').html(data.name);
    $('#madbk-rename-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        renameAddress(data.adbkid);
    });
    $('#madbk-remove-btn').unbind('click').on('click', function() {
        $('#modal-adbk-details').modal('hide');
        removeAddress(data.adbkid);
    });
    $('#madbk-address').html(data.address);
    $('#madbk-network').html(data.network.name);
    
    if(data.memo) {
        $('#madbk-memo-name').html(data.network.memoName + ':');
        $('#madbk-memo').html(data.memo);
        $('#madbk-memo-wrapper').show();
    }
    else
        $('#madbk-memo-wrapper').hide();
    
    $('#modal-adbk-details').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
        
    window.fvAddEdit = new FormValidator(
        $('#adbk-rename-form'),
        null
    );
    window.fvAddEdit.text(
        'name',
        $('#adbk-name'),
        true,
        validateAddressName
    );
    
    window.scrAdbk = new InfiniteScrollOffsetPg(
        '/wallet/v2/addressbook',
        'addresses',
        renderAddress,
        $('#adbk-data')
    );
});

function validateAddressName(name) {
    return name.match(/^[a-zA-Z0-9 ]{1,255}$/);
}