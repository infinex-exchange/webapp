<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Vote for listing | Vayamos Exchange</title>
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
                <div class="col-12 col-lg-auto order-1 my-auto">
                    <h2>Vote for listing</h2>
                </div>
                <div class="user-only col-12 col-lg-auto ms-0 ms-lg-auto order-3 order-lg-2 my-auto">
                    <a href="#_" class="submit-project btn btn-primary">
                        <i class="fa-solid fa-plus"></i>
                        Submit project proposal
                    </a>
                </div>
                <div class="col-12 order-2 order-lg-3">
                    BPX holders decide what projects will be listed on Vayamos.
                    When you submit a listing proposal, it will be verified by the exchange administrator.
                    If the project does not raise any doubts and meets our technical requirements,
                    it will be included in the next voting.
                    Each voting begins at midnight on the first day of each month and continues until the end of the month.
					The project with the highest number of votes will be listed within a few days of the end of voting.
					The number of your votes depends on the amount of BPX held.
					You can split your votes among several projects.
                </div>
            </div>
            
            <div class="row p-2">
                <h3>Current voting</h3>
            </div>
            
            <div class="row p-2 ui-card-light">
            <div class="col-12">
                
                <div id="no-voting" class="d-none text-center py-2">
                    <h4 class="secondary">There is no active voting at the moment</h4>
                </div>
                
                <div id="current-voting-data">
                </div>
            
            </div>
            </div>
            
            <div class="row p-2">
                <h3>Previous votings</h3>
            </div>
            
            <div class="row p-2 ui-card-light">
            <div class="col-12">
                <div id="previous-votings-data">
                </div>
            </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- / Root container -->
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-submit-project">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="ps-1 modal-title">Submit project</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                    
                        <div class="row">
                            <div class="col-12">
                                <h5>Token symbol:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <input id="msp-symbol" type="text" class="form-control">
                            </div>
                            <div class="col-12 pt-2">
                                <h5>Token full name:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <input id="msp-name" type="text" class="form-control">
                            </div>
                            <div class="col-12 pt-2">
                                <h5>Project website:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <input id="msp-website" type="text" class="form-control">
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <a href="#_" id="msp-submit" class="btn btn-primary">Submit</a>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="/info/voting.js?<?php echo filemtime(__DIR__.'/voting.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/footer.html'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
