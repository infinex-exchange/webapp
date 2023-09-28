<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>Login | Infinex</title>
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
            
            <div class="col-12 col-lg-7 p-4">
            
            <h2 class="pb-4">Login</h2>
            <p class="secondary">Welcome back! Log in with your e-mail and password.</p>
        
            <form id="login-form" class="d-grid gap-3">
                <div class="form-group">
                    <label for="login-email">Email:</label>
                    <input type="email" class="form-control" id="login-email">
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" class="form-control" id="login-password">
                </div>
                <div class="form-group mx-auto pretty p-switch p-bigger">
                    <input type="checkbox" id="login-remember">
                    <div class="state p-primary">
                        <label for="login-remember">Remember me</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            
            <form id="tfa-form" class="d-none gap-3">
                <div class="form-group">
                    <label for="tfa-code">2FA code:</label>
                    <input type="text" class="form-control" id="tfa-code">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            
            </div>
            
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
                        <i style="color: var(--color-ultra)" class="fa-solid fa-question fa-2x"></i>
                    </div>
                    <div class="col small my-auto">
                        Forget password?<br>
                        <a class="link-ultra" href="/account/forget">Reset it</a>
                    </div>
                </div>
                <div class="row py-3">
                    <div class="col-auto my-auto text-center" style="width: 60px">
                        <i style="color: var(--color-ultra)" class="fa-solid fa-user-plus fa-2x"></i>
                    </div>
                    <div class="col small my-auto">
                        Don't have account?<br>
                        <a class="link-ultra" href="/account/register">Register now</a>
                    </div>
                </div>
            </div>
            
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/account/login.js?<?php echo filemtime(__DIR__.'/login.js'); ?>"></script>
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
