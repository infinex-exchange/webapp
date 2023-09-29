<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <?php include('../imports/qrcode.html'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>Security settings | Infinex</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include('../templates/sidebar_account.php'); ?>
        
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
                            <small id="help-chp-old" class="form-text" style="display: none">
                                The password must be at least 8 characters long and contain
                                one lowercase letter, one uppercase letter, and one digit
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="chp-new">New password:</label>
                            <input type="password" class="form-control" id="chp-new">
                            <small id="help-chp-new" class="form-text" style="display: none">
                                The password must be at least 8 characters long and contain
                                one lowercase letter, one uppercase letter, and one digit
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="chp-new2">Confirm password:</label>
                            <input type="password" class="form-control" id="chp-new2">
                            <small id="help-chp-new2" class="form-text" style="display: none">Passwords does not match</small>
                        </div>
                        <button type="submit" class="btn btn-primary">Change password</button>
                    </form>
                </div>
                
                <div class="col-12 col-md-6">
                    <div class="row p-2 pt-4">
                        <h3>Change e-mail</h3>
                    </div>  
                    
                    <form id="che-form" class="d-grid gap-3">
                        <div class="form-group che-step1">
                            <label for="che-email">New e-mail:</label>
                            <input type="text" class="form-control" id="che-email">
                            <small id="help-che-email" class="form-text" style="display: none">
                                Incorrect e-mail format
                            </small>
                        </div>
                        <div class="form-group che-step1">
                            <label for="che-password">Current password:</label>
                            <input type="password" class="form-control" id="che-password">
                            <small id="help-che-password" class="form-text" style="display: none">
                                The password must be at least 8 characters long and contain
                                one lowercase letter, one uppercase letter, and one digit
                            </small>
                        </div>
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
                        <div class="form-group">
                            <label for="che-code">Verification code:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="che-code">
                                <button type="button" id="che-code-get" class="btn btn-primary">Get</button>
                            </div>
                            <small id="help-che-code" class="form-text" style="display: none">
                                8 characters, only alphanumeric
                            </small>
                        </div>
                        <button id="che-submit-btn" type="submit" class="btn btn-primary">Change e-mail</button>
                    </form>
                </div>
                
                <div class="col-12">
                    <div class="row p-2 pt-4">
                        <h3>Two factor authentication</h3>
                    </div>  
                    
                    <div class="row p-2">
                        <div class="2fa-provider col-12 col-lg-6" data-provider="EMAIL">
                            <div class="alert alert-secondary d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-solid fa-envelope fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    E-mail codes<br>
                                    <strong class="status-avbl text-success">Available</strong>
                                    <strong class="status-not-avbl text-danger">Not available</strong>
                                    <strong class="status-active text-success">Active</strong>
                                    <strong class="status-not-active text-danger">Not active</strong>
                                </div>
                                <div class="ms-auto px-2">
                                    <button type="button" class="btn-use btn btn-primary btn-sm">Use</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="2fa-provider col-12 col-lg-6" data-provider="GA">
                            <div class="alert alert-secondary d-flex align-items-center" role="alert">
                                <div class="px-2">
                                    <i class="fa-brands fa-google fa-2x"></i>
                                </div>
                                <div class="px-2">
                                    Google Authenticator<br>
                                    <strong class="status-avbl text-success">Available</strong>
                                    <strong class="status-not-avbl text-danger">Not available</strong>
                                    <strong class="status-active text-success">Active</strong>
                                    <strong class="status-not-active text-danger">Not active</strong>
                                </div>
                                <div class="ms-auto px-2">
                                    <button type="button" class="btn-configure btn btn-primary btn-sm">Configure</button>
                                    <button type="button" class="btn-remove btn btn-primary btn-sm">Remove</button>
                                    <button type="button" class="btn-use btn btn-primary btn-sm">Use</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row px-2">
                        <div class="col-12 py-2">
                            <div class="pretty p-switch p-bigger">
                                <input type="checkbox" class="2fa-case" data-case="LOGIN" id="case-login">
                                <div class="state p-primary">
                                    <label for="case-login">
                                        Login to account
                                    </label>
                                </div>
                            </div>  
                        </div>

                        <div class="col-12 py-2">
                            <div class="pretty p-switch p-bigger">
                                <input type="checkbox" class="2fa-case" data-case="WITHDRAW" id="case-withdraw">
                                <div class="state p-primary">
                                    <label for="case-withdraw">
                                        Withdraw funds
                                    </label>
                                </div>
                            </div>  
                        </div>
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
        
        <script src="/account/security.js?<?php echo filemtime(__DIR__.'/security.js'); ?>"></script>
        <script src="/account/security_2fa.js?<?php echo filemtime(__DIR__.'/security_2fa.js'); ?>"></script>
        
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
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/2fa.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
