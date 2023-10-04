<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <script src="/js/Select.js?<?php echo filemtime(__DIR__.'/../js/Select.js'); ?>"></script>
        <script src="/js/SelectCoin.js?<?php echo filemtime(__DIR__.'/../js/SelectCoin.js'); ?>"></script>
        <script src="/wallet/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <!-- TODO legacy code -->
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Internal transfer | Infinex</title>
    </head>
    <body>
        <?php include(__DIR__.'/../inc/body.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
        
            <div class="row py-2">
                <h2>Internal transfer</h2>
            </div>
            
            <div class="row py-2">
                <div class="col-12">
                    <h3>&#9312 Select coin to transfer:</h3>
                </div>
                <div class="col-12 col-lg-6">
                    <i id="select-coin"></i>
                </div>
            </div>
            
            <div id="transfer-step2" style="display: none">
                <div class="row py-2">
                    <div class="col-12">
                        <h3>&#9313 Complete transfer:</h3>
                    </div>
                </div>
                
                <form id="transfer-form">
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2">
                            <label for="transfer-address">E-mail:</label>
                            <input type="text" class="form-control" id="transfer-address">
                            <small id="help-address" class="form-text" style="display: none">E-mail is invalid</small>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2">
                            <label for="withdraw-memo">Message:</label>
                            <input type="text" class="form-control" id="transfer-memo" placeholder="Optional">
                            <small id="help-memo" class="form-text" style="display: none">Invalid format</small>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 col-lg-6 py-2 order-lg-1">
                            <label for="transfer-amount">Amount:</label>
                            <input type="text" class="form-control" id="transfer-amount" data-val="">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-3 mt-auto">
                            <span class="range-value" for="transfer-amount-range" suffix="%"></span>
                            <input id="transfer-amount-range" type="range" class="form-range" min="0" max="100" step="1" value="0">
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-5 my-auto">
                            <span class="secondary">Available:</span>
                            <span class="float-end" id="transfer-balance"></span>
                            <br>
                            <span class="secondary">Fee:</span>
                            <span class="float-end">0</span>
                        </div>
                        
                        <div class="col-12 col-lg-6 py-2 order-lg-6 my-auto">
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                    </div>
                        
                </form>
                
                <div class="row py-2">
                    <div class="col-12">
                        <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                            <div class="px-2">
                                <i class="fa-solid fa-spell-check fa-2x"></i>
                            </div>
                            <div class="px-2">
                                Make sure the recipient's e-mail address is correct!<br>
                                Transfers to invalid e-mail addresses will also be made to make it impossible to use this form
                                to verify that someone else has an account on Infinex.<br>
                                In case of a mistake, it is possible to recover the funds by contacting the support.
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <?php include(__DIR__.'/inc/sidebar.php'); ?>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/wallet/transfer.js?<?php echo filemtime(__DIR__.'/transfer.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/2fa.php');
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
