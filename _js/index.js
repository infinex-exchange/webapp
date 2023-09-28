function gotoMarket(pair) {
    window.location.replace('/spot/' + pair.replace('/', '_'));
}

function getMarketsForIndex(div, req) {
    var lsKey = div.attr('id').replace('-', '');
    var lsCache = localStorage.getItem(lsKey);
    
    if(lsCache !== null) {
        div.html(lsCache);
		$(document).trigger('renderingStage');
    }
    
    $.ajax({
        url: config.apiUrl + '/spot/markets_ex',
        type: 'POST',
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            div.empty();
            
            data.markets = data.markets.slice(0, 5);
            $.each(data.markets, function(k, v) {   
                var color = '';
                var bnCurrent = new BigNumber(v.price);
                var bnPrevious = new BigNumber(v.previous);
                var comp = bnCurrent.comparedTo(bnPrevious);
                if(comp == 1) color = 'text-green';
                else if(comp == -1) color = 'text-red';
    
                var chgColor = '';
                var changeStr = v.change;
                if(v.change > 0) {
                    chgColor = 'bg-green';
                    changeStr = '+' + changeStr;
                }
                if(v.change < 0)
                    chgColor = 'bg-red';
                
                div.append(`
                    <div class="row py-1 hoverable" onClick="gotoMarket('${v.pair}')">
                        <div class="col-3 m-auto text-nowrap">
                            <img width="28" height="28" src="${v.icon_url}">
                            ${v.base}<span class="small secondary">/${v.quote}</span>
                        </div>
                        <div class="col-4 m-auto text-end">
                            <span class="${color}">
                                ${v.price}
                            </span>
                        </div>
                        <div class="col-2 m-auto text-end">
                            <span class="price-change-box ${chgColor}">
                                ${changeStr}%
                            </span>
                        </div>
                        <div class="col-3 m-auto text-end">
                            ${v.vol_quote}
                        </div>
                    </div>
                `);
            });
            
            if(lsCache === null)
	            $(document).trigger('renderingStage');
	        
	        localStorage.setItem(lsKey, div.html());
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });    
}

function indexUpdate() {
    getMarketsForIndex($('#market-trend-spot-data'), {
        offset: 0,
        sort: 'volume',
        sort_dir: 'desc'
    });
    
    getMarketsForIndex($('#top-gainers-spot-data'), {
        offset: 0,
        sort: 'change',
        sort_dir: 'desc'
    });
    
    getMarketsForIndex($('#top-losers-spot-data'), {
        offset: 0,
        sort: 'change',
        sort_dir: 'asc'
    });
}

$(document).ready(function() {
    window.renderingStagesTarget = 3;
    
    indexUpdate();
    setInterval(indexUpdate, 5000);
});