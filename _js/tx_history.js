var txTypeIconDict = {
    DEPOSIT: 'fa-solid fa-circle-plus',
    WITHDRAWAL: 'fa-solid fa-circle-minus',
    TRANSFER_IN: 'fa-solid fa-user-plus',
    TRANSFER_OUT: 'fa-solid fa-user-minus'
};

var txTypeDict = {
    DEPOSIT: 'Deposit',
    WITHDRAWAL: 'Withdrawal',
    TRANSFER_IN: 'Incoming transfer',
    TRANSFER_OUT: 'Outgoing transfer'
};

var txStatusIconDict = {
    PENDING: 'fa-solid fa-clock',
    PROCESSING: 'fa-solid fa-cog fa-spin',
    DONE: 'fa-solid fa-check',
    CANCEL_PENDING: 'fa-solid fa-xmark fa-spin',
    CANCELED: 'fa-solid fa-xmark'
};

var txStatusDict = {
    PENDING: 'Pending',
    PROCESSING: 'Executing',
    DONE: 'Done',
    CANCEL_PENDING: 'Canceling',
    CANCELED: 'Canceled'
};

var txExecTimeDict = {
    DEPOSIT: 'Confirm time',
    WITHDRAWAL: 'Execute time',
    TRANSFER_IN: 'Execute time',
    TRANSFER_OUT: 'Execute time'
};

function cancelWithdrawal(xid) {
    $.ajax({
        url: config.apiUrl + '/wallet/withdraw/cancel',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            xid: xid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            updateTxHistory();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });     
}

function mobileTxDetails(item, update = false) {
    var type = $(item).data('type');
    var status = $(item).data('status');
    var confirms = $(item).data('confirms');
    var memoName = $(item).data('memo-name');
    var xid = $(item).data('xid');
    
    $('#mtd-status').html(txStatusDict[status]);
    $('#mtd-status-icon').removeClass()
                         .addClass(txStatusIconDict[status]);
    if(confirms != '')
        $('#mtd-confirms').removeClass('d-none').addClass('d-block').html(confirms);
    else
        $('#mtd-confirms').removeClass('d-block').addClass('d-none').html('');
        
    $('#mtd-exec-time').html( $(item).data('exec-time') );
    
    $('#mtd-txid').html( $(item).data('txid') );
    $('#mtd-height').html( $(item).data('height') );
    
    if($(item).data('delayed'))
        $('#mtd-delayed-alert').show();
    else
        $('#mtd-delayed-alert').hide();
    
    if(type == 'WITHDRAWAL' && (status == 'PENDING' || status == 'PROCESSING'))
        $('#mtd-cancel-btn').show();
    else
        $('#mtd-cancel-btn').hide();
    
    if(!update) {
        $('#modal-mobile-tx-details').attr('data-xid', xid);
        
        $('#mtd-icon').attr('src', $(item).data('icon-url'));
        $('#mtd-op-icon').removeClass()
                         .addClass('tx-history-icon')
                         .addClass(txTypeIconDict[type]);
        $('#mtd-asset').html( $(item).data('asset') );
        $('#mtd-type').html(txTypeDict[type]);
        
        $('#mtd-network').html( $(item).data('network') );
        $('#mtd-address').html( $(item).data('address') );
        if(memoName != '') {
            $('#mtd-memo').html( $(item).data('memo') );
            $('#mtd-memo-name').html(memoName + ':');
            $('#mtd-memo-wrapper').show();
        }
        else {
            $('#mtd-memo-wrapper').hide();
        }
    
        $('#mtd-amount').html( $(item).data('amount') );
        $('#mtd-fee').html( $(item).data('fee') );
        
        $('#mtd-create-time').html( $(item).data('create-time') );
        
        $('#mtd-exec-time-title').html(txExecTimeDict[type] + ':');
        
        $('#mtd-cancel-btn').unbind('click').on('click', function() {
            cancelWithdrawal(xid);
        });
        
        $('#modal-mobile-tx-details').modal('show');
    }
}

