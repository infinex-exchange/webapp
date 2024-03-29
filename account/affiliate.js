window.renderingStagesTarget = 1;

var dictRewardType = {
    SPOT: 'Spot',
    MINING: 'Mining',
    NFT: 'NFT',
    NFT_STUDIO: 'NFT Studio'
};

var dictRewardTypeColor = {
    SPOT: '#4ecdc4',
    MINING: '#c7f464',
    NFT: '#81d4fa',
    NFT_STUDIO: '#fd6a6a'
};

function renderReflink(data) {
    let levelsInnerHtml = '';
    for(let i = 1; i <= 4; i++) {
        let display = 'd-none d-lg-block';
        if(i == 1) display = '';
        
        levelsInnerHtml += `
            <div class="col-auto ps-0 text-center ${display}">
                <div class="p-1 ui-card-light rounded">
                    <h6 class="secondary p-1">Lvl ${i}</h6>
                    <span class="p-1">${data.members[i]} <i class="fa-solid fa-users secondary"></i></span>
                </div>
            </div>
        `;
    }
        
    return `
        <div class="reflinks-item row p-2 hoverable" onClick="showReflink(this)"
         data-id="${data.refid}" data-description="${data.description}" data-members-1="${data.members[1]}"
         data-members-2="${data.members[2]}" data-members-3="${data.members[3]}" data-members-4="${data.members[4]}">
            <div class="col-5 col-lg-4 my-auto wrap">
                <h5 class="secondary reflink-description d-lg-none">${data.description}</h5>
                <span class="reflink-description d-none d-lg-inline">${data.description}</span>
            </div>
            <div class="col-auto col-lg-5 my-auto ms-auto">
                <div class="row flex-nowrap">
                    ${levelsInnerHtml}
                </div>
                <div class="row d-none d-lg-flex">
                    <div class="col-12 px-0 pt-4">
                        <h6 class="secondary">Home page reflink:</h6>
                    </div>
                    <div class="col-12 p-2">
                        <div class="row px-2 py-3 flex-nowrap ui-card-light rounded">
                            <div class="col-auto my-auto wrap">
                                <span class="wrap" id="reflink-${data.refid}-index">http://infinex.cc/?r=${data.refid}</span>
                            </div>
                            <div class="col-auto my-auto">
                                <a href="#_" class="secondary" data-copy="#reflink-${data.refid}-index" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 px-0 pt-4">
                        <h6 class="secondary">Registration form reflink:</h6>
                    </div>
                    <div class="col-12 p-2">
                        <div class="row px-2 py-3 flex-nowrap ui-card-light rounded">
                            <div class="col-auto my-auto wrap">
                                <span class="wrap" id="reflink-${data.refid}-reg">http://infinex.cc/account/register?r=${data.refid}</span>
                            </div>
                            <div class="col-auto my-auto">
                                <a href="#_" class="secondary" data-copy="#reflink-${data.refid}-reg" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3 d-none d-lg-block my-auto">
                <button type="button" class="btn btn-primary btn-sm" onClick="event.stopPropagation(); editReflink(${data.refid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" onClick="event.stopPropagation(); removeReflink(${data.refid})">Remove</a>
            </div>
        </div>
    `;    
}

function removeReflink(refid) {
    yesNoPrompt(
        'Are you sure you want to remove this reflink?',
        function() {
            api(
                'DELETE',
                '/affiliate/v2/reflinks/' + refid
            ).then(function() {
                window.reflinksScr.remove(refid);
            });
        }
    );
}

function addReflink() {
    window.fvAddEdit.onSubmit(function(data) {
        $('#modal-reflink-desc-prompt').modal('hide');
        
        api(
            'POST',
            '/affiliate/v2/reflinks',
            data
        ).then(function(resp) {
            window.reflinksScr.append(resp);
        });
        
        return true;
    });
    window.fvAddEdit.reset();
    
    $('#modal-reflink-desc-prompt').modal('show');
}

function editReflink(refid) {
    let old = window.reflinksScr.get(refid);
    let oldDescription = old.data('description');
    
    window.fvAddEdit.onSubmit(function(data) {
        $('#modal-reflink-desc-prompt').modal('hide');
        
        api(
            'PATCH',
            '/affiliate/v2/reflinks/' + refid,
            data
        ).then(function(resp) {
            window.reflinksScr.replace(refid, resp);
        });
        
        return true;
    });
    
    $('#reflink-description').val(oldDescription).trigger('input');
    $('#modal-reflink-desc-prompt').modal('show');
}

function showReflink(item) {
    let refid = $(item).data('id');
    
    $('#mrd-description').html($(item).data('description'));
    $('#mrd-rename-btn').unbind('click').on('click', function() {
        $('#modal-reflink-details').modal('hide');
        editReflink(refid);
    });
    $('#mrd-remove-btn').unbind('click').on('click', function() {
        $('#modal-reflink-details').modal('hide');
        removeReflink(refid);
    });
    $('#mrd-reflink-index').html('https://infinex.cc/?r=' + refid);
    $('#mrd-reflink-reg').html('https://infinex.cc/account/register?r=' + refid);
    
    let levelsInnerHtml = '';
    for(let i = 1; i <= 4; i++) {
        let members = $(item).data('members-' + i);
        levelsInnerHtml += `
            <div class="col-auto ps-0 text-center">
                <div class="p-1 rounded" style="background-color: var(--color-input);">
                    <h6 class="secondary p-1">Lvl ${i}</h6>
                    <span class="p-1">${members} <i class="fa-solid fa-users secondary"></i></span>
                </div>
            </div>
        `;
    }
    $('#mrd-members-inner').html(levelsInnerHtml);
    
    renderCharts($('#mrd-charts'), refid);
    
    $('#modal-reflink-details').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.fvAddEdit = new FormValidator(
        $('#reflink-description-form'),
        null
    );
    window.fvAddEdit.text(
        'description',
        $('#reflink-description'),
        true,
        validateReflinkDescription
    );
    
    window.refCoin = '';
    
    window.reflinksScr = new InfiniteScrollOffsetPg(
        '/affiliate/v2/reflinks',
        'reflinks',
        renderReflink,
        $('#reflinks-data')
    );
    
    renderCharts('#charts-agg');
    $(document).trigger('renderingStage');
});

