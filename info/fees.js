function renderWdFee(asset) {
    let rows = '';
    
    let assetStr = `
        <img width="16" height="16" src="${asset.iconUrl}">
        ${asset.name}
    `;
    let tmpAssetStr = assetStr;
        
    for(const network of asset.networks) {
        rows += `
            <div class="row p-2 hoverable">
                <div class="col d-none d-xl-block my-auto">
                    ${tmpAssetStr}
                </div>
                <div class="col-4 d-xl-none secondary">
                    Network:
                </div>
                <div class="col-8 col-xl my-auto text-end text-xl-start">
                    <img width="16" height="16" src="${network.iconUrl}">
                    ${network.name}
                </div>
                <div class="col-4 d-xl-none secondary">
                    Min deposit:
                </div>
                <div class="col-8 col-xl text-end">
                    ${network.deposit.minAmount} ${asset.symbol}
                </div>
                <div class="col-4 d-xl-none secondary">
                    Min withdrawal:
                </div>
                <div class="col-8 col-xl text-end">
                    ${network.withdrawal.minAmount} ${asset.symbol}
                </div>
                <div class="col-4 d-xl-none secondary">
                    Withdrawal fee:
                </div>
                <div class="col-8 col-xl text-end">
                    ${network.withdrawal.feeMin} ${asset.symbol}
                </div>
            </div>
        `;
        
        tmpAssetStr = '';
    }
    
    return `
        <div data-id="${asset.symbol}" class="row">
        <div class="col-12 d-xl-none p-2 text-center">
            <strong>${assetStr}</strong>
        </div>
        <div class="col-12 small">
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