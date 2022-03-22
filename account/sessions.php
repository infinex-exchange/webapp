<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <script src="/js/validate.js"></script>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../templates/navbar.html'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 pt-2 user-only">
        <div class="row m-0">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row p-2">
                <h1>Sessions list</h1>
            </div>
            
            <div class="row p-2 text-hi">
                <div class="col-2">
                Device type
                </div>
                <div class="col-2">
                Browser
                </div>
                <div class="col-2">
                OS
                </div>
                <div class="col-3">
                Last activity
                </div>
                <div class="col-3">
                Options
                </div>
            </div>
            
            <div id="sessions-data">
            </div>
            
            <div class="row p-2">
                <h1>API keys</h1>
            </div>
            
            <div class="row p-2">
                <div class="col-auto my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showAddAKPrompt()">New API key</a>
                </div>
            </div>
            
            <div class="row p-2 text-hi">
                <div class="col-4">
                API key
                </div>
                <div class="col-4">
                Description
                </div>
                <div class="col-4">
                Options
                </div>
            </div>
            
            <div id="api-keys-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-ak-desc-prompt">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit API key</h5>
                <button type="button" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="api-key-description-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="api-key-description">Description:</label>
                        <input type="text" class="form-control" id="api-key-description">
                        <small id="help-api-key-description" class="form-text" style="display: none">Invalid description</small>
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
        
        <script src="/account/sessions.js"></script>
        
        <?php include('../templates/modals.html'); ?>
    
    </body>
</html>