function renderAsset(data) {
    thisAS.append(`
                                <div class="assets-item row p-1 hoverable" onClick="mobileAssetDetails(this)"
                                data-icon="${v.icon_url}" data-symbol="${k}" data-name="${v.name}"
                                data-total="${v.total}" data-avbl="${v.avbl}" data-locked="${v.locked}">
                                    <div class="my-auto" style="width: 60px">
                                        <img width="40" height="40" src="${v.icon_url}">
                                    </div>
                                    <div class="my-auto m-50-minus" style="width: calc(20% - 60px)">
                                        ${k}<br>
                                        <span class="small">${v.name}</span>
                                    </div>
                                    <div class="text-end my-auto d-none d-lg-block" style="width: 19%">
                                        ${v.total} ${k}
                                    </div>
                                    <div class="text-end my-auto m-50-percent" style="width: 19%">
                                        ${v.avbl}<span class="d-none d-lg-inline"> ${k}</span>
                                    </div>
                                    <div class="text-end my-auto d-none d-lg-block" style="width: 18%">
                                        ${v.locked} ${k}
                                    </div>
                                    <div class="my-auto d-none d-lg-block" style="width: 24%">
                                        <a href="/wallet/deposit/${k}" class="small link-ultra px-1"><strong>Deposit</strong></a>
                                        <a href="/wallet/withdraw/${k}" class="small link-ultra px-1"><strong>Withdraw</strong></a>
                                        <a href="/wallet/transfer/${k}" class="small link-ultra px-1"><strong>Transfer</strong></a>
                                        <a href="#_" class="small link-ultra px-1" onClick="showTrade('${k}', event)"><strong>Trade</strong></a>
                                    </div>
                                </div>
                            `);
                        });
}

function showAsset(item) {
    $('#mad-icon').attr('src', $(item).data('icon'));
    $('#mad-name').html($(item).data('name'));
    $('#mad-total').html($(item).data('total') + ' ' + $(item).data('symbol'));;
    $('#mad-avbl').html($(item).data('avbl') + ' ' + $(item).data('symbol'));
    $('#mad-locked').html($(item).data('locked') + ' ' + $(item).data('symbol'));
    $('#mad-deposit').attr('href', '/wallet/deposit/' + $(item).data('symbol'));
    $('#mad-withdraw').attr('href', '/wallet/withdraw/' + $(item).data('symbol'));
    $('#mad-transfer').attr('href', '/wallet/transfer/' + $(item).data('symbol'));
    $('#mad-trade').off('click').on('click', function() {
        $('#modal-mobile-asset-details').modal('hide');
	    showTrade($(item).data('symbol'));
    });
    
    $('#modal-mobile-asset-details').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    let hideZero = localStorage.getItem('wallet_hideZero');
    if(hideZero === null)
        hideZero = false;
    else
        hideZero = $.parseJSON(hideZero);
    $('#asset-hide-zero').prop('checked', hideZero);
    
    window.balancesScr = new InfiniteScroll(
        '/wallet/v2/balances' + hideZero ? '?nonZero' : '',
        'balances',
        renderAsset,
        $('#asset-data')
    );
    window.balancesScr.bindSearch( $('#asset-search') );
    
    $('#asset-hide-zero').change(function() {
        let hideZero = $(this).prop('checked');
        localStorage.setItem('wallet_hideZero', hideZero);
        window.balancesScr.reset('/wallet/v2/balances' + hideZero ? '?nonZero' : '');
    });
        
    initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true, 10);
});