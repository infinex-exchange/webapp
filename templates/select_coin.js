$(document).ready(function() {
    $('#select-coin').on('click', function(event) {
        $('.selector-dropdown').not('#select-coin-dropdown').hide();
        $('.selector-arrow').not('#select-coin-arrow').removeClass('flip');
        
        $('#select-coin-dropdown').toggle();
        $('#select-coin-arrow').toggleClass('flip');
        
        if($('#select-coin-arrow').hasClass('flip'))
            $('#select-coin-search').focus();
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-coin-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-coin-dropdown').hide();
        $('#select-coin-arrow').removeClass('flip');
    });
    
    $('#select-coin-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectCoinAS.data.search;
        else
            window.selectCoinAS.data.search = query;
        window.selectCoinAS.reset();
    });
});

function initSelectCoin(endpoint = '/wallet/assets') {
    window.selectCoinAS = new AjaxScroll(
        $('#select-coin-data'),
        $('#select-coin-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
                
            $.ajax({
                url: config.apiUrl + endpoint,
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.assets, function(k, v) {
                        var prec = '';
                        if(typeof(v.prec) !== 'undefined') prec = v.prec;

                        var experimental = '';
                        if(typeof(v.experimental) !== 'undefined') experimental = v.experimental;
                        
                        thisAS.append(`
                            <div class="select-coin-item row p-1 hoverable" data-asset="${k}" data-prec="${prec}" data-experimental="${experimental}">
                                <div class="col-auto my-auto text-center" style="width: 32px">
                                    <img width="24px" height="24px" src="${v.icon_url}">
                                </div>
                                <div class="col my-auto">
                                    <strong>${k}</strong>
                                    <span class="secondary">${v.name}</span>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-coin').trigger('dataLoaded');
                    
                    $('.select-coin-item').on('click', function(event) {
                        $('#select-coin').val($(this).attr('data-asset'));
                        $('#select-coin').data('prec', $(this).attr('data-prec'));
                        $('#select-coin').data('experimental', $(this).attr('data-experimental'));
                        $('#select-coin').trigger('change');
                    });
                        
                    thisAS.done();
                            
                    if(Object.keys(data.assets).length != 50)
                        thisAS.noMoreData();
                } else {
                    msgBoxRedirect(data.error);
                    thisAS.done();
                    thisAS.noMoreData();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(true);
                thisAS.done();
                thisAS.noMoreData();
            }); 
        }
    );
}
