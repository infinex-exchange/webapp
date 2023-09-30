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

/*function showEarnDetails(month, year, refid) {
    var options = {
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
	
	var chart = new ApexCharts($('#mr-chart')[0], options);
    chart.render();
    
    var data = new Object();
	data['api_key'] = window.apiKey;
    data['month'] = month;
    data['year'] = year;
	if(refid != '') data['refid'] = refid;
	
	$.ajax({
        url: config.apiUrl + '/account/affiliate_rewards',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('#modal-reflink-details').modal('hide');
            $('#modal-rewards').modal('show');
            
            var series = new Array();
            var serieMaxCount = 0;
            var colors = new Array();
            
            for(var rtype in dictRewardType) for(var lvl = 1; lvl < 4; lvl++) {
                var serieCount = 0;
                var serieData = new Array();
                
                for(var reward of data.rewards)
                    if(reward.reward_type == rtype && reward.slave_level == lvl) {
                        serieData.push({
                            x: reward.assetid,
                            y: reward.amount
                        });
                        
                        serieCount++;
                    }
                
                series.push({
                    name: dictRewardType[rtype] + ' (Lvl ' + lvl + ')',
                    data: serieData
                });
                
                console.log(deriveColor(dictRewardTypeColor[rtype], (lvl - 1) * 15));
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
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}*/

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
                <button type="button" class="btn btn-primary btn-sm" onClick="editReflink(${data.refid})">Rename</a>
                <button type="button" class="btn btn-primary btn-sm" onClick="removeReflink(${data.refid})">Remove</a>
            </div>
            <div class="col-12 d-none d-lg-block">
                <div class="row charts" data-refid="${data.refid}">
    	            <div class="col-12">
    		            <div class="chart-earn"></div>
    	            </div>
    	            <div class="col-12">
    		            <div class="chart-acquisition"></div>
    	            </div>
                </div>
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
                '/affiliate/reflinks/' + refid
            ).then(function() {
                window.reflinksScr.remove(refid);
            });
        }
    );
}

function addReflink() {
    $('#reflink-description-form').unbind('submit');
    $('#reflink-description-form').submit(function(event) {
        event.preventDefault();
        
        let description = $('#reflink-description').val();
        
        if(!validateReflinkDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-reflink-desc-prompt').modal('hide');
        
        api(
            'POST',
            '/affiliate/reflinks',
            {
                description: description
            }
        ).then(function(data) {
            window.reflinksScr.append({
                refid: data.refid,
                description: description,
                members: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                }
            });
        });
    });
    
    $('#reflink-description').val('');
    $('#help-reflink-description').hide();
    $('#modal-reflink-desc-prompt').modal('show');
}

function editReflink(refid) {
    let old = window.reflinksScr.get(refid);
    let oldDescription = old.data('description');
    
    $('#reflink-description-form').unbind('submit');
    $('#reflink-description-form').submit(function(event) {
        event.preventDefault();
        
        let description = $('#reflink-description').val();
        
        if(!validateReflinkDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-reflink-desc-prompt').modal('hide');
        
        api(
            'PATCH',
            '/affiliate/reflinks/' + refid,
            {
                description: description
            }
        ).then(function() {
            window.reflinksScr.replace(refid, {
                refid: refid,
                description: description,
                members: {
                    1: old.data('members-1'),
                    2: old.data('members-2'),
                    3: old.data('members-3'),
                    4: old.data('members-4')
                }
            });
        });
    });
    
    $('#reflink-description').val(oldDescription);
    $('#help-reflink-description').hide();
    $('#modal-reflink-desc-prompt').modal('show');
}

function showReflink(item) {
    if($(window).width() > 991) return;
    
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
    
    //renderCharts($('#mrd-charts'), refid);
    
    $('#modal-reflink-details').modal('show');
}

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    $('#reflink-description').on('input', function() {
        if(validateReflinkDescription($(this).val()))
            $('#help-reflink-description').hide();
        else
            $('#help-reflink-description').show();
    });
    
    window.refCoin = '';
    
    window.reflinksScr = new InfiniteScrollOffsetPg(
        '/affiliate/reflinks',
        'reflinks',
        renderReflink,
        '#reflinks-data'
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

/*function generateCharts() {
	window.mastercoin = '';
	    
	$('.charts:visible').each(function() {
	    renderCharts(this, $(this).data('refid'));
	});
}*/

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
                    /*let date = config.w.config.series[0].data[config.dataPointIndex].x.split('/');
                    showEarnDetails(parseInt(date[0]), parseInt(date[1]), refid);*/
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
    
    var acqOptions = {
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
            ? '/affiliate/agg-settlements?limit=12'
            : '/affiliate/reflinks/' + refid + '/settlements?limit=12';
    
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
	
        for(set of data.settlements.reverse() {
            let month = set.month + '/' + set.year;
		
    		earnSeries[0].data.push({
                x: month,
                y: set.refCoinEquiv
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