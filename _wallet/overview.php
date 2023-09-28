<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../js/ajax_scroll.js'); ?>"></script>
        <title>Wallet | Infinex</title>
        <style type="text/css">
            @media (max-width: 991px) {
                .m-50-percent {
                    width: 50% !important;
                }
                
                .m-50-minus {
                    width: calc(50% - 60px) !important;
                }
            }
        </style>
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
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
            
            <form>
            <div class="row">
                <div class="col-auto order-1 my-auto p-1 p-lg-2">
                    <a href="/wallet/deposit" class="btn btn-primary btn-sm">Deposit</a>
                    <a href="/wallet/withdraw" class="btn btn-primary btn-sm">Withdraw</a>
                    <a href="/wallet/transfer" class="btn btn-primary btn-sm">Transfer</a>
                </div>
                
                <div class="col-12 col-lg-auto order-3 order-lg-2 my-auto p-1 p-lg-2">
                    <input id="asset-search" type="text" size="7" placeholder="Search" class="form-control input-search">
                </div>
                
                <div class="col-auto order-2 order-lg-3 ms-auto ms-lg-0 my-auto p-1 p-lg-2">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="asset-hide-zero">
                        <label class="form-check-label" for="asset-hide-zero">
                            Hide zero
                        </label>
                    </div>
                </div>
            </div>
            </form>
            
            <div class="row p-2 secondary d-none d-lg-flex">
                <div style="width: 60px">
                </div>
                <div style="width: calc(20% - 60px)">
                <h5>Token</h5>
                </div>
                <div class="text-end" style="width: 19%">
                <h5>Total</h5>
                </div>
                <div class="text-end" style="width: 19%">
                <h5>Available</h5>
                </div>
                <div class="text-end" style="width: 18%">
                <h5>Locked</h5>
                </div>
                <div style="width: 24%">
                <h5>Action</h5>
                </div>
            </div>
            
            <div id="asset-data">
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column d-none d-lg-block">
        
            <div class="row p-2">
                <h3>Recent transactions</h3>
            </div>
            
            <div id="recent-tx-data">
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-mobile-asset-details">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <img id="mad-icon" width="20" height="20" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                        <h3 class="ps-1 modal-title" id="mad-name"></h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="row py-2">
                            <div class="col-6">
                                <h5>Total:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <span id="mad-total"></span>
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-6">
                                <h5>Available:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <span id="mad-avbl"></span>
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-6">
                                <h5>Locked:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <span id="mad-locked"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <a href="#_" id="mad-deposit" class="btn btn-primary">Deposit</a>
                        <a href="#_" id="mad-withdraw" class="btn btn-primary">Withdraw</a>
                        <a href="#_" id="mad-transfer" class="btn btn-primary">Transfer</a>
                        <a href="#_" id="mad-trade" class="btn btn-primary">Trade</a>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include('../templates/tx_history.php'); ?>
        <?php include('../templates/trade.php'); ?>
        <script src="/wallet/overview.js?<?php echo filemtime(__DIR__.'/overview.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
