<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <title>Listing | Infinex</title>
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
        
            <div class="row p-2">
                <h2>Listing</h2>
            </div>
            
            <div class="row p-2">
            <div class="col-12">
                Infinex is a good place to launch a new crypto project.
                Want your coin to be listed on our exchange?
                <br>
                Contact us at the e-mail address below to arrange a listing.
                We are open to cooperation.
            </div>
            </div>
            
            <div class="row p-2">
            <div class="col-12">
                <a href="mailto:listing@infinex.cc" class="btn btn-primary">
                    <i class="fa-solid fa-envelope"></i>
                    listing@infinex.cc
                </a>
            </div>
            </div>
            
            <div class="row p-2">
            <div class="col-12">
                Please submit the following information about your project in the message:
                <ul>
                    <li>Token full name</li>
                    <li>Token symbol</li>
                    <li>Project chain (e.g. ERC-20, TRC-20, own blockchain)</li>
                    <li>Official website</li>
                    <li>Exchanges it has been already listed on</li>
                    <li>Your position with this project</li>
                    <li>Suggested listing date and time</li>
                </ul>
            </div>
            </div>
            
            <div class="row p-2">
            <div class="col-12">
                Please make sure you contact us using the project's official email address,
                which can be found on its official website or in social media.
            </div>
            </div>
            
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <script src="/info/listing.js?<?php echo filemtime(__DIR__.'/listing.js'); ?>"></script>
        
        <?php include('../templates/footer.html'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
