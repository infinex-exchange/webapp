function renderAnnouncement(data) {
    let markdown = marked.parse(data.excerpt);
    let time = new Date(data.time * 1000).toLocaleString();
    
    let leftColConf = 'd-none';
    let rightColConf = 'col-12';
    let featuredImg = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    
    if(data.featuredImg) {
        leftColConf = 'col-4';
        rightColConf = 'col-8';
        featuredImg = data.featuredImg;
    }
    
    let readMoreClass = data.readMore ? 'col-auto' : 'd-none';
    let readMoreUrl = '/info/announcements/' + data.annoid + '-' + data.path;
    
    return `
        <div class="row mt-0 mb-4 p-2 ui-card-light" data-id="${data.annoid}">
            <div class="${leftColConf} my-auto">
                <img src="${featuredImg}" class="img-fluid">
            </div>
            <div class="${rightColConf}">
                <a href="${readMoreUrl}">
                    <h3 class="pt-3">${data.title}</h3>
                </a>
                <h6 class="pb-2">${time}</h6>
                <div class="secondary">${markdown}</div>
            </div>
            <div class="${readMoreClass} ms-auto ms-lg-0 pb-3">
                <a class="btn btn-primary" href="${readMoreUrl}">
                    Read more
                </a>
            </div>
        </div>
    `;
}

$(document).ready(function() {
    window.scrAnno = new InfiniteScrollOffsetPg(
        '/info/v2/announcements',
        'announcements',
        renderAnnouncement,
        $('#announcements-data')
    );
});