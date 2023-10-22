$(document).ready(function() {
    $('#select-adbk').on('click', function(event) {
        $('.selector-dropdown').not('#select-adbk-dropdown').hide();
        $('.selector-arrow').not('#select-adbk-arrow').removeClass('flip');
        
        $('#select-adbk-dropdown').toggle();
        $('#select-adbk-arrow').toggleClass('flip');
        
        event.stopPropagation();
    });
    
    $('#select-adbk').on('input', function() {
        $('#select-adbk-dropdown').hide();
        $('#select-adbk-arrow').removeClass('flip');
    });
    
    $('html').on('click', function() {
        $('#select-adbk-dropdown').hide();
        $('#select-adbk-arrow').removeClass('flip');
    });
});

function initSelectAdbk(asset, network) {
    $('#select-adbk-data').empty();
    
    $.ajax({
        url: config.apiUrl + '/wallet/addressbook',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            asset: asset,
            network: network
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.addressbook, function(k, v) {
                var memo = '';
                var memoHtml = '';
                if(typeof(v.memo) !== 'undefined' && typeof(v.memo_name) !== 'undefined') {
                    memo = v.memo;
                    memoHtml = `
                        <br>
                        <h6 class="d-inline secondary">
                            ${v.memo_name}:
                        </h6>
                        <small>
                            ${v.memo}
                        </small>
                    `;
                }
                
                $('#select-adbk-data').append(`
                    <div class="select-adbk-item row p-1 hoverable" data-address="${v.address}" data-memo="${memo}">
                        <div class="col-12">
                            <h5 class="secondary">${v.name}</h5>
                            ${v.address}
                            ${memoHtml}
                        </div>
                    </div>
                `);
            });
                
            $('.select-adbk-item').on('click', function() {
                $('#select-adbk').val($(this).data('address')).trigger('input');
                if($(this).data('memo') != '')
                    $('#withdraw-memo').val($(this).data('memo')).trigger('input');
            });
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}