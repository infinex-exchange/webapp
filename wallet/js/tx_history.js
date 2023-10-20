const txTypeDict = {
    DEPOSIT: 'Deposit',
    WITHDRAWAL: 'Withdrawal',
    TRANSFER_IN: 'Incoming transfer',
    TRANSFER_OUT: 'Outgoing transfer'
};

const txTypeIconDict = {
    DEPOSIT: 'fa-solid fa-circle-plus',
    WITHDRAWAL: 'fa-solid fa-circle-minus',
    TRANSFER_IN: 'fa-solid fa-user-plus',
    TRANSFER_OUT: 'fa-solid fa-user-minus'
};

const txStatusDict = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    CONFIRM_PENDING: 'Waiting for confirmation',
    DONE: 'Done',
    CANCEL_PENDING: 'Canceling',
    CANCELED: 'Canceled'
};

const txStatusIconDict = {
    PENDING: 'fa-solid fa-clock',
    PROCESSING: 'fa-solid fa-cog fa-spin',
    CONFIRM_PENDING: 'fa-solid fa-clock',
    DONE: 'fa-solid fa-check',
    CANCEL_PENDING: 'fa-solid fa-xmark fa-spin',
    CANCELED: 'fa-solid fa-xmark'
};

window.observeXid = null;

function renderTransaction(data, forceSmall) { 
    let optLgNone = forceSmall ? '' : 'd-lg-none';
    let optLgBlock = forceSmall ? 'd-lg-block' : '';
    
    let createTime = new Date(data.createTime * 1000).toLocaleString();
    
    let bigConfHtml = '';
    let smallConfHtml = '';
    if(data.status == 'CONFIRM_PENDING') {
        let confHtml = `${data.confirmations}&nbsp;/&nbsp;${data.confirmTarget}`;
        if(data.confirmations != data.confirmTarget) {
            bigConfHtml = '<br><span class="secondary">' + confHtml + '</span>';
            smallConfHtml = '<span class="pe-2">' + confHtml + '</span>';
        }
    }
    
    return `
        <div data-id="${data.xid}" class="row hoverable tx-history-item px-1 py-2" onClick="showTransaction(this)">
            <div class="my-auto d-none ${optLgBlock}" style="width: 20%">
                ${createTime}
            </div>
            <div class=" my-auto d-none ${optLgBlock}" style="width: 20%">
                ${txTypeDict[data.type]}
            </div>
            <div class="my-auto d-none ${optLgBlock}" style="width: 20%">
                <img width="16" height="16" src="${data.asset.iconUrl}">
                ${data.asset.name}
            </div>
            <div class="text-end my-auto d-none ${optLgBlock}" style="width: 20%">
                ${data.amount} ${data.asset.symbol}
            </div>
            <div class="text-end my-auto d-none ${optLgBlock}" style="width: 20%">
                <i class="${txStatusIconDict[data.status]}"></i>
                ${txStatusDict[data.status]}
                ${bigConfHtml}
            </div>
            <div style="width: 60px" class="my-auto ${optLgNone}">
                <div class="p-2" style="position: relative">
                    <img width="40" height="40" src="${data.asset.iconUrl}">
                    <div class="tx-history-icon-wrapper">
                        <i class="tx-history-icon ${txTypeIconDict[data.type]}"></i>
                    </div>
                </div>
            </div>
            <div style="width: 50%" class="my-auto ${optLgNone}">
                <h6 class="secondary">${txTypeDict[data.type]}</h6>
                <span>${data.amount} ${data.asset.symbol}</span>
            </div>
            <div style="width: calc(50% - 60px)" class="my-auto text-end ${optLgNone}">
                ${smallConfHtml}
                <i class="${txStatusIconDict[data.status]}"></i>
            </div>
        </div>
    `;
}

function cancelTransaction(xid) {
    yesNoPrompt(
        'Are you sure you want to cancel this transaction?',
        function() {
            api(
                'DELETE',
                '/wallet/v2/io/transactions/' + xid
            ).then(function(data) {
                window.scrTransactions.replace(xid, data);
            });
        }
    );
}

