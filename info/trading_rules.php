<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Trading rules | Infinex</title>
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
                <h2>Trading rules</h2>
            </div>
            
            <div class="row p-2">
                <h3>Spot trading</h3>
            </div>
            
            <div class="row p-2 ui-card-light">
            <div class="col-12">
            
                <div class="row p-2 secondary d-none d-lg-flex">
                    <div class="col my-auto">
                        <h5>Pair</h5>
                    </div>
                    <div class="col my-auto">
                        <h5>Min trade amount</h5>
                    </div>
                    <div class="col my-auto">
                        <h5>Min amount move</h5>
                    </div>
                    <div class="col my-auto">
                        <h5>Min price move</h5>
                    </div>
                    <div class="col my-auto">
                        <h5>Min order size</h5>
                    </div>
                </div>
                
                <div id="spot-rules-data">
                </div>
            
            </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <script src="/info/trading_rules.js?<?php echo filemtime(__DIR__.'/trading_rules.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
