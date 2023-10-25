window.renderingStagesTarget = 1;

function renderVoting(data) {
    let header = data.current ? '' : `
        <div class="col-12">
            <h4>Voting #${data.votingid} - ${data.month}/${data.year}</h4>
        </div>
    `;
    
    let projects = '';
    let totalVotes = 0;
    
    for(proj of data.projects)
        totalVotes += proj.votes;
    
    for(proj of data.projects) {
        let progressVal = Math.floor(proj.votes / totalVotes * 100); 
    
        let voteButton = '';
        if(data.current) {
            if(window.loggedIn)
                voteButton = `
                    <a href="#_" class="btn btn-sm btn-primary w-100" onClick="voteShowModal(${proj.projectid})">
                      <i class="fa-solid fa-check-to-slot"></i>
                      Vote
                    </a>
                `;
            else
                voteButton = `
                    <div class="small border border-primary rounded p-2 text-center w-100">
                        <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> to vote
                    </div>
                `;
        }
        else if(proj.winner)
            voteButton = `
                <strong class="secondary">
                    WINNER!
                </strong>
            `;
        
        projects += `
            <div class="col-12 hoverable">
                <div class="row">
                    <div class="col-9 col-lg-11 my-auto py-3">
                    <div class="row">
                        <div class="col-auto pb-1">
                            <strong>${proj.symbol}</strong>
                            <span class="secondary">${proj.name}</span>
                            <span class="small">
                                <a href="${proj.website}" target="_blank">(website)</a>
                            </span>
                        </div>
                        <div class="col-auto ms-auto">
                            <strong>${proj.votes} votes</strong>
                        </div>
                        <div class="col-12">
                            <div class="progress">   
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${progressVal}%; background-color: ${proj.color};">
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-3 col-lg-1 my-auto py-1">
                        ${voteButton}
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div data-id="${data.votingid}" class="row ui-card-light p-2 mb-3">
            ${header}
            ${projects}
        </div>
    `;
}

$(document).ready(function() {
    apiRaw(
        'GET',
        '/vote/v2/votings/current'
    ).then(
        function(data) {
            $('#current-voting-data').html(
                renderVoting(data)
            );
            
            $(document).trigger('renderingStage');
        },
        function(error) {
            if(error.code == 'NOT_FOUND') {
                $('#no-voting').removeClass('d-none');
                $(document).trigger('renderingStage');
            }
            else
                msgBox(error.msg, null, '/');
        }
    );
    
    window.scrHistory = new InfiniteScrollOffsetPg(
        '/vote/v2/votings?history',
        'votings',
        renderVoting,
        $('#previous-votings-data')
    );
});

/*

function voteShowModal(projectid) {
    $.ajax({
        url: config.apiUrl + '/info/voting/current/avbl_votes',
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
            $('#mv-range').val('0').attr('max', data.avbl_votes);
            $('#mv-val').html(0);
            $('#mv-max').html(data.avbl_votes);
            $('#mv-submit').data('projectid', projectid).prop('disabled', true);
            $('#modal-vote').modal('show');
        }
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false); 
    });
}

function reloadCurrentVoting() {
    $.ajax({
        url: config.apiUrl + '/info/voting/current',
        type: 'POST',
        data: JSON.stringify({
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            if(data.voting_open) {
                $('#current-voting-data').html(renderVoting(data, true));
                $('#no-voting').addClass('d-none');
            }
            
            else
                $('#no-voting').removeClass('d-none');
            
            $(document).trigger('renderingStage'); 
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('.submit-project').click(function() {
        $.ajax({
            url: config.apiUrl + '/info/voting/submit/check',
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
                $('#msp-symbol, #msp-name, #msp-website').val('');
                $('.msp-help').hide();
                $('#modal-submit-project').modal('show');
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false); 
        });
    });
    
    $('#msp-submit').click(function() {
        var symbol = $('#msp-symbol').val();
        var name = $('#msp-name').val();
        var website = $('#msp-website').val();
        
        if(!validateAssetSymbol(symbol) ||
           !validateVotingName(name) ||
           !validateVotingWebsite(website)
        ) {
            msgBox('Fill the form correctly');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/info/voting/submit',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                project_symbol: symbol,
                project_name: name,
                project_website: website
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#modal-submit-project').modal('hide');
                msgBox('The proposal has been sent and will appear in the next vote after being verified.');
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false); 
        });
    });
    
	$('#msp-symbol').on('input', function() {
        if(validateAssetSymbol($(this).val()))
            $('#msp-help-symbol').hide();
        else
            $('#msp-help-symbol').show();
    });
    
    $('#msp-name').on('input', function() {
        if(validateVotingName($(this).val()))
            $('#msp-help-name').hide();
        else
            $('#msp-help-name').show();
    });
    
    $('#msp-website').on('input', function() {
        if(validateVotingWebsite($(this).val()))
            $('#msp-help-website').hide();
        else
            $('#msp-help-website').show();
    });
    
    $('#mv-range').on('input', function() {
        var val = $(this).val();
        $('#mv-val').html(val);
        $('#mv-submit').prop('disabled', val < 1);
    });
    
    $('#mv-submit').click(function() {
        var projectid = $(this).data('projectid');
        var votesCount = parseInt($('#mv-range').val());
        
        $.ajax({
            url: config.apiUrl + '/info/voting/current/vote',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                projectid: projectid,
                votes_count: votesCount
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                reloadCurrentVoting();
                $('#modal-vote').modal('hide');
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false); 
        });
    });
    
    window.votingHistoryAS = new AjaxScroll(
        $('#previous-votings-data'),
        $('#previous-votings-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
    
            $.ajax({
                url: config.apiUrl + '/info/voting/history',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.votings, function(k, voting) {
                        thisAS.append(renderVoting(voting, false));
                    });
                    
                    thisAS.done();
                    
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                       
                    if(data.votings.length != 50)
                        thisAS.noMoreData();
                        
                    if(thisAS.offset == 0 && data.votings.length == 0)
                        $('#no-history').removeClass('d-none');
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
});

$(document).on('authChecked', function() {
    reloadCurrentVoting();
    setTimeout(reloadCurrentVoting, 10000);
});*/