function showTransaction(item, update = false) {
    let data = $(item).data();
    
    $('#mtd-status').html(txStatusDict[data.status]);
    $('#mtd-status-icon').removeClass()
                         .addClass(txStatusIconDict[data.status]);
    
    if(data.status == 'CONFIRM_PENDING')
        $('#mtd-confirms').removeClass('d-none').addClass('d-block').html(`
            ${data.confirmations}&nbsp;/&nbsp;${data.confirmTarget}
        `);
    else
        $('#mtd-confirms').removeClass('d-block').addClass('d-none').html('');
        
    let confirmTime = '-';
    if(data.confirmTime)
        confirmTime = new Date(data.confirmTime * 1000).toLocaleString();
    $('#mtd-confirm-time').html(confirmTime);
    
    $('#mtd-txid').html(data.txid ? data.txid : '-');
    $('#mtd-height').html(data.height ? data.height : '-');
    
    if(data.delayed)
        $('#mtd-delayed-alert').show();
    else
        $('#mtd-delayed-alert').hide();
    
    if(data.type == 'WITHDRAWAL' && (data.status == 'PENDING' || data.status == 'PROCESSING'))
        $('#mtd-cancel-btn').show();
    else
        $('#mtd-cancel-btn').hide();
    
    if(!update) {
        window.observeXid = data.xid;
        
        $('#mtd-op-icon').removeClass()
                         .addClass('tx-history-icon')
                         .addClass(txTypeIconDict[data.type]);
        
        $('#mtd-type').html(txTypeDict[data.type]);
        
        $('#mtd-icon').attr('src', data.asset.iconUrl);
        $('#mtd-asset').html(data.asset.name);
        
        $('#mtd-network').html(data.network ? data.network.name : '-');
        
        $('#mtd-address').html(data.address);
        if(data.network && data.network.memoName) {
            $('#mtd-memo').html(data.memo ? data.memo : '-');
            $('#mtd-memo-name').html(data.network.memoName + ':');
            $('#mtd-memo-wrapper').show();
        }
        else {
            $('#mtd-memo-wrapper').hide();
        }
    
        $('#mtd-amount').html(data.amount + ' ' + data.asset.symbol);
        $('#mtd-fee').html(data.fee ? (data.fee + ' ' + data.asset.symbol) : '-');
        
        $('#mtd-create-time').html(new Date(data.createTime * 1000).toLocaleString());
        
        $('#mtd-cancel-btn').unbind('click').on('click', function() {
            cancelTransaction(data.xid);
        });
        
        $('#modal-mobile-tx-details').modal('show');
    }
}

function initTxHistory(
    type = null,
    container = null,
    preloader = null,
    forceSmall = true,
    limit = 10
) {
    if(container === null)
        container = $('#recent-tx-data');
    
    let url = '/wallet/v2/io/transactions';
    let ampersand = false;
    
    if(type !== null) {
        url += ampersand ? '&' : '?';
        ampersand = true;
        
        url += 'type=';
        if(type instanceof Array)
            url += type.join(',');
        else
            url += type;
    }
    
    let urlNoLimit = url;
    
    if(limit !== null) {
        url += ampersand ? '&' : '?';
        url += 'limit=' + limit;
    }
    
    window.scrTransactions = new InfiniteScrollOffsetPg(
        url,
        'transactions',
        function(data) { // render
            renderTransaction(data, forceSmall);
        },
        container,
        false,
        function(elem) { // afterAdd
            if(elem.data('xid') == window.observeXid)
                showTransaction(elem, true);
        },
        preloader,
        null,
        function() { // onFirstPageLoaded
            if(limit)
                window.scrTransactions.freeze();
            
            setInterval(
                function() {
                    updateTxHistory(urlNoLimit);
                },
                3000
            );
        }
    );
}

function updateTxHistory(url) {  
    api(
        'GET',
        url
    ).then(function(data) {
        for(const transaction of data.transactions) {
            if(window.scrTransactions.get(transaction.xid))
                window.scrTransactions.replace(transaction.xid, transaction);
            else
                window.scrTransactions.prepend(transaction);
        }
    });
}