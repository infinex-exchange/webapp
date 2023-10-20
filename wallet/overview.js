function renderAsset(data) {
    let total = prettyBalance(data.total, data.defaultPrec);
    let avbl = prettyBalance(data.avbl, data.defaultPrec);
    
    return `
        <div data-id="${data.symbol}" class="assets-item row p-1 hoverable" onClick="showAsset(this)"
        data-icon="${data.iconUrl}" data-name="${data.name}" data-total="${data.total}"
        data-avbl="${data.avbl}" data-locked="${data.locked}">
            <div class="my-auto" style="width: 60px">
                <img width="40" height="40" src="${data.iconUrl}">
            </div>
            <div class="my-auto m-50-minus" style="width: calc(20% - 60px)">
                ${data.symbol}<br>
                <span class="small">${data.name}</span>
            </div>
            <div class="text-end my-auto d-none d-lg-block" style="width: 25%">
                ${total} ${data.symbol}
            </div>
            <div class="text-end my-auto m-50-percent" style="width: 25%">
                ${avbl}<span class="d-none d-lg-inline"> ${data.symbol}</span>
            </div>
            <div class="my-auto d-none d-lg-block" style="width: 30%">
                <a href="/wallet/deposit/${data.symbol}" onClick="event.stopPropagation()" class="small link-ultra px-1"><strong>Deposit</strong></a>
                <a href="/wallet/withdrawal/${data.symbol}" onClick="event.stopPropagation()" class="small link-ultra px-1"><strong>Withdraw</strong></a>
                <a href="/wallet/transfer/${data.symbol}" onClick="event.stopPropagation()" class="small link-ultra px-1"><strong>Transfer</strong></a>
                <a href="#_" class="small link-ultra px-1" onClick="showTrade('${data.symbol}', event)"><strong>Trade</strong></a>
            </div>
        </div>
    `;
}

function showAsset(item) {
    $('#mad-icon').attr('src', $(item).data('icon'));
    $('#mad-name').html($(item).data('name'));
    $('#mad-total').html($(item).data('total') + ' ' + $(item).data('id'));;
    $('#mad-avbl').html($(item).data('avbl') + ' ' + $(item).data('id'));
    $('#mad-locked').html($(item).data('locked') + ' ' + $(item).data('id'));
    $('#mad-deposit').attr('href', '/wallet/deposit/' + $(item).data('id'));
    $('#mad-withdraw').attr('href', '/wallet/withdrawal/' + $(item).data('id'));
    $('#mad-transfer').attr('href', '/wallet/transfer/' + $(item).data('id'));
    $('#mad-trade').off('click').on('click', function() {
        $('#modal-mobile-asset-details').modal('hide');
	    showTrade($(item).data('id'));
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
    
    window.balancesScr = new InfiniteScrollOffsetPg(
        '/wallet/v2/balances' + (hideZero ? '?nonZero' : ''),
        'balances',
        renderAsset,
        $('#asset-data')
    );
    window.balancesScr.bindSearch( $('#asset-search') );
    
    $('#asset-hide-zero').change(function() {
        let hideZero = $(this).prop('checked');
        localStorage.setItem('wallet_hideZero', hideZero);
        window.balancesScr.reset('/wallet/v2/balances' + (hideZero ? '?nonZero' : ''));
    });
        
    initTxHistory();
});