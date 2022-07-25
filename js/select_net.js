$(document).ready(function() {
    $('#select-net').on('click', function(event) {
        $('#select-coin-dropdown').hide();
        $('#select-coin-arrow').removeClass('flip');
        $('#select-net-dropdown').toggle();
        $('#select-net-arrow').toggleClass('flip');
        $('#select-adbk-dropdown').hide();
        $('#select-adbk-arrow').removeClass('flip');
        event.stopPropagation();
    });
    
    $('html').on('click', function() {
        $('#select-net-dropdown').hide();
        $('#select-net-arrow').removeClass('flip');
    });
});

function initSelectNet(asset, endpoint = '/wallet/networks', forceAutoSelect = false) {
    $('#select-net').val('');
    $('#select-net-data').empty();
    
    var data = {};
    if(asset !== null)
        data = { asset: asset };
    
    $.ajax({
        url: config.apiUrl + endpoint,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.networks, function(k, v) {
                $('#select-net-data').append(`
                    <div class="select-net-item row p-1 hoverable" data-network="${k}" data-description="${v.description}">
                        <div class="col-auto my-auto text-center" style="width: 32px">
                            <img width="24px" height="24px" src="${v.icon_url}">
                        </div>
                        <div class="col my-auto">
                            ${v.description}
                        </div>
                    </div>
                `);
            });
            
            $('#select-net').trigger('dataLoaded');
                
            $('.select-net-item').on('click', function() {
                $('#select-net').val($(this).attr('data-description'));
                $('#select-net').data('network', $(this).data('network'));
                $('#select-net').trigger('change');
            });
                
            if(Object.keys(data.networks).length == 1)
                $('.select-net-item').trigger('click');
            
            else if(forceAutoSelect && Object.keys(data.networks).length > 0)
                $('.select-net-item').first().trigger('click');
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}