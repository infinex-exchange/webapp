<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>API keys | Infinex</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include('../templates/sidebar_account.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row p-2">
                <h3>API keys</h3>
            </div>
            
            <div class="row p-2">
                <div class="col-auto my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showAddAKPrompt()">New API key</a>
                </div>
            </div>
            
            <div class="row p-2 d-none d-lg-flex secondary">
                <div class="col-4">
                <h5>Name</h5>
                </div>
                <div class="col-5">
                <h5>API key</h5>
                </div>
                <div class="col-3">
                <h5>Options</h5>
                </div>
            </div>
            
            <div id="api-keys-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-api-key-details">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">API key</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="row py-2">
                            <div class="col-4">
                                <h5>Name:</h5>
                            </div>
                            <div class="col-8 text-end">
                                <span id="makd-description"></span>
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-4">
                                <h5>API key:</h5>
                            </div>
                            <div class="col-8">
                                <div class="row flex-nowrap">
                                    <div class="col-10 my-auto wrap">
                                        <span class="wrap" id="makd-api-key"></span>
                                    </div>
                                    <div class="col-2 my-auto">
                                        <a href="#_" class="secondary copy-button" data-copy="#makd-api-key"><i class="fa-solid fa-copy fa-xl"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button id="makd-rename-btn" type="button" class="btn btn-primary">Rename</a>
                        <button id="makd-remove-btn" type="button" class="btn btn-primary">Remove</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-ak-desc-prompt">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit API key</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="api-key-description-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="api-key-description">Name:</label>
                        <input type="text" class="form-control" id="api-key-description">
                        <small id="help-api-key-description" class="form-text" style="display: none">Invalid name</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
        
        <script src="/account/api.js?<?php echo filemtime(__DIR__.'/api.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
