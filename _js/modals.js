function msgBox(message) {
    $('#modal-text').html(message);
    $('.modal-close').unbind('click');
    $('#modal').modal('show');
}

function msgBoxRedirect(message, to = '/') {
    $('#modal-text').html(message);
    $('.modal-close').click(function() {
        window.location.replace(to);
    });    
    $('#modal').modal('show');
}


function msgBoxNoConn(redirect = false) {
    if(redirect) msgBoxRedirect('No connection');
    else msgBox('No connection');
}

$(document).on('renderingComplete', function() {
    $.ajax({
        url: config.apiUrl + '/info/banner',
        type: 'POST',
        data: JSON.stringify({}),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success && data.active) {
            var bannerId = localStorage.getItem('bannerId');
                
            if(bannerId === null || bannerId != data.bannerid) {
                localStorage.setItem("bannerId", data.bannerid);
                
                var modal = $('#modal-banner');
                modal.find('.modal-title').html(data.title);
                modal.find('.modal-body').html(data.body);
                modal.modal('show');
            }
        }
    });
});