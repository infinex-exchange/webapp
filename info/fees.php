<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Fees | Infinex</title>
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
                <h2>Fees</h2>
            </div>
            
            <div class="row p-2">
                <h3>Spot trading</h3>
            </div>
            
            <div class="row p-2 ui-card-light">
            <div class="col-12">
            
                <div class="row p-2 secondary d-none d-lg-flex">
                    <div class="col-1">
                        <h5>Level</h5>
                    </div>
                    <div class="col-11">
                        <div class="row">
                            <div class="col text-end">
                                <h5>30d trade volume</h5>
                            </div>
                            <div class="col text-end">
                                <h5>Hold</h5>
                            </div>
                            <div class="col text-end">
                                <h5>Maker fee</h5>
                            </div>
                            <div class="col text-end">
                                <h5>Taker fee</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="spot-fees-data">
                </div>
            
            </div>
            </div>
            
            <div class="row p-2 pt-3">
                <h3>Deposits and withdrawals</h3>
            </div>
            
            <div class="row p-2 ui-card-light">
            <div class="col-12">
            
                <div class="row p-2 secondary d-none d-lg-flex">
                    <div class="col">
                        <h5>Asset</h5>
                    </div>
                    <div class="col">
                        <h5>Network</h5>
                    </div>              
                    <div class="col text-end">
                        <h5>Min deposit</h5>
                    </div>
                    <div class="col text-end">
                        <h5>Min withdrawal</h5>
                    </div>
                    <div class="col text-end">
                        <h5>Withdrawal fee</h5>
                    </div>
                </div>
                
                <div id="withdrawal-fees-data" class="small">
                </div>
            
            </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <script src="/info/fees.js?<?php echo filemtime(__DIR__.'/fees.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
