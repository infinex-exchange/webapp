class Select {
    constructor(
        target,
        endpoint,
        root,
        placeholder,
        canSearch,
        onChange = null,
        autoSelect = false,
        autoSelectSingle = false,
        nullVal = null
    ) {
        let th = this;
        
        this.onChange = onChange;
        this.autoSelect = autoSelect;
        this.autoSelectSingle = autoSelectSingle;
        
        this.key = null;
        this.value = null;
        this.data = null;
        
        let randomId = 'sel-' + Math.random().toString(36).slice(2);
        let searchHtml = canSearch ? `
            <input type="text" placeholder="Search..." class="input-search form-control selector-search">
        ` : '';
        let nullValHtml = nullVal ? `
            <div class="selector-null row p-1 hoverable">
                <div class="col-auto m-auto">
                    <strong class="secondary">${nullVal}</strong>
                </div>
            </div>
        ` : '';
        target.replaceWith(`
            <div class="selector-wrapper" id="${randomId}">
                <form>
                    <div class="selector-inner">
                        <input readonly type="text" placeholder="${placeholder}" class="form-control selector-input">
                        <i class="fa-solid fa-angle-down flippable selector-arrow"></i>
                    </div>
                </form>
                <div class="selector-dropdown">
                    ${searchHtml}
                    <div class="scrollable selector-data"></div>
                    <div class="selector-data-preloader">
                        Loading...
                    </div>
                    ${nullValHtml}
                </div>
            </div>
        `);
        this.div = $('#' + randomId);
        
        if(nullVal) {
            let nullDiv = this.div.find('.selector-null');
            nullDiv.data('id', null);
            nullDiv.data('val', nulllVal);
            
            this.afterAdd(nullDiv, null);
        }
        
        this.scr = new InfiniteScrollOffsetPg(
            endpoint,
            root,
            this.render,
            this.div.find('.selector-data'),
            true,
            function(item, obj) {
                th.afterAdd(item, obj);
            },
            this.div.find('.selector-data-preloader'),
            null,
            function(items) {
                th.onFirstPageLoaded(items);
            }
        );
        
        this.div.on('click', function(event) {
            event.stopPropagation();
            
            if(!th.scr.endpoint)
                return;
            
            let thisDropdown = th.div.find('.selector-dropdown');
            let thisArrow = th.div.find('.selector-arrow');
            
            $('.selector-dropdown').not(thisDropdown).hide();
            $('.selector-arrow').not(thisArrow).removeClass('flip');
        
            thisDropdown.toggle();
            thisArrow.toggleClass('flip');
        
            if(thisArrow.hasClass('flip'))
                th.div.find('.selector-search').focus();
        });
        
        if(canSearch)
            this.scr.bindSearch(this.div.find('.selector-search'));
        
        $('html').on('click', function(e) {
            if($(e.target).is( th.div.find('.selector-search') )) {
                e.preventDefault();
                return;
            }
            
            th.div.find('.selector-dropdown').hide();
            th.div.find('.selector-arrow').removeClass('flip');
        });
    }
    
    afterAdd(item, obj) {
        let th = this;
        
        item.data('data', obj);
        
        item.on('click', function() {
            th.selectItem(item);
        });
        
        if(this.autoSelect) {
            this.selectItem(item);
            this.autoSelect = false;
        }
    }
    
    selectItem(item) {
        this.key = item.data('id');
        this.val = item.data('val');
        this.data = item.data('data');
        
        this.div.find('.selector-input').val(this.val);
        
        if(this.onChange)
            this.onChange(this.key, this.val, this.data);
    }
    
    setCustom(obj) {
        let tmpElem = $(this.render(obj));
        
        this.key = tmpElem.data('id');
        this.val = tmpElem.data('val');
        this.data = obj;
        
        this.div.find('.selector-input').val(this.val);
        
        if(this.onChange)
            this.onChange(this.key, this.val, this.data);
    }
    
    reset(endpoint = '') {
        this.key = null;
        this.val = null;
        this.data = null;
        
        his.div.find('.selector-input').val('');
        
        this.scr.reset(endpoint);
    }
    
    onFirstPageLoaded(items) {
        if(this.autoSelectSingle && items.length == 1)
            this.autoSelect = true;
    }
}