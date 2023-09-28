<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <?php include('../imports/bignumber.html'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Withdrawal | Infinex</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
        
            <div class="row py-2">
                <h2>Withdraw</h2>
            </div>
            
            <div class="row py-2">
                <div class="col-12">
                    <h3>&#9312 Select coin to withdraw:</h3>
                </div>
                <div class="col-12 col-lg-6">
                    <?php include('../templates/select_coin.php'); ?>
                </div>
            </div>
            
            <div id="withdraw-step2" style="display: none">
                <div class="row py-2">
                    <div class="col-12">
                        <h3>&#9313 Select withdrawal network:</h3>
                    </div>
                    <div class="col-12 col-lg-6">
                        <?php include('../templates/select_net.php'); ?>
                    </div>
                </div>
            </div>
            
            <div id="withdraw-step3" style="display: none">
                <div class="row py-2">
                    <div class="col-12">
                        <h3>&#9314 Complete withdrawal:</h3>
                    </div>
                </div>
                
                <form id="withdraw-form">
                    <div class="row" id="withdraw-operating-warning">
                        <div class="col-12 py-2">
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-plug-circle-xmark fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    Looks like our connection to this network is not working properly.<br>
                                    You can request a withdrawal as normal, but it will be processed with delay.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row" id="withdraw-experimental-warning">
                        <div class="col-12 py-2">
                            <div class="alert alert-danger d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-flask fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    We have classified this coin as <strong>experimental</strong>.
                                    We cannot guarantee the correct operation of deposits and withdrawals,
                                    because the official wallet provided by the developers of this project
                                    is unstable and often causes some issues.
                                    Your withdrawal may take a long time to reach your wallet
                                    or even never arrive.
                                    We do not provide any technical support for this coin.
                                    You can contact the developers of the project directly and request an update to the official client.
                                    Unpredictable losts of synchronization, from a few minutes to even couple of weeks can occur.
                                    These cases are beyond our control. Use this coin at your own risk.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2">
                            <label for="select-adbk">Address:</label>
                            <?php include('../templates/select_adbk.php'); ?>
                            <small id="help-address" class="form-text" style="display: none">Address is invalid</small>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2" id="withdraw-memo-wrapper">
                            <label id="withdraw-memo-name" for="withdraw-memo"></label>
                            <input type="text" class="form-control" id="withdraw-memo" placeholder="Optional">
                            <small id="help-memo" class="form-text" style="display: none">Invalid format</small>
                        </div>
                    </div>
                    
                    <div class="row" id="withdraw-save-wrapper">
                        <div class="col-12 col-lg-6 py-2 my-auto">
                            <div class="pretty p-switch">
                                <input type="checkbox" id="withdraw-save">
                                <div class="state p-primary">
                                    <label for="withdraw-save">Save in address book</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2" id="withdraw-save-expand" style="display: none">
                            <label for="withdraw-save-name">Save as:</label>
                            <input type="text" class="form-control" id="withdraw-save-name">
                            <small id="help-save-name" class="form-text" style="display: none">Invalid name</small>
                        </div>
                    </div>
                    
                    <div class="row d-none" id="withdraw-internal-notice">
                        <div class="col-12 py-2">
                            <div class="alert alert-success d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-people-arrows fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    This is the deposit address of another Infinex user.<br>
                                    Withdrawal will be processed internally and you will not pay any fee.
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2 order-lg-1">
                            <label for="withdraw-amount">Amount:</label>
                            <input type="text" class="form-control" id="withdraw-amount" data-val="">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-3 mt-auto">
                            <span class="range-value" for="withdraw-amount-range" suffix="%"></span>
                            <input id="withdraw-amount-range" type="range" class="form-range" min="0" max="100" step="1" value="0">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-2">
                            <label for="withdraw-fee">Fee:</label>
                            <input type="text" class="form-control" id="withdraw-fee" readonly>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-4 mt-auto">
                            <input id="withdraw-fee-range" type="range" class="form-range" min="0" max="1" step="1" value="0">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-5 my-auto">
                            <span class="secondary">Available:</span>
                            <span class="float-end" id="withdraw-balance"></span>
                            <br>
                            <span class="secondary">After pay fee:</span>
                            <span class="float-end" id="withdraw-amount-max"></span><strong></strong>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-6 my-auto">
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                        
                        <div class="col-12 col-lg-8 py-2 order-lg-7" id="withdraw-contract-wrapper">
                            <div class="row mt-3">
                                <div class="col-12">
                                    <span class="secondary">Token contract / ID:</span>
                                </div>
                            </div>
                            <div class="row flex-nowrap">
                                <div class="col-10 col-lg-auto my-auto">
                                    <h4 class="wrap" id="withdraw-contract"></h4>
                                </div>
                                <div class="col-auto my-auto">
                                    <a href="#_" class="secondary copy-button" data-copy="#withdraw-contract"><i class="fa-solid fa-copy fa-xl"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </form>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column">
        
            <div class="row p-2">
                <h3>Last withdrawals</h3>
            </div>
            
            <div id="recent-tx-data">
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <?php include('../templates/tx_history.php'); ?>
        <script src="/wallet/withdraw.js?<?php echo filemtime(__DIR__.'/withdraw.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/2fa.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
