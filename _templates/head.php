<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />

<!-- App config -->
<script src="/config.js?<?php echo filemtime(__DIR__.'/../config.js'); ?>"></script>

<!-- Bootstrap -->
<?php include(__DIR__.'/../imports/bootstrap.html'); ?>

<!-- jQuery -->
<?php include(__DIR__.'/../imports/jquery.html'); ?>

<!-- jQuery Bind First -->
<script src="/js/jquery.bind-first-0.2.3.min.js"></script>

<!-- jQuery Ajax Retry -->
<script src="/js/jquery.ajax-retry.min.js"></script>

<!-- Session -->
<script src="/js/mux.js?<?php echo filemtime(__DIR__.'/../js/mux.js'); ?>"></script>

<!-- Font Awesome -->
<?php include(__DIR__.'/../imports/font_awesome.html'); ?>

<!-- Pretty checkbox -->
<?php include(__DIR__.'/../imports/pretty_checkbox.html'); ?>

<!-- App styles -->
<link href="/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>" rel="stylesheet">
<link href="/css/dark.css?<?php echo filemtime(__DIR__.'/../css/dark.css'); ?>" rel="stylesheet" id="css-dark">
<link href="/css/light.css?<?php echo filemtime(__DIR__.'/../css/light.css'); ?>" rel="stylesheet alternate" id="css-light">

<!-- Rendering / preloader -->
<script src="/js/rendering.js?<?php echo filemtime(__DIR__.'/../js/rendering.js'); ?>"></script>

<!-- Session -->
<script src="/js/session.js?<?php echo filemtime(__DIR__.'/../js/session.js'); ?>"></script>

<!-- Global used scripts -->
<script src="/js/global_utils.js?<?php echo filemtime(__DIR__.'/../js/global_utils.js'); ?>"></script>

<!-- Dark mode -->
<script src="/js/darkmode.js?<?php echo filemtime(__DIR__.'/../js/darkmode.js'); ?>"></script>

<!-- Favicons -->
<?php include(__DIR__.'/../favicon/html_code.html'); ?>

<!-- Twitter card -->
<?php include(__DIR__.'/twitter.html'); ?>

<!-- Google Analytics -->
<?php include(__DIR__.'/../imports/gtag.html'); ?>