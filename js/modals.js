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
    const popup = queue.pop();
    if(!popup) return;
    
    msgBox(
        popup.body,
        popup.title,
        function() {
            let seenPopupId = localStorage.getItem('seenPopupId');
            if(!seenPopupId || popup.popupid > seenPopupId)
                localStorage.setItem('seenPopupId', popup.popupid);
            
            setTimeout(
                function() {
                    showPopups(queue);
                },
                1000
            );
        }
    );
}

$(document).on('renderingComplete', function() {
    let url = '/info/v2/popup';
    let seenPopupId = localStorage.getItem('seenPopupId');
    if(seenPopupId)
        url += '?localId=' + seenPopupId;
    
    api(
        'GET',
        url
    ).then(function(resp) {
        showPopups(resp.popups);
    });
});