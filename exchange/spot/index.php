<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <?php include('../../templates/tradingview.html'); ?>
        <?php include('../../templates/bignumber.html'); ?>
        <?php include('../../templates/toast.html'); ?>
        <link rel="stylesheet" href="/spot/css/styles.css">
        <script type="text/javascript" src="/spot/js/streams_client.js"></script>
        <script type="text/javascript" src="/spot/js/tv_datafeed.js"></script>
        <script src="/js/ajax_scroll.js"></script>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.html'); ?>
        
        <!-- Mobile navbar -->
        <nav class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
            <ul class="navbar-nav mx-auto text-center">
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card="markets">
                        <i class="fa-solid fa-chart-simple"></i><br>
                        Markets
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card="trades">
                        <i class="fa-solid fa-right-left"></i></i><br>
                        Trades
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#_" data-ui-card="chart">
                        <i class="fa-solid fa-chart-line"></i><br>
                        Chart
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card="form">
                        <i class="fa-solid fa-window-restore"></i><br>
                        Buy/Sell
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card="orderbook">
                        <i class="fa-solid fa-arrow-up-short-wide"></i><br>
                        Orderbook
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card="orders">
                        <i class="fa-solid fa-user-clock"></i><br>
                        My orders
                    </a>
                </li>
            </ul>
        </nav>
        
        <!-- Status bar -->
        <nav class="navbar fixed-bottom navbar-expand status-bar d-none d-lg-flex py-1 px-2 small">
            <ul class="navbar-nav">
                <li class="streaming-good text-success nav-item">
                    <i class="fas fa-sync fa-spin"></i>
                    Streaming data
                </li>
                <li class="streaming-bad text-danger nav-item">
                    <i class="fa-solid fa-bolt fa-beat"></i>
                    Connection lost
                </li>
            </ul>
        </nav>
        
        <!-- Root container -->
        <div class="container-fluid container-1500 pt-2">
        <div class="row m-0">
        
        <!-- Left column -->
        <div class="col-12 col-lg-3 p-0 ui-column order-2 order-lg-1">
        <div class="row m-0">
        
            <!-- Markets
                  markets-search - input
                  markets-table - div
            -->
            <div class="col-12 ui-card ui-card-ver d-none d-lg-block" data-ui-card="markets">
                <form>
                    <div class="form-row">
                        <input id="markets-search" type="text" placeholder="Search" class="form-control form-control-sm input-search">
                    </div>
                </form>
                <div id="markets-quotes" class="nav small">
                </div>
                <div class="row scrollable">
                    <div class="col-1">
                    </div>
                    <div class="col-4">
                        <h6>Pair</h6>
                    </div>
                    <div class="col-4 text-end">
                        <h6>Price</h6>
                    </div>
                    <div class="col-3 text-end">
                        <h6>Change</h6>
                    </div>
                </div>
                <div id="markets-table" class="scrollable small">         
                </div>
            
            <!-- / Markets -->
            </div>
            
            <!-- Market trades + my trades
                  trades-market-data - div
                  trades-my-data - div
            -->
            <div class="col-12 ui-card ui-card-ver d-none d-lg-block" data-ui-card="trades">
            
                <nav>
                <div class="nav nav-tab nav-deco" role="tablist">
                    <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#trades-market" href="#_" role="tab" aria-controls="trades-market" aria-selected="true">Market trades</a>
                    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#trades-my" href="#_" role="tab" aria-controls="trades-my" aria-selected="false">My trades</a>
                </div>
                </nav>
                
                <div class="tab-content">
                
                    <div class="tab-pane fade show active" id="trades-market" role="tabpanel" aria-labelledby="trades-market-tab">
                    
                        <div class="row scrollable">
                            <div class="col-4">
                                <h6>Price</h6>
                            </div>
                            <div class="col-4 text-end">
                                <h6>Amount</h6>
                            </div>
                            <div class="col-4 text-end">
                                <h6>Time</h6>
                            </div>
                        </div>
                        
                        <div id="trades-market-data" class="scrollable small">
                        </div>
                        
                    </div>
                    
                    <div class="tab-pane fade" id="trades-my" role="tabpanel" aria-labelledby="trades-my-tab">
                    
                        <div class="row user-only scrollable">
                            <div class="col-4">
                                <h6>Price</h6>
                            </div>
                            <div class="col-4 text-end">
                                <h6>Amount</h6>
                            </div>
                            <div class="col-4 text-end">
                                <h6>Time</h6>
                            </div>
                        </div>
                        
                        <div id="trades-my-data" class="scrollable small">
                            <div class="guest-only m-auto">
                                <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                            </div>  
                        </div>
                    
                    </div>
                    
                </div>
          
            <!-- / Market trades + my trades -->
            </div>
        
        <!-- / Left column -->
        </div>
        </div>
        
        <!-- Center column 
              - chart-candles - div
        -->
        <div class="col-12 col-lg-6 p-0 ui-column order-1 order-lg-2">
        <div class="row m-0">
        
            <!-- Header -->
            <div class="col-3 ui-card ui-card-ver ui-card-hor my-auto small">
                <h4 id="ticker-name"></h4>
                <span id="ticker-base-name"></span>
            </div>
                
            <div class="col-9 ui-card ui-card-hor">
                <div class="row flex-nowrap overflow-hidden small">
                    <div class="col-auto">
                        Price
                        <span id="ticker-price" class="text-hi d-block"></span>
                    </div>
                    <div class="col-auto">
                         24h change
                         <span id="ticker-change" class="text-hi d-block"></span>
                    </div>
                    <div class="col-auto">
                        24h high
                        <span id="ticker-high" class="text-hi d-block"></span>
                    </div>
                    <div class="col-auto">
                        24h low
                        <span id="ticker-low" class="text-hi d-block"></span>
                    </div>
                    <div class="col-auto">
                        24h vol (<span id="ticker-base-legend"></span>)
                        <span id="ticker-vol-base" class="text-hi d-block"></span>
                    </div>
                    <div class="col-auto">
                        24h vol (<span id="ticker-quote-legend"></span>)
                        <span id="ticker-vol-quote" class="text-hi d-block"></span>
                    </div>
                </div>
            </div>
            
            <!-- TradingView -->
            <div class="col-12 ui-card ui-card-ver d-none d-lg-block" style="padding: 0px !important" data-ui-card="chart">                
                <div id="chart-candles">
                </div>
            </div>
            
            <!-- Trading form -->
            <div class="col-12 ui-card ui-card-ver ui-card-high d-lg-block" data-ui-card="form">
                <div class="nav">
                    <a class="nav-link switch-order-type" href="#_" data-type="LIMIT">Limit</a>
                    <a class="nav-link switch-order-type" href="#_" data-type="MARKET">Market</a>
                    <a class="nav-link switch-order-type" href="#_" data-type="STOP_LIMIT">Stop-Limit</a>
                    
                    <div class="dropdown ms-auto">
                        <a id="current-tif" class="nav-link dropdown-toggle" href="#_" data-bs-toggle="dropdown"></a>
                    
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item switch-time-in-force" href="#_" data-tif="GTC">Good Till Canceled</a>
                            </li>
                            <li>
                                <a class="dropdown-item switch-time-in-force" href="#_" data-tif="IOC">Immediate Or Cancel</a>
                            </li>
                            <li>
                                <a class="dropdown-item switch-time-in-force" href="#_" data-tif="FOK">Fill Or Kill</a>
                            </li>
                        </ul>
                    </div>
                </div>   
                <div class="row">
                    <div class="col-12 col-lg-6 pb-5 pb-lg-0">
                        <form class="d-grid gap-2">
                            <div class="user-only small">
                                <span>Available:</span>
                                <span class="float-end" id="form-quote-balance"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Stop</span>
                                <input id="form-buy-stop" type="text" class="form-control form-stop" data-side="BUY">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Price</span>
                                <input id="form-buy-price" type="text" class="form-control form-price" data-side="BUY">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Amount</span>
                                <input id="form-buy-amount" type="text" class="form-control form-amount" data-side="BUY">
                                <span class="suffix form-base-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Total</span>
                                <input id="form-buy-total" type="text" class="form-control form-total" data-side="BUY">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div>
                                <span class="range-value" for="form-buy-range" suffix="%"></span>
                                <input id="form-buy-range" type="range" class="form-range" data-side="BUY" min="0" max="100" step="5" value="0">
                            </div>
                            <button type="button" id="form-buy-submit" class="btn bg-green btn-block user-only form-submit" data-side="BUY">BUY</button>
                            <div class="guest-only small border border-green rounded p-2 text-center">
                                <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                            </div> 
                        </form>
                    </div>
                    <div class="col-12 col-lg-6">
                        <form class="d-grid gap-2">
                            <div class="user-only small">
                                <span>Available:</span>
                                <span class="float-end" id="form-base-balance"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Stop</span>
                                <input id="form-sell-stop" type="text" class="form-control form-stop" data-side="SELL">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Price</span>
                                <input id="form-sell-price" type="text" class="form-control form-price" data-side="SELL">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Amount</span>
                                <input id="form-sell-amount" type="text" class="form-control form-amount" data-side="SELL">
                                <span class="suffix form-base-suffix"></span>
                            </div>
                            <div class="input-ps-group">
                                <span>Total</span>
                                <input id="form-sell-total" type="text" class="form-control form-total" data-side="SELL">
                                <span class="suffix form-quote-suffix"></span>
                            </div>
                            <div>
                                <span class="range-value" for="form-sell-range" suffix="%"></span>
                                <input id="form-sell-range" type="range" class="form-range" data-side="SELL" min="0" max="100" step="5" value="0">
                            </div>
                            <button type="button" id="form-sell-submit" class="btn bg-red btn-block user-only form-submit" data-side="SELL">SELL</button>
                            <div class="guest-only small border border-red rounded p-2 text-center">
                                <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                            </div> 
                        </form>
                    </div>
                </div>      
            </div>
        
        <!-- / Center column -->
        </div>
        </div>
        
        <!-- Right column
              - orderbook-sell - div
              - orderbook-buy - div
        -->
        <div class="col-12 col-lg-3 p-0 ui-column order-3">
        <div class="row m-0">
            
            <div class="col-12 ui-card ui-card-ver d-none d-lg-block" data-ui-card="orderbook">
                <div class="row">
                    <div class="col-4">
                        <h6>Price</h6>
                    </div>
                    <div class="col-4 text-end">
                        <h6>Amount</h6>
                    </div>
                    <div class="col-4 text-end">
                        <h6>Total</h6>
                    </div>
                </div>
                
                <div id="orderbook-sell" class="small"> 
                </div>
            
                <div id="orderbook-buy" class="small">
                </div>
            </div>
        
        <!-- / Right column -->
        </div>
        </div>
        
            <!-- Open orders, order history
                  - orders-open-data - div
                  - orders-history-data - div
            -->
            <div class="col-12 ui-card ui-column d-none d-lg-block order-4" data-ui-card="orders">
            
                <nav>
                <div class="nav nav-tab nav-deco" role="tablist">
                    <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#orders-open" href="#_" role="tab" aria-controls="orders-open" aria-selected="true">Open orders</a>
                    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#orders-history" href="#_" role="tab" aria-controls="orders-history" aria-selected="false">Order history</a>
                </div>
                </nav>
                
                <div class="tab-content">
                
                    <div class="tab-pane fade show active" id="orders-open" role="tabpanel" aria-labelledby="orders-open-tab">
                    
                        <div class="row user-only scrollable">
                            <div class="col-2">
                                <h6>Date</h6>
                            </div>
                            <div class="col-1">
                                <h6>Pair</h6>
                            </div>
                            <div class="col-1">
                                <h6>Type</h6>
                            </div>
                            <div class="col-1">
                                <h6>Side</h6>
                            </div>
                            <div class="col-1 text-end">
                                <h6>Price</h6>
                            </div>
                            <div class="col-2 text-end">
                                <h6>Amount</h6>
                            </div>
                            <div class="col-2 text-end">
                                <h6>Filled</h6>
                            </div>
                            <div class="col-2 text-end">
                                <h6>Total</h6>
                            </div>
                        </div>
                        
                        <div id="orders-open-data" class="scrollable small d-flex">
                            <div class="guest-only m-auto">
                                <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                            </div>  
                        </div>
                        
                    </div>
                    
                    <div class="tab-pane fade" id="orders-history" role="tabpanel" aria-labelledby="orders-history-tab">
                    
                        <div class="row user-only">
                            <div class="col-4">
                                <h6>Price</h6>
                            </div>
                            <div class="col-4">
                                <h6>Amount</h6>
                            </div>
                            <div class="col-4">
                                <h6>Time</h6>
                            </div>
                        </div>
                        
                        <div id="orders-history-data" class="scrollable small d-flex">
                            <div class="guest-only m-auto">
                                <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                            </div>    
                        </div>
                    
                    </div>
                    
                </div>
          
            <!-- / Open orders, order history -->
            </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <!-- Don't hide content behind mobile menu and status bar -->
        <div style="height: 26px" class="d-none d-lg-block"></div>
        <div style="height: 52px" class="d-block d-lg-none"></div>
        
        <?php include('../../templates/modals.html'); ?>
        
        <script type="text/javascript" src="/js/range_value.js"></script>
        <script type="text/javascript" src="/spot/js/streams.js"></script>
        <script type="text/javascript" src="/spot/js/markets.js"></script>
        <script type="text/javascript" src="/spot/js/tradingview.js"></script>
        <script type="text/javascript" src="/spot/js/ticker.js"></script>
        <script type="text/javascript" src="/spot/js/trades.js"></script>
        <script type="text/javascript" src="/spot/js/orderbook.js"></script>
        <script type="text/javascript" src="/spot/js/orders.js"></script>
        <script type="text/javascript" src="/spot/js/trading_form.js"></script>
        <script type="text/javascript" src="/spot/js/notifications.js"></script>
    </body>
</html>
