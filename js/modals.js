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

function showPopups(queue) {
    const popup = queue.shift();
    if(!popup) return;
    
    msgBox(
        popup.body,
        popup.title,
        function() {
            let cursor = localStorage.getItem('popupCursor');
            if(!cursor || popup.popupid > cursor)
                localStorage.setItem('popupCursor', popup.popupid);
            
            setTimeout(
                function() {
                    showPopups(queue);
                },
                500
            );
        }
    );
}

$(document).on('renderingComplete', function() {
    let url = '/info/v2/popup';
    let cursor = localStorage.getItem('popupCursor');
    if(cursor)
        url += '?cursor=' + popupCursor;
    
    api(
        'GET',
        url
    ).then(function(resp) {
        showPopups(resp.popups);
    });
});

// TODO: legacy code for compatibility, remove after making all submodules V2

function msgBoxNoConn(redirect = false) {
    msgBox('No connection', null, redirect ? '/' : null);
}

function msgBoxRedirect(message, to = '/') {
    msgBox(message, null, to);
}