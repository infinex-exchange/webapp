<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-net" type="text" placeholder="Select network" class="form-control selector-input">
            <i id="select-net-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-net-dropdown" class="selector-dropdown">
        <div id="select-net-data" class="scrollable selector-data"></div>
    </div>
</div>
<script src="/js/select_net.js?<?php echo filemtime(__DIR__.'/../js/select_net.js'); ?>"></script>