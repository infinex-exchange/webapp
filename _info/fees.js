$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $.ajax({
        url: config.apiUrl + '/info/spot_fees',
        type: 'POST',
        data: JSON.stringify({
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.fees, function(level, data) {   
                $('#spot-fees-data').append(`
                    <div class="row p-2 hoverable">
                        <div class="col-1 d-none d-lg-block">
                            ${level}
                        </div>
                        <div class="col-1 d-lg-none my-auto text-center">
                            Lvl
                            <h3>${level}</h3>
                        </div>
                        <div class="col-11">
                            <div class="row">
                                <div class="col-6 d-lg-none secondary">
                                    30d trade volume:
                                </div>
                                <div class="col-6 col-lg text-end">
                                    &ge; ${data.volume} ${data.volume_asset}
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Hold:
                                </div>
                                <div class="col-6 col-lg text-end">
                                    &ge; ${data.hold} ${data.hold_asset}
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Maker fee:
                                </div>
                                <div class="col-6 col-lg text-end">
                                    ${data.maker_fee}%
                                </div>
                                <div class="col-6 d-lg-none secondary">
                                    Taker fee:
                                </div>
                                <div class="col-6 col-lg text-end">
                                    ${data.taker_fee}%
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
            
            $(document).trigger('renderingStage'); 
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });
    
    window.wdFeesAS = new AjaxScroll(
        $('#withdrawal-fees-data'),
        $('#withdrawal-fees-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
    
            $.ajax({
                url: config.apiUrl + '/info/withdrawal_fees',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.fees, function(k, asset) {
                        var showAsset = true;
                        
                        $.each(asset.networks, function(k, network) {
                            var assetStr = '';
                            if(showAsset) {
                                assetStr = `
                                    <img width="16" height="16" src="${asset.asset_icon_url}">
                                    ${asset.asset}
                                `;
                                showAsset = false;
                            }
                               
                            $('#withdrawal-fees-data').append(`
                                <div class="row p-2 hoverable">
                                    <div class="col my-auto">
                                        ${assetStr}
                                    </div>
                                    <div class="col my-auto">
                                        ${network.network_description}
                                    </div>
                                    <div class="col text-end d-none d-lg-block my-auto">
                                        0
                                    </div>
                                    <div class="col text-end my-auto">
                                        ${network.fee}
                                    </div>
                                </div>
                            `);
                        });
                    });
                    
                    thisAS.done();
                    
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                    
                    if(data.fees.length != 50)
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