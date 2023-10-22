<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <?php include('../imports/marked.html'); ?>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 background">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include('../templates/sidebar_info.php'); ?>
        
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
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/footer.html'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
