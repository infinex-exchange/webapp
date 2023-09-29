<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>E-mail verification | Infinex</title>
    </head>
    <body class="vh-100 body-background">
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 pt-2 guest-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-6 m-auto ui-card-light rounded">
        <div class="row m-0">
            
            <!-- Left -->
            <div class="col-12 col-lg-7 p-4">
            
                <h2 class="pb-4">Register</h2>
                <p class="secondary">Your account has been created. Verification code sent to e-mail address: <strong id="verify-email-addr"></strong>.</p>
                
                <form id="verify-form" class="d-grid gap-3">
                    <div class="form-group">
                        <label for="verify-code">Verification code:</label>
                        <input type="text" class="form-control" id="verify-code">
                        <small id="help-code" class="form-text" style="display: none">Code must be 6 digits</small>
                    </div>
                    <button type="submit" class="btn btn-primary">Confirm</button>
                </form>
            
            <!-- / Left -->
            </div>
            
            <!-- Right -->
            <div class="col-12 col-lg-5 p-4 my-auto secondary">
                <div class="row py-3">
                    <div class="col-auto my-auto text-center" style="width: 60px">
                        <i style="color: var(--color-ultra)" class="fa-solid fa-lock fa-2x"></i>
                    </div>
                    <div class="col small my-auto">
                        Make sure you are visiting:<br>
                        <strong class="primary">https://infinex.cc</strong>
                    </div>
                </div>
                <div class="row py-3">
                    <div class="col-auto my-auto text-center" style="width: 60px">
                        <i style="color: var(--color-ultra)" class="fa-solid fa-user fa-2x"></i>
                    </div>
                    <div class="col small my-auto">
                        <a class="link-ultra" href="/account/login">Back to login</a>
                    </div>
                </div>
            </div>
            <!-- / Right -->
            
        
        <!-- / Main column -->
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/account/verify.js?<?php echo filemtime(__DIR__.'/verify.js'); ?>"></script>
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
