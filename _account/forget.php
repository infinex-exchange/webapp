<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>Password reset | Infinex</title>
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
            
                <h2 class="pb-4">Password reset</h2>
        
                <div id="forget-form-step1-wrapper">
                    <p class="secondary">Enter your account details.</p>
                    <form id="forget-form-step1" class="d-grid gap-3">
                        <div class="form-group">
                            <label for="forget-email">Email:</label>
                            <input type="email" class="form-control" id="forget-email">
                            <small id="help-email" class="form-text" style="display: none">Incorrect e-mail format</small>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            
                <div id="forget-form-step2-wrapper">
                    <p class="secondary">Verification code has been sent to your email address.</p>
                    <form id="forget-form-step2" class="d-grid gap-3">
                        <div class="form-group">
                            <label for="forget-code">Verification code:</label>
                            <input type="text" class="form-control" id="forget-code">
                            <small id="help-code" class="form-text" style="display: none">Code must be 6 digits</small>
                        </div>
                        <div class="form-group">
                            <label for="forget-password">New password:</label>
                            <input type="password" class="form-control" id="forget-password">
                            <small id="help-password" class="form-text" style="display: none">The password must be at least 8 characters long and contain
                            one lowercase letter, one uppercase letter, and one digit</small>
                        </div>
                        <div class="form-group">
                            <label for="forget-password2">Confirm password:</label>
                            <input type="password" class="form-control" id="forget-password2">
                            <small id="help-password2" class="form-text" style="display: none">Passwords does not match</small>
                        </div>
                        <button type="submit" class="btn btn-primary">Change password</button>
                    </form>
                </div>
            
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
        
        <script src="/account/forget.js?<?php echo filemtime(__DIR__.'/forget.js'); ?>"></script>
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
