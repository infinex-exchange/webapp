<nav class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
    <ul class="navbar-nav mx-auto text-center">
        <li class="nav-item">
            <a class="nav-link auto-active" href="/">
                <i class="fas fa-home"></i><br>
                Home
            </a>
        </li>
        
        <li class="nav-item ms-4 dropup">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-border-all"></i><br>
                Exchange
            </a>
            <div class="dropdown-menu">
                <ul class="nav flex-column">
                    <?php include(__DIR__.'/nav/menu_exchange.html'); ?>
                </ul>
            </div>
        </li>
        
        <li class="nav-item dropup">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-circle-user"></i><br>
                Account
            </a>
            <div class="dropdown-menu">
                <ul class="nav flex-column">
                    <?php include(__DIR__.'/nav/menu_account.html'); ?>
                </ul>
            </div>
        </li>
        
        <li class="nav-item dropup user-only">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-wallet"></i><br>
                Wallet
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="nav flex-column">
                    <?php include(__DIR__.'/nav/menu_wallet.html'); ?>
                </ul>
            </div>
        </li>
        
        <li class="nav-item dropup">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-circle-info"></i><br>
                Info
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="nav flex-column">
                    <?php include(__DIR__.'/nav/menu_info.html'); ?>
                </ul>
            </div>
        </li>
    </ul>
</nav>

<div style="height: 53px; margin-bottom: min(10px, env(safe-area-inset-bottom, 0));" class="d-block d-lg-none"></div>