function deriveColor(hexColor, magnitude) {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
}

function renderCharts(div, refid = null) {
	let earnOptions = {
        series: [],
        chart: {
            height: 200,
            type: 'bar',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            background: $(':root').css('--color-bg-light'),
            events: {
                dataPointSelection: function(event, chartContext, config) {
                    if(!refid)
                        return;
                    
                    showRewards(
                        refid,
                        config.w.config.series[0].data[config.dataPointIndex].description.afseid
                    );
                }
            }
        },
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            type: 'category'
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + ' ' + window.refCoin;
                }
            }
        },
        noData: {
            text: 'Loading...'
        },
        dataLabels: {
            enabled: false
        },
        theme: {
	        mode: 'dark'
	    },
        title: {
            text: 'Earnings'
        }
    };
    
    let acqOptions = {
        series: [],
        chart: {
            height: 200,
            type: 'bar',
            stacked: true,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            background: $(':root').css('--color-bg-light')
        },
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            type: 'category'
        },
        noData: {
            text: 'Loading...'
        },
        dataLabels: {
            enabled: false
        },
        theme: {
	        mode: 'dark'
	    },
        tooltip: {
            shared: true,
            intersect: false
        },
        title: {
            text: 'Acquisition'
        }
    };
	
	let earnChart = new ApexCharts($(div).find('.chart-earn')[0], earnOptions);
    earnChart.render();
    
    let acqChart = new ApexCharts($(div).find('.chart-acquisition')[0], acqOptions);
    acqChart.render();
	
	let url = refid === null
            ? '/affiliate/v2/agg-settlements?limit=12'
            : '/affiliate/v2/settlements?limit=12&refid=' + refid;
    
    api(
        'GET',
        url
    ).then(function(data) {
        window.refCoin = data.refCoin;
            
        let earnSeries = [
            {
                name: 'Rewards',
                data: new Array()
            }
        ];
        let acqSeries = [
            {
                name: 'Lvl 1',
                data: new Array()
            },
            {
                name: 'Lvl 2',
                data: new Array()
            },
            {
                name: 'Lvl 3',
                data: new Array()
            },
            {
                name: 'Lvl 4',
                data: new Array()
            }
        ];
	
        for(set of data.settlements.reverse()) {
            let month = set.month + '/' + set.year;
		
    		earnSeries[0].data.push({
                x: month,
                y: set.refCoinEquiv,
                description: {
                    afseid: typeof set.afseid === 'undefined' ? null : set.afseid
                }
            });
    
            acqSeries[0].data.push({
                x: month,
                y: set.acquisition['1']
            });
                
                acqSeries[1].data.push({
                x: month,
                y: set.acquisition['2']
            });
                
                acqSeries[2].data.push({
                x: month,
                y: set.acquisition['3']
            });
                
                acqSeries[3].data.push({
                x: month,
                y: set.acquisition['4']
            });
	    }
	
        earnChart.updateSeries(earnSeries, true);
        acqChart.updateSeries(acqSeries, true);
    });
}

function showRewards(refid, afseid) {
    $('#modal-reflink-details').modal('hide');
    
    let options = {
        series: [],
        chart: {
            type: 'bar',
            stacked: true,
            stackType: '100%',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            background: $(':root').css('--color-bg-light')
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        stroke: {
            curve: 'straight'
        },
        xaxis: {
            type: 'category'
        },
        noData: {
            text: 'Loading...'
        },
        dataLabels: {
            enabled: false
        },
        theme: {
	        mode: 'dark'
	    },
        tooltip: {
            shared: false,
            intersect: true
        }
    };
	
	let chart = new ApexCharts($('#mr-chart')[0], options);
    chart.render();
    $('#modal-rewards').modal('show');
    
    api(
        'GET',
        '/affiliate/v2/settlements/' + afseid + '/rewards'
    ).then(function(data) {
        let series = new Array();
        let serieMaxCount = 0;
        let colors = new Array();
        
        for(let rtype in dictRewardType) for(let lvl = 1; lvl < 4; lvl++) {
            let serieCount = 0;
            let serieData = new Array();
            
            for(let reward of data.rewards)
                if(reward.type == rtype && reward.slaveLevel == lvl) {
                    serieData.push({
                        x: reward.asset,
                        y: reward.amount
                    });
                    
                    serieCount++;
                }
            
            series.push({
                name: dictRewardType[rtype] + ' (Lvl ' + lvl + ')',
                data: serieData
            });
            
            colors.push(deriveColor(dictRewardTypeColor[rtype], (lvl - 1) * 15));
            
            if(serieCount > serieMaxCount)
                serieMaxCount = serieCount;
        }
        
        chart.updateSeries(series);
        chart.updateOptions({
            chart: {
                height: serieMaxCount * 35
            },
            colors: colors
        });
    });
}

function validateReflinkDescription(desc) {
    return desc.match(/^[a-zA-Z0-9 ]{1,255}$/);
}