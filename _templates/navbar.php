<nav class="navbar navbar-master navbar-dark shadow-sm navbar-expand-lg">
    <div class="container-fluid container-1500">
        <a class="navbar-brand" href="/">
            <img src="/img/logo.svg" alt="Infinex" width="140" class="d-inline-block align-text-top">
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <?php echo str_replace('dropdown-item', 'nav-link', file_get_contents(__DIR__.'/menu_exchange.html')); ?>
                <li class="d-lg-none">
                    <hr class="dropdown-divider">
                </li>
            </ul>
            
            <ul class="navbar-nav mb-2 mb-lg-0 user-only">
                <li class="nav-item dropdown dropdown-on-hover">
                    <a class="nav-link" href="#_">
                        <i class="fa-solid fa-wallet fa-lg"></i>
                        <span class="d-lg-none">Wallet</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <?php include(__DIR__.'/menu_wallet.html'); ?>
                    </ul>
                </li>
            </ul>
            
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item dropdown dropdown-on-hover">
                    <a class="nav-link" href="#_">
                        <i class="fa-solid fa-circle-user fa-lg"></i>
                        <span class="d-lg-none">Account</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <?php include(__DIR__.'/menu_account.html'); ?>
                    </ul>
                </li>
            </ul>
            
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item dropdown dropdown-on-hover">
                    <a class="nav-link" href="#_">
                        <i class="fa-solid fa-circle-info fa-lg"></i>
                        <span class="d-lg-none">Informations</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <?php include(__DIR__.'/menu_info.html'); ?>
                    </ul>
                </li>
            </ul>
            
            <a id="switch-to-light" class="px-0 ps-lg-4 nav-link" href="#_">
                <i class="fa-solid fa-sun fa-lg"></i>
                <span class="d-lg-none">Light mode</span>
            </a>
            <a id="switch-to-dark" class="px-0 ps-lg-4 nav-link" href="#_" style="display: none">
                <i class="fa-solid fa-moon fa-lg"></i>
                <span class="d-lg-none">Dark mode</span>
            </a>
        </div>
        
    </div>
</nav>
<script src="/js/navbar.js?<?php echo filemtime(__DIR__.'/../js/navbar.js'); ?>"></script>