function renderTxHistoryItem(data, forceSmall) { 
    var dLgNone = 'd-lg-none';
    if(forceSmall) dLgNone = '';
    
    var dNoneDLgBlock = 'd-none d-lg-block';
    if(forceSmall) dNoneDLgBlock = 'd-none';
    
    var cTime = new Date(data.create_time * 1000).toLocaleString();
    
    var confHtml = '';
    var bigConfHtml = '';
    var smallConfHtml = '';
    if(data.status != 'DONE' &&
       typeof(data.confirms) !== 'undefined' &&
       typeof(data.confirms_target) !== 'undefined')
    {
        confHtml = `${data.confirms}&nbsp;/&nbsp;${data.confirms_target}`;
        if(data.confirms != data.confirms_target) {
            bigConfHtml = '<br><span class="secondary">' + confHtml + '</span>';
            smallConfHtml = '<span class="pe-2">' + confHtml + '</span>';
        }
    }
    
    var memoName = '';
    if(typeof(data.memo_name) !== 'undefined')
        memoName = data.memo_name;
    else if(data.type == 'TRANSFER_IN' || data.type == 'TRANSFER_OUT')
        memoName = 'Title';
    
    var memo = '-';
    if(typeof(data.memo) !== 'undefined')
        memo = data.memo;
    
    var eTime = '-';
    if(typeof(data.exec_time) !== 'undefined')
        eTime = new Date(data.exec_time * 1000).toLocaleString();
    
    var txid = '-';
    if(typeof(data.txid) !== 'undefined')
        txid = data.txid;
    
    var height = '-';
    if(typeof(data.height) !== 'undefined')
        height = data.height;
    
    var delayed = 'false';
    if(typeof(data.delayed) !== 'undefined')
        delayed = data.delayed;
    
    var fee = '-';
    if(typeof(data.fee) !== 'undefined')
        fee = data.fee;
        
    var networkDescription = '-';
    if(typeof(data.network_description) !== 'undefined')
        networkDescription = data.network_description;
    
    return `
        <div class="row hoverable tx-history-item px-1 py-2" onClick="mobileTxDetails(this)" data-xid="${data.xid}"
         data-type="${data.type}" data-asset="${data.asset}" data-network="${networkDescription}"
         data-amount="${data.amount}" data-status="${data.status}" data-create-time="${cTime}"
         data-address="${data.address}" data-memo="${memo}" data-exec-time="${eTime}"
         data-confirms="${confHtml}" data-txid="${txid}" data-height="${height}"
         data-fee="${fee}" data-icon-url="${data.icon_url}" data-memo-name="${memoName}"
         data-delayed="${delayed}">
            
            
            
            
            <div class="my-auto ${dNoneDLgBlock}" style="width: 20%">
                ${cTime}
            </div>
            
            <div class=" my-auto ${dNoneDLgBlock}" style="width: 20%">
                ${txTypeDict[data.type]}
            </div>
            
            <div class="my-auto ${dNoneDLgBlock}" style="width: 20%">
                <img width="16" height="16" src="${data.icon_url}">
                ${data.asset}
            </div>
            
            <div class="text-end my-auto ${dNoneDLgBlock}" style="width: 20%">
                ${data.amount}
            </div>
            
            <div class="text-end my-auto ${dNoneDLgBlock}" style="width: 20%">
                <i class="${txStatusIconDict[data.status]}"></i>
                ${txStatusDict[data.status]}
                ${bigConfHtml}
            </div>
            
            
            
            
            <div style="width: 60px" class="my-auto ${dLgNone}">
                <div class="p-2" style="position: relative">
                    <img width="40" height="40" src="${data.icon_url}">
                    <div class="tx-history-icon-wrapper">
                        <i class="tx-history-icon ${txTypeIconDict[data.type]}"></i>
                    </div>
                </div>
            </div>
            
            <div style="width: 50%" class="my-auto ${dLgNone}">
                <h6 class="secondary">${txTypeDict[data.type]}</h6>
                <span>${data.amount} ${data.asset}</span>
            </div>
            
            <div style="width: calc(50% - 60px)" class="my-auto text-end ${dLgNone}">
                ${smallConfHtml}
                <i class="${txStatusIconDict[data.status]}"></i>
            </div>
            
            
            
            
        </div>
    `;
}

function initTxHistory(container, preloader, data, forceSmall = false, disableScroll = false, limit = 0) {
    window.TxHistoryAS = new AjaxScroll(
        container,
        preloader,
        data,
        function() {
            this.data.offset = this.offset;
            this.forceSmall = forceSmall;
            var thisAS = this;
                
            $.ajax({
                url: config.apiUrl + '/wallet/transactions',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    if(limit != 0)
                        data.transactions = data.transactions.slice(0, limit);
                
                    $.each(data.transactions, function() {
                        thisAS.append(renderTxHistoryItem(this, forceSmall));
                        
                        if(typeof(window.xidOldest) === 'undefined' || this.xid < window.xidOldest)
                            window.xidOldest = this.xid;
                            
                        if(typeof(window.xidLatest) === 'undefined' || this.xid > window.xidLatest)
                            window.xidLatest = this.xid;
                    });
                    
                    thisAS.done();
                
                    if(thisAS.offset == 0 && typeof(window.updateTxHistoryInterval) == 'undefined') {
                        $(document).trigger('renderingStage');
                        clearInterval(window.updateTxHistoryInterval);
                        window.updateTxHistoryInterval = setInterval(updateTxHistory, 10000);
                    }
                        
                    if(data.transactions.length != 50 || disableScroll)
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
}

function updateTxHistory(offset = 0) {  
    var data = window.TxHistoryAS.data;
    data.offset = offset;
    
    $.ajax({
        url: config.apiUrl + '/wallet/transactions',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .done(function (data) {
        if(data.success) {
            var i = 0;
            var end = false;
                
            $.each(data.transactions, function() {
                i++;
                
                if(typeof(window.xidLatest) == 'undefined' || this.xid > window.xidLatest) {
                    window.TxHistoryAS.prepend(renderTxHistoryItem(this, window.TxHistoryAS.forceSmall));
                    window.xidLatest = this.xid;
                    $(document).trigger('newWalletTransaction');
                }
                
                else if(typeof(window.xidOldest) == 'undefined' || this.xid < window.xidOldest) {
                    window.xidOldest = this.xid;
                    end = true;
                    return false;
                }
                
                var item = $('.tx-history-item[data-xid="' + this.xid + '"]');
                if(item.length) {
                    // Dynamic fields:
                    //  - status
                    //  - confirms
                    //  - exec_time
                    //  - txid
                    //  - height
                    item.replaceWith(renderTxHistoryItem(this, window.TxHistoryAS.forceSmall));
                    if($('#modal-mobile-tx-details[data-xid="' + this.xid + '"]').length)
                        mobileTxDetails($('.tx-history-item[data-xid="' + this.xid + '"]'), true);
                }
            });
            
            if(!end && i == 50)
                updateTxHistory(offset + i);
        }
    });
}