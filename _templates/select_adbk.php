<div class="selector-wrapper">
    <div class="selector-inner">
        <input id="select-adbk" type="text" placeholder="Paste address or select from address book" class="form-control selector-input" autocomplete="off">
        <i id="select-adbk-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
    </div>
    <div id="select-adbk-dropdown" class="selector-dropdown">
        <div id="select-adbk-data" class="scrollable selector-data"></div>
    </div>
</div>
<script src="/js/select_adbk.js?<?php echo filemtime(__DIR__.'/../js/select_adbk.js'); ?>"></script>