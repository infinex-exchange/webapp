<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../templates/head.php'); ?>
        <?php include('../imports/apexcharts.html'); ?>
        <script src="/js/validate.js?<?php echo filemtime(__DIR__.'/../js/validate.js'); ?>"></script>
        <title>Affiliate program | Infinex</title>
        <style type="text/css">
            @media (min-width: 992px) {
                .reflinks-item ~ .reflinks-item {
                    border-top: 1px solid var(--color-border);
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
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include('../templates/sidebar_account.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row py-2">
                <h3>Affiliate program</h3>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <p>
                        Recommend Infinex to your friends or share a reflink on your website or social media and earn
                        lifetime rewards for their trading activity on Infinex.
                        The user who sign up for a Infinex account using your unique referral link will be attributed as a successful referral.
                        You'll receive commissions on every trade made by your referrals and referrals of your referrals, up to the 4th level.
                    </p>
                </div>
            </div>
            
            <div class="row py-2">
	            <h3>Performance</h3>
            </div>
            
            <div class="row charts" data-refid="">
	            <div class="col-12">
		            <div class="chart-earn"></div>
	            </div>
	            <div class="col-12">
		            <div class="chart-acquisition"></div>
	            </div>
            </div>
            
            <div class="row py-2">
                <h3>Your campaigns</h3>
            </div>
            
            <div class="row">
                <div class="col-auto my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showAddReflinkPrompt()">New reflink</a>
                </div>
            </div>
            
            <div class="row py-2 d-none d-lg-flex secondary">
                <div class="col-4">
                <h5>Name</h5>
                </div>
                <div class="col-5">
                <h5>Members, reflinks</h5>
                </div>
                <div class="col-3">
                <h5>Options</h5>
                </div>
            </div>
            
            <div id="reflinks-data">
            </div>
            
            <div class="row py-2">
	            <h3>Earn rates</h3>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <table class="table table-bordered primary">
                        <thead>
                            <tr>
                                <th scope="col">Level</th>
                                <th scope="col">Description</th>
                                <th scope="col">Earn rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Lvl 1</th>
                                <td>Referred directly by you</td>
                                <td>
                                    <strong>20%</strong> of spot trading fees
                                    <br>
                                    <strong>0.4%</strong> of cloud mining purchases
                                    <br>
                                    <strong>10%</strong> of NFT trading fees
                                    <br>
                                    <strong>10%</strong> of NFT Studio fees
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Lvl 2</th>
                                <td>Referred by your level 1 referrals</td>
                                <td>
                                    <strong>10%</strong> of spot trading fees
                                    <br>
                                    <strong>0.2%</strong> of cloud mining purchases
                                    <br>
                                    <strong>5%</strong> of NFT trading fees
                                    <br>
                                    <strong>5%</strong> of NFT Studio fees
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Lvl 3</th>
                                <td>Referred by your level 2 referrals</td>
                                <td>
                                    <strong>5%</strong> of spot trading fees
                                    <br>
                                    <strong>0.1%</strong> of cloud mining purchases
                                    <br>
                                    <strong>2.5%</strong> of NFT trading fees
                                    <br>
                                    <strong>2.5%</strong> of NFT Studio fees
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Lvl 4</th>
                                <td>Referred by your level 3 referrals</td>
                                <td>
                                    <strong>2.5%</strong> of spot trading fees
                                    <br>
                                    <strong>0.05%</strong> of cloud mining purchases
                                    <br>
                                    <strong>1.25%</strong> of NFT trading fees
                                    <br>
                                    <strong>1.25%</strong> of NFT Studio fees
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12">
                    <p>
                        You can track the performance of each referral links in the "Your campaigns" table.
                        Affiliate rewards are calculated on the 1st day of each month and distributed as internal deposit from the user: <i>system@infinex.cc</i>.
                    </p>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-reflink-details">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Reflink</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="row py-2">
                            <div class="col-4">
                                <h5>Name:</h5>
                            </div>
                            <div class="col-8 text-end">
                                <span id="mrd-description"></span>
                            </div>
                        </div>
                        
                        <div class="py-3"></div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5>Members:</h5>
                            </div>
                            <div class="col-12">
                                <div id="mrd-members-inner" class="row p-2 flex-nowrap"></div>
                            </div>
                        </div>
                        
                        <div class="py-3"></div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5>Home page reflink:</h5>
                            </div>
                            <div class="col-12">
                                <div class="row mx-1 my-2 px-1 py-3 flex-nowrap rounded" style="background-color: var(--color-input);">
                                    <div class="col-auto my-auto wrap">
                                        <span class="wrap" id="mrd-reflink-index"></span>
                                    </div>
                                    <div class="col-auto my-auto">
                                        <a href="#_" class="secondary" data-copy="#mrd-reflink-index" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row py-2">
                            <div class="col-12">
                                <h5>Register form reflink:</h5>
                            </div>
                            <div class="col-12">
                                <div class="row mx-1 my-2 px-1 py-3 flex-nowrap rounded" style="background-color: var(--color-input);">
                                    <div class="col-auto my-auto wrap">
                                        <span class="wrap" id="mrd-reflink-reg"></span>
                                    </div>
                                    <div class="col-auto my-auto">
                                        <a href="#_" class="secondary" data-copy="#mrd-reflink-reg" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row" id="mrd-charts">
				            <div class="col-12">
					            <div class="chart-earn"></div>
				            </div>
				            <div class="col-12">
					            <div class="chart-acquisition"></div>
				            </div>
			            </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button id="mrd-rename-btn" type="button" class="btn btn-primary">Rename</a>
                        <button id="mrd-remove-btn" type="button" class="btn btn-primary">Remove</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-reflink-desc-prompt">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit reflink</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="reflink-description-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="reflink-description">Name:</label>
                        <input type="text" class="form-control" id="reflink-description">
                        <small id="help-reflink-description" class="form-text" style="display: none">Invalid name</small>
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
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-rewards">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Rewards</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">                        
                        <div class="row">
				            <div class="col-12">
					            <div id="mr-chart"></div>
				            </div>
			            </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="/account/affiliate.js?<?php echo filemtime(__DIR__.'/affiliate.js'); ?>"></script>
        
        <?php include('../templates/modals.php'); ?>
        <?php include('../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
