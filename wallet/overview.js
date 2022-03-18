var txTypeIconDict = {
    DEPOSIT: 'fa-solid fa-circle-plus',
    WITHDRAWAL: 'fa-solid fa-circle-minus',
};

var txTypeDict = {
    DEPOSIT: 'Deposit',
    WITHDRAWAL: 'Withdrawal',
    TRADE_SPOT: 'Spot trade'
};

var txStatusIconDict = {
    PENDING: 'fa-solid fa-clock',
    DONE: 'fa-solid fa-check'
};

function searchAssets(q) {
    $('.assets-item').show();
    
    if($('#asset-hide-zero').prop('checked')) {
        $('.assets-item[zero=1]').hide();
    }
    
    if(q != '') {
        q = q.replace(/[^a-z0-9]/gi, '');
        q = q.toUpperCase();
        $('.assets-item').hide();
        $('.assets-item[search *= "' + q + '"]').show();
    }
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#asset-search').on('input', function() {
        searchAssets($(this).val());
    });
    
    $('#asset-hide-zero').change(function() {
        searchAssets($('#asset-search').val());
    });
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/wallet/balances_ex',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .done(function (data) {
            if(data.success) {
                $.each(data.balances, function() {
                    fullName = this.full_name.toUpperCase();
                    zero = 0;
                    if(this.total == 0) zero = 1;
                    $('#asset-data').append(`
                        <div class="assets-item row p-1 hoverable" search="${this.symbol} ${fullName}" zero="${zero}">
                            <div class="col-1 my-auto">
                                <img width="40px" height="40px" src="${this.icon}">
                            </div>
                            <div class="col-2 my-auto">
                                ${this.symbol}<br>
                                <span class="font-1">${this.full_name}</span>
                            </div>
                            <div class="col-2 text-end my-auto">
                                ${this.total} ${this.symbol}
                            </div>
                            <div class="col-2 text-end my-auto">
                                ${this.available} ${this.symbol}
                            </div>
                            <div class="col-2 text-end my-auto">
                                ${this.locked} ${this.symbol}
                            </div>
                            <div class="col-3 my-auto">
                                <a href="/wallet/deposit/${this.symbol}" class="btn btn-primary btn-sm font-1">Deposit</a>
                                <a href="/wallet/withdraw/${this.symbol}" class="btn btn-primary btn-sm font-1">Withdraw</a>
                            </div>
                        </div>
                    `);
                });
                
                $(document).trigger('renderingStage');
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {  
        });
    
        $.ajax({
            url: config.apiUrl + '/wallet/transactions',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .done(function (data) {
            if(data.success) {
                $.each(data.transactions, function() {
                    var innerhtml = '';
                    var amount = '';
                    var innerhtml2 = `
                        <span class="text-hi">Time:</span> ${this.time}
                    `;
                
                    if(this.type == 'TRADE_SPOT') {
                        innerhtml = `
                            <div style="position: relative">
                                <img width="20" height="20" src="${this.src_icon}">
                                <img style="position: absolute; top: 20px; left: 20px;" width="20" height="20" src="${this.dst_icon}">
                                <img style="position: absolute; top: 0px; left: 20px; transform: scaleX(-1) rotate(90deg);" src="/img/swap_arrow.svg" width="20" height="20">
                                <img style="position: absolute; top: 20px; left: 0px;" src="/img/swap_arrow.svg" width="20" height="20">
                            </div>
                        `;
                        amount = this.src_amount + ' ' + this.src_coin + ' <i class="fa-solid fa-arrow-right-long"></i> '
                            + this.dst_amount + ' ' + this.dst_coin;
                        innerhtml2 += `
                            <br>
                            <span class="text-hi">Avg price:</span> ${this.avg_price}
                        `;
                    }
                    else {
                        innerhtml = `
                            <div class="p-2" style="position: relative">
                                <img width="40" height="40" src="${this.icon}">
                                <div style="position: absolute; bottom: 0px">
                                    <i style="font-size: 16px; color: var(--color-ultra);" class="${txTypeIconDict[this.type]}"></i>
                                </div>
                            </div>
                        `;
                        amount = this.amount + ' ' + this.coin;
                        if(this.type == 'DEPOSIT') {
                            innerhtml2 += `
                                <br>
                                <span class="text-hi">Confirmations:</span> ${this.confirms}/${this.confirms_target}
                            `;
                        }
                        var txiduser = showTxid(this.txid);
                        innerhtml2 += `
                            <br>
                            <span class="text-hi">TxID:</span> ${txiduser}
                        `;
                    }
            
                    $('#recent-tx-data').append(`
                        <div class="row p-1 hoverable hover-to-expand">
                            <div class="col-2 my-auto">
                                ${innerhtml}
                            </div>
                            <div class="col-8 my-auto">
                                <span class="text-hi">${txTypeDict[this.type]}</span><br>
                                <span class="font-1">${amount}</span>
                            </div>
                            <div class="col-2 my-auto">
                                <i class="${txStatusIconDict[this.status]}"></i>
                            </div>
                            <div class="col-2 expand"></div>
                            <div class="col-8 expand font-1">
                                ${innerhtml2}
                            </div>
                            <div class="col-2 expand"></div>
                        </div>
                    `);
                });
                
                $(document).trigger('renderingStage');
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn();  
        });
    }
});