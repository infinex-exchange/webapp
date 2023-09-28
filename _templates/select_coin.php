<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-coin" type="text" placeholder="Select coin" class="form-control selector-input">
            <i id="select-coin-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-coin-dropdown" class="selector-dropdown">
        <input id="select-coin-search" type="text" placeholder="Search..." class="input-search form-control selector-search" data-prec="">
        <div id="select-coin-data" class="scrollable selector-data"></div>
        <div id="select-coin-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/js/select_coin.js?<?php echo filemtime(__DIR__.'/../js/select_coin.js'); ?>"></script>