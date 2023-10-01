<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <!-- TODO legacy code -->
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Transactions | Infinex</title>
    </head>
    <body>
        <?php include(__DIR__.'/../inc/body.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            <div class="row p-2">
                <h3>Transactions history</h3>
            </div>
            
            <div class="row p-2 secondary d-none d-lg-flex">
                <div style="width: 20%">
                    <h5>Date</h5>
                </div>
                <div style="width: 20%">
                    <h5>Type</h5>
                </div>
                <div style="width: 20%">
                    <h5>Asset</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Amount</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Status</h5>
                </div>
            </div>
            
            <div id="transactions-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/wallet/transactions.js?<?php echo filemtime(__DIR__.'/transactions.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/inc/tx_history.php');
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
