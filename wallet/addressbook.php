<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Address book | Vayamos Exchange</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            <div class="row p-2">
                <h3>Address book</h3>
            </div>
            
            <div class="row p-2 secondary d-none d-lg-flex scrollable">
                <div style="width: 15%">
                    <h5>Asset</h5>
                </div>
                <div style="width: 15%">
                    <h5>Network</h5>
                </div>
                <div style="width: 20%">
                    <h5>Name</h5>
                </div>
                <div style="width: 25%">
                    <h5>Address</h5>
                </div>
                <div class="text-end" style="width: 25%">
                    <h5>Options</h5>
                </div>
            </div>
            
            <div id="adbk-data" class="scrollable">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-adbk-rename">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Rename item</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="adbk-rename-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="adbk-name">New name:</label>
                        <input type="text" class="form-control" id="adbk-name">
                        <small id="help-adbk-name" class="form-text" style="display: none">Invalid name</small>
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
        
        <script src="/wallet/addressbook.js?<?php echo filemtime(__DIR__.'/addressbook.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
