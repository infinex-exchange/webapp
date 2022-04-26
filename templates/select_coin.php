<div id="select-coin-wrapper">
    <form>
        <div class="select-arrow">
            <input readonly id="select-coin" type="text" placeholder="Select coin" class="form-control">
            <i id="select-coin-arrow" class="fa-solid fa-angle-down flippable"></i>
        </div>
    </form>
    <div id="select-coin-dropdown">
        <input id="select-coin-search" type="text" placeholder="Search..." class="input-search form-control">
        <div id="select-coin-data" class="scrollable"></div>
        <div id="select-coin-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/js/select_coin.js?<?php echo filemtime(__DIR__.'/../js/select_coin.js'); ?>"></script>