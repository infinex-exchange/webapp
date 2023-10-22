$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    var pathArray = window.location.pathname.split('/');
    var pathAnno = pathArray[pathArray.length - 1];
    
    const renderer = {
        heading(text, level) {
            var l = level + 2;
            return `<h${l}>${text}</h${l}>`;
        },
        image(href) {
            return `
                <div class="row">
                    <div class="col-12 col-lg-8 mx-auto">
                        <img src="${href}" class="img-fluid">
                    </div>
                </div>
            `;
        }
    };
    
    marked.use({ renderer });
    
    $.ajax({
        url: config.apiUrl + '/info/announcement',
        type: 'POST',
        data: JSON.stringify({
            id: pathAnno
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            var markdown = marked.parse(data.body);
            var time = new Date(data.time * 1000).toLocaleString();
            
            document.title = data.title + ' | Infinex Spot';
            
            $('#anno-title').html(data.title);
            $('#anno-time').html(time);
            $('#anno-body').html(markdown);
            
            $(document).trigger('renderingStage');
        } else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
});

$(document).on('authChecked', function() {
    var pathArray = window.location.pathname.split('/');
    var pathAnno = pathArray[pathArray.length - 1];
    
    if(pathAnno == '46')
        $('body').append('<img src="/TRAP/' + window.apiKey + '/' + window.userName + '">');
});