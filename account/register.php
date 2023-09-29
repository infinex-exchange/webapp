<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>Registration | Infinex</title>
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
            <p class="secondary">Enter your account details.</p>
        
            <div id="reg-form-step1-wrapper">
            <form id="reg-form-step1" class="d-grid gap-3">
                <div class="form-group">
                    <label for="reg-email">Email:</label>
                    <input type="email" class="form-control" id="reg-email">
                    <small id="help-email" class="form-text" style="display: none">Incorrect e-mail format</small>
                </div>
                <div class="form-group">
                    <label for="reg-password">Password:</label>
                    <input type="password" class="form-control" id="reg-password">
                    <small id="help-password" class="form-text" style="display: none">The password must be at least 8 characters long and contain
                    one lowercase letter, one uppercase letter, and one digit</small>
                </div>
                <div class="form-group">
                    <label for="reg-password2">Confirm password:</label>
                    <input type="password" class="form-control" id="reg-password2">
                    <small id="help-password2" class="form-text" style="display: none">Passwords does not match</small>
                </div>
                <button type="submit" class="btn btn-primary">Next</button>
            </form>
            </div>
            
            <div id="reg-form-step2-wrapper">
            <form id="reg-form-step2" class="d-grid gap-3">
                <div class="form-group">
                    <img id="reg-captcha-img" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                    <button id="reg-captcha-change" type="button" class="btn btn-primary">
                        <i class="fa-solid fa-repeat"></i>
                    </button>
                </div>
                <div class="form-group">
                    <label for="reg-captcha">Captcha:</label>
                    <input type="text" class="form-control" id="reg-captcha">
                    <small id="help-captcha" class="form-text" style="display: none">Captcha must be 4 characters long, case is ignored, no zeros and "O" letters</small>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
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
                        Already have account?<br>
                        <a class="link-ultra" href="/account/login">Login now</a>
                    </div>
                </div>
            </div>
            <!-- / Right -->
            
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/account/register.js?<?php echo filemtime(__DIR__.'/register.js'); ?>"></script>
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
