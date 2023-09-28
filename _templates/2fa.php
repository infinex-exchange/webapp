<div class="modal fade" tabindex="-1" role="dialog" id="2fa-modal">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">2FA</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="2fa-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="2fa-code">Enter 2FA code from <span id="2fa-provider"></span>:</label>
                        <input type="text" class="form-control" id="2fa-code">
                        <small id="help-2fa-code" class="form-text" style="display: none">Invalid code</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" id="2fa-submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="/js/2fa.js?<?php echo filemtime(__DIR__.'/../js/2fa.js'); ?>"></script>