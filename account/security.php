<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../inc/head.php'); ?>
        <script src="/account/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <?php include(__DIR__.'/../vendor/qrcode.html'); ?>
        <title>Security settings | Infinex</title>
    </head>
    <body>
        <?php include(__DIR__.'/../inc/body.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include(__DIR__.'/inc/sidebar.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row p-2">
                <h3>Active sessions</h3>
            </div>
            
            <div class="row p-2 secondary">
                <div style="width: 17%">
                <h5 class="d-none d-lg-block">Session ID</h5>
                <h5 class="d-lg-none">SID</h5>
                </div>
                <div style="width: 21%">
                <h5>Info</h5>
                </div>
                <div style="width: 37%">
                <h5>Last activity</h5>
                </div>
                <div style="width: 25%">
                <h5>Options</h5>
                </div>
            </div>
            
            <div id="sessions-data">
            </div>
            
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="row p-2 pt-4">
                        <h3>Change password</h3>
                    </div>  
                    
                    <form id="chp-form" class="d-grid gap-3">
                        <div class="form-group">
                            <label for="chp-old">Old password:</label>
                            <input type="password" class="form-control" id="chp-old">
                        </div>
                        <div class="form-group">
                            <label for="chp-new">New password:</label>
                            <input type="password" class="form-control" id="chp-new">
                        </div>
                        <div class="form-group">
                            <label for="chp-new2">Confirm password:</label>
                            <input type="password" class="form-control" id="chp-new2">
                        </div>
                        <button type="submit" class="btn btn-primary">Change password</button>
                    </form>
                </div>
                
                <div class="col-12 col-md-6">
                    <div class="row p-2 pt-4">
                        <h3>Change e-mail</h3>
                    </div>  
                    
                    <form id="form-che-step1" class="d-grid gap-3">
                        <div class="form-group">
                            <label for="che-email">New e-mail:</label>
                            <input type="text" class="form-control" id="che-email">
                        </div>
                        <div class="form-group">
                            <label for="che-password">Current password:</label>
                            <input type="password" class="form-control" id="che-password">
                        </div>
                        <button type="submit" class="d-none"></button>
                    </form>
                    <div id="che-pending" class="alert alert-secondary align-items-center" role="alert">
                        <div class="px-2">
                            <i class="fa-solid fa-hourglass fa-2x"></i>
                        </div>
                        <div class="px-2">
                            Pending e-mail change to:<br>
                            <strong id="che-pending-email"></strong>
                        </div>
                        <div class="ms-auto px-2">
                            <button type="button" class="btn btn-primary btn-sm" id="che-cancel">Cancel</button>
                        </div>
                    </div>
                    <form id="form-che-step2" class="d-grid gap-3 pt-3">
                        <div class="form-group">
                            <label for="che-code">Verification code:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="che-code">
                                <button type="button" id="che-code-get" class="btn btn-primary">Get</button>
                            </div>
                        </div>
                        <button id="che-submit-btn" type="submit" class="btn btn-primary">Change e-mail</button>
                    </form>
                </div>
                
                <div class="col-12">
                    <div class="row p-2 pt-4">
                        <h3>Two factor authentication</h3>
                    </div>  
                    
                    <div class="row p-2 providers-data">
                    </div>
                    
                    <div class="row px-2 cases-data">
                    </div>
                    
                    <div class="row p-2">
                        <div class="col-12 col-lg-6">
                            <button type="button" class="btn-save-cases btn btn-primary w-100">Save</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-configure">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Configure 2FA</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                Scan QR code:
                            </div>
                            
                            <div class="col-12 p-4 text-center">
                                <div class="qrcode-wrapper d-inline-block">
                                    <div id="mc-qrcode"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="/account/security_sessions.js?<?php echo filemtime(__DIR__.'/security_sessions.js'); ?>"></script>
        <script src="/account/security_password.js?<?php echo filemtime(__DIR__.'/security_password.js'); ?>"></script>
        <script src="/account/security_email.js?<?php echo filemtime(__DIR__.'/security_email.js'); ?>"></script>
        <script src="/account/security_2fa.js?<?php echo filemtime(__DIR__.'/security_2fa.js'); ?>"></script>
        
        <?php
        include(__DIR__.'/../inc/2fa.php');
        include(__DIR__.'/../inc/footer.php');
        include(__DIR__.'/../inc/vanilla_mobile_nav.php');
        ?>
    
    </body>
</html>
