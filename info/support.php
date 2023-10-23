<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <script src="/account/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <script src="/js/Select.js?<?php echo filemtime(__DIR__.'/../js/Select.js'); ?>"></script>
        <script src="/js/SelectCoin.js?<?php echo filemtime(__DIR__.'/../js/SelectCoin.js'); ?>"></script>
        <script src="/js/SelectNet.js?<?php echo filemtime(__DIR__.'/../js/SelectNet.js'); ?>"></script>
        <title>Support | Infinex</title>
    </head>
    <body class="body-background">
        <?php include(__DIR__.'/../inc/body.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 background">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include(__DIR__.'/inc/sidebar.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
        
            <div class="row p-2">
                <h2>Support</h2>
            </div>
            
            <div class="row">
                <div class="col-12 p-2">
                    <p>
                        This is the official Infinex support contact form. We do not respond to requests sent in any other way, like social media.
                        We'll respond to your request by e-mail, usually within 48 hours, excluding Saturdays and Sundays.
                    </p>
                </div>
                <div class="support-step col-12 p-2">
                    <h5 class="secondary pb-1">Please select the request subject:</h5>
                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action" data-goto="support-login" data-for="guest">
                            I have the issue with login or registration
                        </button>
                        <button type="button" class="list-group-item list-group-item-action" data-goto="support-deposit" data-for="user">
                            I have the issue with my deposit
                        </button>
                        <button type="button" class="list-group-item list-group-item-action" data-goto="support-withdrawal" data-for="user">
                            I have the issue with my withdrawal
                        </button>
                        <button type="button" class="list-group-item list-group-item-action" data-goto="support-other" data-for="user">
                            I have the issue with other services
                        </button>
                    </div>
                </div>
                
                <div id="support-login" class="support-step col-12 p-2 d-none">
                    <form id="form-login">
                    <div class="row">
                    
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Please enter your e-mail address:</h5>
                        </div>
                        <div class="col-12 col-lg-6">
                            <input id="sl-email" type="email" class="form-control">
                        </div>
    
    
                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">Please describe the problem:</h5>
                        </div>
                        <div class="col-12">
                            <textarea id="sl-description" class="w-100" rows="10"></textarea>
                        </div>
                        
                        
                        <div class="col-12 pt-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        
                        
                    </div>
                    </form>
                </div>
                
                <div id="support-deposit" class="support-step col-12 p-2 d-none">
                    <form id="form-deposit">
                    <div class="row">
                    
                    
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Which coin did you deposited?</h5>
                        </div>
                        <div class="col-12 col-lg-6">
                            <i id="select-coin"></i>
                        </div>
    
    
                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">Which network did you use?</h5>
                        </div>
                        <div class="col-12 col-lg-6">
                            <i id="select-net"></i>
                        </div>


                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">Has the full 8 hours passed since the deposit was made?</h5>
                        </div>
                        <div class="col-6 col-lg-3 sd-ynprompt">
                            <button id="sd-yes" type="button" class="btn btn-primary w-100">Yes</button>
                        </div>
                        <div class="col-6 col-lg-3 sd-ynprompt">
                            <button type="button" class="btn btn-primary w-100" data-goto="support-deposit-lt8h">No</button>
                        </div>
                        <div class="col-12 sd-yes-answer d-none">
                            Yes
                        </div>
                        
                        
                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">TxID of the transaction you made:</h5>
                        </div>
                        <div class="col-12 col-lg-6">
                            <input id="sd-txid" type="text" class="form-control">
                        </div>
                        
                        
                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">Please describe the problem:</h5>
                        </div>
                        <div class="col-12">
                            <textarea id="sd-description" class="w-100" rows="10"></textarea>
                        </div>
                        
                        
                        <div class="col-12 pt-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    
                    
                    </div>
                    </form>
                </div>
                
                <div id="support-deposit-lt8h" class="support-step col-12 p-2 d-none">
                    <div class="alert alert-warning d-flex align-items-center my-2" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-hourglass-half fa-2x"></i>
                        </div>
                        <div class="px-2">
                            <h5 class="pb-2">We can't accept your request right now</h5>
                            Most deposit issues are temporary and will resolve automatically after a few minutes or hours.<br>
                            Probably our technicians are already working on fixing this issue.<br>
                            You can submit a support request only if a full 8 hours have passed since the deposit was made.
                        </div>
                    </div>
                </div>
                
                <div id="support-withdrawal" class="support-step col-12 p-2 d-none">
                    <form id="form-withdrawal">
                    <div class="row">
                    
                    
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Please select the transaction you have the issue with:</h5>
                        </div>
                        <div class="col-12 ui-card-light">
                            <div class="row m-0" id="sw-list">
                            </div>
                        </div>


                        <div class="col-12 pt-3 pb-1">
                            <h5 class="secondary">Please describe the problem:</h5>
                        </div>
                        <div class="col-12">
                            <textarea id="sw-description" class="w-100" rows="10"></textarea>
                        </div>
                        
                        
                        <div class="col-12 pt-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    
                    
                    </div>
                    </form>
                </div>
                
                
                <div id="support-withdrawal-lt8h" class="support-step col-12 p-2 d-none">
                    <div class="alert alert-warning d-flex align-items-center my-2" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-hourglass-half fa-2x"></i>
                        </div>
                        <div class="px-2">
                            <h5 class="pb-2">We can't accept your request right now</h5>
                            Most withdrawal issues are temporary and will resolve automatically after a few minutes or hours.<br>
                            Probably our technicians are already working on fixing this issue.<br>
                            You can submit a support request only if a full 8 hours have passed since the withdrawal was ordered.
                        </div>
                    </div>
                </div>

                <div id="support-withdrawal-canceled" class="support-step col-12 p-2 d-none">
                    <div class="alert alert-warning d-flex align-items-center my-2" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-hourglass-half fa-2x"></i>
                        </div>
                        <div class="px-2">
                            <h5 class="pb-2">We can't accept your request right now</h5>
                            You have canceled this withdrawal, therefore it has not been executed.<br>
                            The funds have been returned to your Infinex account.
                        </div>
                    </div>
                </div>

                <div id="support-withdrawal-pending" class="support-step col-12 p-2 d-none">
                    <div class="alert alert-warning d-flex align-items-center my-2" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-hourglass-half fa-2x"></i>
                        </div>
                        <div class="px-2">
                            <h5 class="pb-2">We can't accept your request right now</h5>
                            This withdrawal is pending. No funds have been permanently debited from your Infinex account.<br>
                            You can cancel this withdrawal at any time.<br>
                            <br>
                            1. Keep in mind that withdrawals of certain coins may be not available for technical reasons.
                            You can always convert your funds to another coin and order a withdrawal.<br>
                            2. If the selected coin is available on multiple networks, try using a different network.<br>
                            3. If you are trying to withdraw the non-native token that cannot be used to pay the blockchain fee directly
                            (e.g. USDT withdrawal via ERC-20 network requires some ETH additionally), the withdrawal will
                            not be made if the liquidity and trading volume of native asset (e.g. ETH/USDT) is insufficient.
                            You can provide some liquidity on blockchain native asset pairs to help solve this issue.
                        </div>
                    </div>
                </div>
                
                <div id="support-other" class="support-step col-12 p-2 d-none">
                    <form id="form-other">
                    <div class="row">
                    
                    
                        <div class="col-12 pb-1 guest-only">
                            <h5 class="secondary">Your e-mail address:</h5>
                        </div>
                        <div class="col-12 col-lg-6 pb-3 guest-only">
                            <input id="so-email" type="email" class="form-control">
                        </div>
    
    
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Please describe the problem:</h5>
                        </div>
                        <div class="col-12">
                            <textarea id="so-description" class="w-100" rows="10"></textarea>
                        </div>
                        
                        
                        <div class="col-12 pt-3">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        
                        
                    </div>
                    </form>
                </div>
            </div>
            
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <script src="/info/support.js?<?php echo filemtime(__DIR__.'/support.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    </body>
</html>
