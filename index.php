<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('templates/head.php'); ?>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('templates/navbar.html'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 pt-2 container-rest">
        
            <div class="row m-0 px-2 py-5">
                <div class="jumbotron col-12">
                    <h1>Vayamos Exchange</h1>
                    <p>Official digital assets exchange of BPX ecosystem.</p>
                    <a href="/spot" class="btn btn-primary">START TRADING</a>
                </div>
            </div>
        
            <div class="row">
                <div class="col-12 p-4 ui-card-high rounded">
                
                    <div class="row py-2 text-center">
                        <h1>Market trend</h1>
                    </div>
                    
                    <div class="row text-hi py-2">
                        <div class="col-3">Name</div>
                        <div class="col-3 text-end">Last price</div>
                        <div class="col-3 text-end">24h change</div>
                        <div class="col-3 text-end">Market cap</div>
                    </div>
                    
                    <div id="market-trend-spot-data"></div>
                
                </div>
            </div>
        
        <!-- / Root container -->
        </div>
        
        <script src="/index.js"></script>
    
    </body>
</html>