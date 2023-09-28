<div class="modal fade" tabindex="-1" role="dialog" id="modal-trade">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="modal-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="mt-spot-header" class="row py-2 d-none">
                    <h5 class="secondary">Spot markets:</h5>
                </div>
                
	            <div class="row" id="mt-spot-data">
	            </div>
	            
	            <div id="mt-p2p-container" class="d-none">
                    <div class="row py-2">
                        <h5 class="secondary">P2P markets:</h5>
                    </div>
	               <div class="row" id="mt-p2p-data">
	               </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script src="/js/trade.js?<?php echo filemtime(__DIR__.'/../js/trade.js'); ?>"></script>