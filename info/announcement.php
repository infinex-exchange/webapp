<!DOCTYPE html>
<html lang="en">
    <head>
        <?php
        include(__DIR__.'/../inc/head.php');
        include(__DIR__.'/../vendor/marked.html');
        ?>
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
        
            <div class="row pt-2">
                <h3 id="anno-title"></h2>
            </div>
            
            <div class="row pb-4">
                <h6 class="secondary" id="anno-time"></h6>
            </div>
            
            <div class="row p-2">
                <div class="col-12" id="anno-body">
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <script src="/info/announcement.js?<?php echo filemtime(__DIR__.'/announcement.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
