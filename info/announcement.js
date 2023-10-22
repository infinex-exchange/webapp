window.renderingStagesTarget = 1;

$(document).ready(function() {
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
    
    let pathArray = window.location.pathname.split('/');
    let pathLast = pathArray[pathArray.length - 1].split('-');
    let pathAnnoid = pathLast[0];
    
    api(
        'GET',
        '/info/v2/announcements/' + pathAnnoid + '?full'
    ).then(function(data) {
        let markdown = marked.parse(data.body ? data.body : data.excerpt);
        let time = new Date(data.time * 1000).toLocaleString();
        
        document.title = data.title + ' | Infinex';
            
        $('#anno-title').html(data.title);
        $('#anno-time').html(time);
        $('#anno-body').html(markdown);
            
        $(document).trigger('renderingStage');
    });
});