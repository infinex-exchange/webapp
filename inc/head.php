<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />

<!-- Vendor -->
<?php
include(__DIR__.'/../vendor/bootstrap.html');
include(__DIR__.'/../vendor/jquery.html');
include(__DIR__.'/../vendor/font_awesome.html');
include(__DIR__.'/../vendor/pretty_checkbox.html');
include(__DIR__.'/../vendor/bignumber.html');
?>
<script src="/vendor/jquery.bind-first-0.2.3.min.js"></script>
<!-- TODO: Remove after migration to v2: jQuery Ajax Retry -->
<script src="/vendor/jquery.ajax-retry.min.js"></script>

<!-- Favicon -->
<?php include(__DIR__.'/../favicon/html_code.html'); ?>

<!-- App styles -->
<link href="/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>" rel="stylesheet">
<link href="/css/dark.css?<?php echo filemtime(__DIR__.'/../css/dark.css'); ?>" rel="stylesheet" class="theme-css" data-theme="dark">
<link href="/css/light.css?<?php echo filemtime(__DIR__.'/../css/light.css'); ?>" rel="stylesheet alternate" class="theme-css" data-theme="light">

<!-- App config -->
<script src="/cfg/config.js?<?php echo filemtime(__DIR__.'/../cfg/config.js'); ?>"></script>

<!-- Global JS -->
<script src="/js/api_client.js?<?php echo filemtime(__DIR__.'/../js/api_client.js'); ?>"></script>
<script src="/js/rendering.js?<?php echo filemtime(__DIR__.'/../js/rendering.js'); ?>"></script>
<script src="/js/theme.js?<?php echo filemtime(__DIR__.'/../js/theme.js'); ?>"></script>
<script src="/js/session.js?<?php echo filemtime(__DIR__.'/../js/session.js'); ?>"></script>
<script src="/js/global_utils.js?<?php echo filemtime(__DIR__.'/../js/global_utils.js'); ?>"></script>
<script src="/js/InfiniteScroll.js?<?php echo filemtime(__DIR__.'/../js/InfiniteScroll.js'); ?>"></script>
<script src="/js/InfiniteScrollOffsetPg.js?<?php echo filemtime(__DIR__.'/../js/InfiniteScrollOffsetPg.js'); ?>"></script>
<script src="/js/InfiniteScrollCursorPg.js?<?php echo filemtime(__DIR__.'/../js/InfiniteScrollCursorPg.js'); ?>"></script>
<script src="/js/Form.js?<?php echo filemtime(__DIR__.'/../js/Form.js'); ?>"></script>

<!-- Twitter card -->
<?php if(!defined('OVERWRITE_TWITTER_CARD')) { ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Infinex">
<meta name="twitter:description" content="Cryptocurrency trading platform">
<meta name="twitter:image" content="https://infinex.cc/img/card.jpg">
<?php } ?>

<!-- Analytics -->
<?php include(__DIR__.'/../cfg/analytics.html'); ?>