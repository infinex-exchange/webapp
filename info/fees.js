function renderWdFee(data) {
    return `
        <div data-id="${data.keyid}" class="api-keys-item row p-2 hoverable" onClick="showApiKey(this)"
         data-api-key="${data.apiKey}" data-description="${data.description}">
            <div class="col-12 col-lg-4 my-auto wrap">
                <h5 class="secondary api-key-description d-lg-none">${data.description}</h5>
                <span class="api-key-description d-none d-lg-inline">${data.description}</span>
            </div>
            <div class="col-12 col-lg-5">
                <div class="row flex-nowrap">
                    <div class="col-auto col-lg-10 my-auto wrap">
                        <span class="wrap" id="api-key-${data.keyid}">${data.apiKey}</span>
                    </div>
                    <div class="col-auto col-lg-2 my-auto">
                        <a href="#_" class="secondary" data-copy="#api-key-${data.keyid}" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-lg-block my-auto">
                <button type="button" class="btn btn-primary btn-sm" onClick="event.stopPropagation(); editApiKey(${data.keyid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" onClick="event.stopPropagation(); removeApiKey(${data.keyid})">Remove</a>
            </div>
        </div>
    `;      
}

$(document).ready(function() {
    window.scrWdFees = new InfiniteScrollOffsetPg(
        '/wallet/v2/io/fees',
        'fees',
        renderWdFee,
        $('#withdrawal-fees-data')
    );
    
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
    
    
    
    // TODO: legacy code
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
});