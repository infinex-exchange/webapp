class InfiniteScroll {
    constructor(
        endpoint,
        root,
        render,
        container,
        scrollableContainer = false,
        afterAdd = null,
        preloader = null,
        onPageLoaded = null,
        onFirstPageLoaded = null
    ) {
        let th = this;
        
        this.endpoint = endpoint;
        this.root = root;
        this.render = render;
        this.container = container;
        this.preloader = preloader ? preloader : $(container.attr('id') + '-preloader');
        this.scrollable = scrollableContainer ? container : $(window);
        this.afterAdd = afterAdd;
        this.onPageLoaded = onPageLoaded;
        this.onFirstPageLoaded = onFirstPageLoaded;
        
        this.working = false;
        this.noMore = false;
        this.resetTimeout = null;
        this.searchQuery = '';
        this.searchTimeout = null;
        this.firstPageLoaded = false;
        
        this.initPaginator();
        
        this.scrollable.on('scroll', function() {
            if(!th.endpoint || th.working || th.noMore)
	            return;
	        
            if(
                ! $(this).is( $(window) ) &&
                Math.round(
                    $(this).scrollTop() + $(this).innerHeight(),
                    10
                ) >= Math.round(
                    $(this)[0].scrollHeight,
                    10
                )
            ) {
                th.nextPage();
            }
            
            else if(
                $(this).is( $(window) ) &&
                $(this).scrollTop() + $(this).height() >= th.container.height()
            ) {
                th.nextPage();
            }
        });
        
        if(this.endpoint)
            this.nextPage();
    }
    
    nextPage() {
        let th = this;
        
        this.working = true;
        this.preloader.show();
        
        let url = this.endpoint;
        let nextPageQuery = this.getNextPageQuery();
        if(nextPageQuery) {
            let querySep = this.endpoint.includes('?') ? '&' : '?';
            url = url + querySep + nextPageQuery;
        }
        if(this.searchQuery.length) {
            let querySep = url.includes('?') ? '&' : '?';
            url = url + querySep + 'q=' + encodeURIComponent(this.searchQuery);
        }
        
        api('GET', url).then(
            function(resp) {
                th.noMore = th.isNoMoreData(resp);
                
                if(th.onPageLoaded)
                    th.onPageLoaded(resp[th.root], resp);
                if(!th.firstPageLoaded) {
                    if(th.onFirstPageLoaded)
                        th.onFirstPageLoaded(resp[th.root], resp);
                    th.firstPageLoaded = true;
                }
                
                for(const item of resp[th.root])
                    th.append(item);
            }
        ).finally(
            function() {
                th.working = false;
                th.preloader.hide();
            }
        );
    }
    
    reset(endpoint = '') {
        let th = this;
        
        if(this.working) {
            clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(
                function() {
                    th.reset(endpoint)
                },
                100
            );
        }
        else {
            if(endpoint != '')
                this.endpoint = endpoint;
            this.noMore = false;
            this.container.empty();
            this.firstPageLoaded = false;
            this.initPaginator();
        
            if(this.endpoint)
                this.nextPage();
        }
    }
    
    append(data) {
        this.container.append(this.render(data));
        let elem = this.container.children().last();
        elem.data(data);
        if(this.afterAdd)
            this.afterAdd(elem);
    }
    
    prepend(data) {
        this.container.prepend(this.render(data));
        let elem = this.container.children().first();
        elem.data(data);
        if(this.afterAdd)
            this.afterAdd(elem);
    }
    
    get(id) {
        let elem = this.container.find(`[data-id="${id}"]`);
        if(!elem.length)
            return null;
        return elem;
    }
    
    remove(id) {
        this.get(id).remove();
    }
    
    replace(id, data) {
        this.get(id).replaceWith(this.render(data));
        let elem = this.get(id);
        elem.data(data);
        if(this.afterAdd)
            this.afterAdd(elem);
    }
    
    bindSearch(input) {
        let th = this;
        
        input.on('input', function() {
            th.searchQuery = $(this).val();
            clearTimeout(th.searchTimeout);
            th.searchTimeout = setTimeout(
                function() {
                    th.reset();
                },
                500
            );
        });
    }
    
    freeze() {
        this.noMore = true;
    }
}