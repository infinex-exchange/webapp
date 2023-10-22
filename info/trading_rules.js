$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    window.spotRulesAS = new AjaxScroll(
        $('#spot-rules-data'),
        $('#spot-rules-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
    
            $.ajax({
                url: config.apiUrl + '/spot/markets_ex',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.markets, function(k, v) {
                        var minAmount = new BigNumber(10);
                        minAmount = minAmount.pow(-v.base_precision).toFixed(v.base_precision);
                        
                        var minPrice = new BigNumber(10);
                        minPrice = minPrice.pow(-v.quote_precision).toFixed(v.quote_precision);
                     
                        thisAS.append(`
                            <div class="row p-2 hoverable">
                                <div class="col-6 d-lg-none secondary my-auto">
                                    Pair:
                                </div>
                                <div class="col-6 col-lg text-end text-lg-start my-auto">
                                    <img width="16" height="16" src="${v.icon_url}">
                                    ${v.base}<span class="small secondary">/${v.quote}</span>
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Min trade amount:
                                </div>
                                <div class="col-6 col-lg text-end text-lg-start">
                                    ${minAmount} ${v.base}
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Min amount move:
                                </div>
                                <div class="col-6 col-lg text-end text-lg-start">
                                    ${minAmount} ${v.base}
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Min price move:
                                </div>
                                <div class="col-6 col-lg text-end text-lg-start">
                                    ${minPrice} ${v.quote}
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Min order size:
                                </div>
                                <div class="col-6 col-lg text-end text-lg-start">
                                    ${v.min_order} ${v.quote}
                                </div>
                            </div>
                        `);
                    });
                    
                    thisAS.done();
                    
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                     
                    if(data.markets.length != 50)
                        thisAS.noMoreData(); 
                }
                else {
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
        },
        true,
        true
    );        
});