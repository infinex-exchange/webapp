function renderWdFee(asset) {
    let rows = '';
    
    let assetStr = `
        <img width="16" height="16" src="${asset.iconUrl}">
        ${asset.name}
    `;
        
    for(const network of asset.networks) {
        rows += `
            <div class="row p-2 hoverable">
                <div class="col my-auto">
                    ${assetStr}
                </div>
                <div class="col my-auto">
                    <img width="16" height="16" src="${network.iconUrl}">
                    ${network.name}
                </div>
                <div class="col text-end d-none d-xl-block">
                    ${network.deposits.minAmount} ${asset.symbol}
                </div>
                <div class="col text-end d-none d-xl-block">
                    ${network.withdrawals.minAmount} ${asset.symbol}
                </div>
                <div class="col text-end d-none d-xl-block">
                    ${network.withdrawals.feeMin} ${asset.symbol}
                </div>
            </div>
        `;
        
        assetStr = '';
    }
    
    return `
        <div data-id="${asset.symbol}" class="row">
        <div class="col-12">
            ${rows}
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