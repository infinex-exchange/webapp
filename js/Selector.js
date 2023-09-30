class Selector {
    constructor(target, endpoint, root, render, placeholder) {
        let randomId = 'sel-' + Math.random().toString(36).slice(2);
        target.replaceWith(`
            <div class="selector-wrapper" id="${randomId}">
                <form>
                    <div class="selector-inner">
                        <input readonly type="text" placeholder="${placeholder}" class="form-control selector-input">
                        <i class="fa-solid fa-angle-down flippable selector-arrow"></i>
                    </div>
                </form>
                <div class="selector-dropdown">
                    <input type="text" placeholder="Search..." class="input-search form-control selector-search">
                    <div class="scrollable selector-data"></div>
                    <div class="selector-data-preloader">
                        Loading...
                    </div>
                </div>
            </div>
        `);
        this.div = $('#' + randomId);
        
        this.scr = new InfiniteScrollOffsetPg(
            endpoint,
            root,
            render,
            this.div,
            true
        );
        
        this.div.on('click', function(event) {
            event.stopPropagation();
            
            let thisDropdown = $(this).find('.selector-dropdown');
            let thisArrow = $(this).find('.selector-arrow');
            
            $('.selector-dropdown').not(thisDropdown).hide();
            $('.selector-arrow').not(thisArrow).removeClass('flip');
        
            thisDropdown.toggle();
            thisArrow.toggleClass('flip');
        
            if(thisArrow.hasClass('flip'))
                $(this).find('.selector-search').focus();
        });
    }
}