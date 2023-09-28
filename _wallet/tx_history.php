<style type="text/css">
    .tx-history-icon-wrapper {
        position: absolute;
        bottom: 0px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--color-bg);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .hoverable:hover .tx-history-icon-wrapper {
        background-color: var(--color-input);
    }
    
    .tx-history-icon {
        font-size: 16px;
        color: var(--color-ultra);
    }
</style>
<div class="modal fade" tabindex="-1" role="dialog" id="modal-mobile-tx-details">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="col-2">
                </div>
                <div class="col-8 text-center">
                    <div class="mx-auto py-2" style="position: relative; width: 60px;">
                        <img id="mtd-icon" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                            <div class="tx-history-icon-wrapper">
                            <i id="mtd-op-icon"></i>
                        </div>
                    </div>
                    <div class="pt-2 mx-auto primary">
                        <h5 class="d-inline" id="mtd-asset"></h5>
                        <h5 class="d-inline" id="mtd-type"></h5>
                    </div>
                    <div class="py-2 mx-auto secondary">
                        <i id="mtd-status-icon"></i>
                        <span id="mtd-status"></span>
                        <span class="d-none" id="mtd-confirms"></span>
                    </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                    
            <div class="modal-body">
                <div class="row">
                    <div class="col-6 py-2">
                        <h5>Network:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-network"></span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-6 my-auto">
                        <h5>Address:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span class="wrap" id="mtd-address"></span>
                    </div>
                </div>
                <div id="mtd-memo-wrapper" class="row py-2">
                    <div class="col-6">
                        <h5 id="mtd-memo-name"></h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-memo"></span>
                    </div>
                </div>
                
                <div class="py-3"></div>
                
                <div class="row py-2">
                    <div class="col-6">
                        <h5>Amount:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-amount"></span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-6">
                        <h5>Fee:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-fee"></span>
                    </div>
                </div>
                
                <div class="py-3"></div>
                
                <div class="row py-2">
                    <div class="col-6">
                        <h5>Create time:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-create-time"></span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-6">
                        <h5 id="mtd-exec-time-title"></h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-exec-time"></span>
                    </div>
                </div>
                
                <div class="py-3"></div>
                
                <div class="row py-2">
                    <div class="col-6">
                        <h5>TxID:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span class="wrap" id="mtd-txid"></span>
                    </div>
                </div>
                <div class="row py-2">
                    <div class="col-6">
                        <h5>Height:</h5>
                    </div>
                    <div class="col-6 text-end">
                        <span id="mtd-height"></span>
                    </div>
                </div>
                
                <div id="mtd-delayed-alert" class="row py-2">
                    <div class="col-12">
                        <div class="alert alert-danger d-flex align-items-center" role="alert">
                            <div class="px-2">
                                <i class="fa-solid fa-stopwatch fa-shake fa-2x"></i>
                            </div>
                            <div class="px-2">
                                This withdrawal is delayed. It can be caused when:<br>
                                <strong>1.</strong> Connection to the selected network has stopped working.<br>
                                <strong>2.</strong> There is not enough amount in the exchange's wallet as most deposits are made on a different network.<br>
                                You can cancel your withdrawal and make it using another network.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="mtd-cancel-btn">Cancel transaction</button>
                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            
        </div>
    </div>
</div>
<script src="/js/tx_history.js?<?php echo filemtime(__DIR__.'/../js/tx_history.js'); ?>"></script>        