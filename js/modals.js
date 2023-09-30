function msgBox(message, title = null, redirectOrCallback = null) {
    if(!title)
        title = 'Error';
    
    let modal = $('#modal');
    
    modal.find('.modal-title').html(title);
    modal.find('.modal-body').html(message);
    
    modal.find('.modal-close').unbind('click');
    if(typeof redirectOrCallback == "string")
        modal.find('.modal-close').click(function() {
            window.location.replace(redirectOrCallback);
        });
    else if(typeof redirectOrCallback == "function")
        modal.find('.modal-close').click(redirectOrCallback);
        
    modal.modal('show');
}

function yesNoPrompt(message, callback, title = null) {
    if(!title)
        title = 'Confirmation';
    
    let modal = $('#modal-yn');
    
    modal.find('.modal-title').html(title);
    modal.find('.modal-body').html(message);
    
    modal.find('.yes').unbind('click').click(function() {
        callback();
    });
        
    modal.modal('show');
}

// TODO Legacy code
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
                
                var modal = $('#modal');
                modal.find('.modal-title').html(data.title);
                modal.find('.modal-body').html(data.body);
                modal.find('.modal-close').unbind('click');
                modal.modal('show');
            }
        }
    });
});