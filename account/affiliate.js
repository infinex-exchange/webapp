dictRewardType = {
    SPOT: 'Spot',
    MINING: 'Mining',
    NFT: 'NFT',
    NFT_STUDIO: 'NFT Studio'
};

dictRewardTypeColor = {
    SPOT: '#4ecdc4',
    MINING: '#c7f464',
    NFT: '#81d4fa',
    NFT_STUDIO: '#fd6a6a'
};

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#reflink-description').on('input', function() {
        if(validateReflinkDescription($(this).val()))
            $('#help-reflink-description').hide();
        else
            $('#help-reflink-description').show();
    });
});

function removeReflink(refid) {
    $.ajax({
        url: config.apiUrl + '/account/reflinks/remove',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            refid: refid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.reflinks-item[data-refid=' + refid + ']').remove();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });     
}

function addChangeReflink(refid, description, members) {
    var elem = $('.reflinks-item[data-refid=' + refid + ']');
    if(elem.length) {
        elem.data('description', description);
        elem.find('.reflink-description').html(description);
    }
    else {
        var levelsInnerHtml = '';
        for(var i = 1; i <= 4; i++) {
            var display = 'd-none d-lg-block';
            if(i == 1) display = '';
            
            levelsInnerHtml += `
                <div class="col-auto ps-0 text-center ${display}">
                    <div class="p-1 ui-card-light rounded">
                        <h6 class="secondary p-1">Lvl ${i}</h6>
                        <span class="p-1">${members[i]} <i class="fa-solid fa-users secondary"></i></span>
                    </div>
                </div>
            `;
        }
        
        $('#reflinks-data').append(`
            <div class="reflinks-item row p-2 hoverable" onClick="mobileReflinkDetails(this)"
             data-refid="${refid}" data-description="${description}" data-members-1="${members[1]}"
             data-members-2="${members[2]}" data-members-3="${members[3]}" data-members-4="${members[4]}">
                <div class="col-5 col-lg-4 my-auto wrap">
                    <h5 class="secondary reflink-description d-lg-none">${description}</h5>
                    <span class="reflink-description d-none d-lg-inline">${description}</span>
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
                                    <span class="wrap" id="reflink-${refid}-index">http://infinex.cc/?r=${refid}</span>
                                </div>
                                <div class="col-auto my-auto">
                                    <a href="#_" class="secondary" data-copy="#reflink-${refid}-index" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 px-0 pt-4">
                            <h6 class="secondary">Registration form reflink:</h6>
                        </div>
                        <div class="col-12 p-2">
                            <div class="row px-2 py-3 flex-nowrap ui-card-light rounded">
                                <div class="col-auto my-auto wrap">
                                    <span class="wrap" id="reflink-${refid}-reg">http://infinex.cc/account/register?r=${refid}</span>
                                </div>
                                <div class="col-auto my-auto">
                                    <a href="#_" class="secondary" data-copy="#reflink-${refid}-reg" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3 d-none d-lg-block my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showEditReflinkPrompt(${refid})">Rename</a>
                    <button type="button" class="btn btn-primary btn-sm" onClick="removeReflink(${refid})">Remove</a>
                </div>
                <div class="col-12 d-none d-lg-block">
                    <div class="row charts" data-refid="${refid}">
        	            <div class="col-12">
        		            <div class="chart-earn"></div>
        	            </div>
        	            <div class="col-12">
        		            <div class="chart-acquisition"></div>
        	            </div>
                    </div>
                </div>
            </div>
        `);
    }      
}

function showAddReflinkPrompt() {
    $('#reflink-description-form').unbind('submit');
    $('#reflink-description-form').submit(function(event) {
        event.preventDefault();
        
        var description = $('#reflink-description').val();
        
        if(!validateReflinkDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-reflink-desc-prompt').modal('hide');
        
        $.ajax({
            url: config.apiUrl + '/account/reflinks/new',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                description: description
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                addChangeReflink(data.refid, description, {1:0, 2:0, 3:0, 4:0});
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });     
    });
    
    $('#reflink-description').val('');
    $('#help-reflink-description').hide();
    $('#modal-reflink-desc-prompt').modal('show');
}

function showEditReflinkPrompt(refid) {
    var oldDescription = $('.reflinks-item[data-refid=' + refid + ']').attr('data-description');
    
    $('#reflink-description-form').unbind('submit');
    $('#reflink-description-form').submit(function(event) {
        event.preventDefault();
        
        var description = $('#reflink-description').val();
        
        if(!validateReflinkDescription(description)) {
            msgBox('Please fill in the form correctly');
            return;
        }
        
        $('#modal-reflink-desc-prompt').modal('hide');
        
        $.ajax({
            url: config.apiUrl + '/account/reflinks/rename',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                refid: refid,
                description: description
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                addChangeReflink(refid, description, null);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });     
    });
    
    $('#reflink-description').val(oldDescription);
    $('#help-reflink-description').hide();
    $('#modal-reflink-desc-prompt').modal('show');
}

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/account/reflinks',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $.each(data.reflinks, function(k, v) {
                    addChangeReflink(v.refid, v.description, v.members); 
                });
                
                generateCharts();
                
                $(document).trigger('renderingStage');
            } else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });
    }
});

function mobileReflinkDetails(item) {
    if($(window).width() > 991) return;
    
    var refid = $(item).data('refid');
    
    $('#mrd-description').html($(item).data('description'));
    $('#mrd-rename-btn').unbind('click').on('click', function() {
        $('#modal-reflink-details').modal('hide');
        showEditReflinkPrompt(refid);
    });
    $('#mrd-remove-btn').unbind('click').on('click', function() {
        $('#modal-reflink-details').modal('hide');
        removeReflink(refid);
    });
    $('#mrd-reflink-index').html('https://infinex.cc/?r=' + $(item).data('refid'));
    $('#mrd-reflink-reg').html('https://infinex.cc/account/register?r=' + $(item).data('refid'));
    
    var levelsInnerHtml = '';
    for(var i = 1; i <= 4; i++) {
        var members = $(item).data('members-' + i);
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

function generateCharts() {
	window.mastercoin = '';
	    
	$('.charts:visible').each(function() {
	    renderCharts(this, $(this).data('refid'));
	});
}

function renderCharts(div, refid) {
	var earnOptions = {
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
                    var date = config.w.config.series[0].data[config.dataPointIndex].x.split('/');
                    showEarnDetails(parseInt(date[0]), parseInt(date[1]), refid);
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
                    return value + ' ' + window.mastercoin;
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
        }
    };
	
	var earnChart = new ApexCharts($(div).find('.chart-earn')[0], earnOptions);
    earnChart.render();
    
    var acqChart = new ApexCharts($(div).find('.chart-acquisition')[0], acqOptions);
    acqChart.render();
	
	var data = new Object();
	data['api_key'] = window.apiKey;
	if(refid != '') data['refid'] = refid;
	
	$.ajax({
        url: config.apiUrl + '/account/affiliate_settlements',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            window.mastercoin = data.mastercoin;
            
            var earnSeries = [
                {
                    name: 'Rewards',
                    data: new Array()
                }
            ];
			var acqSeries = [
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
			
			for(set of data.settlements) {
				var month = set.month + '/' + set.year;
				
				earnSeries[0].data.push({
		            x: month,
		            y: set.mastercoin_equiv
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
        } else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}

function showEarnDetails(month, year, refid) {
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
            shared: true,
            intersect: false
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
                
                console.log(changeHue(dictRewardTypeColor[rtype], (lvl - 1) * 5));
                colors.push(changeHue(dictRewardTypeColor[rtype], (lvl - 1) * 5));
                
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
}