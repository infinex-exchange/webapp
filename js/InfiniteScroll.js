class InfiniteScroll {
    constructor(endpoint, root, render, container, scrollableContainer = false) {
        let th = this;
        
        this.endpoint = endpoint;
        this.root = root;
        this.render = render;
        this.container = container;
        this.preloader = $(container.attr('id') + '-preloader');
        this.scrollable = scrollableContainer ? container : $(window);
        
        this.working = false;
        this.noMore = false;
        this.resetTimeout = null;
        
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
        
        api('GET', url).then(
            function(resp) {
                for(const item of resp[th.root])
                    th.append(item);
                
                th.noMore = th.isNoMoreData(resp);
            }
        ).finally(
            function() {
                th.working = false;
                th.preloader.hide();
            }
        );
    }
    
    reset(endpoint = null) {
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
            if(endpoint)
                this.endpoint = endpoint;
            this.noMore = false;
            this.container.empty();
            this.initPaginator();
        
            if(this.endpoint)
                this.nextPage();
        }
    }
    
    append(elem) {
        this.container.append(this.render(elem));
    }
    
    prepend(elem) {
        this.container.prepend(this.render(elem));
    }
    
    get(id) {
        return this.container.find(`[data-id="${id}"]`);
    }
    
    remove(id) {
        this.get(id).remove();
    }
    
    replace(id, elem) {
        this.get(id).replaceWith(this.render(elem));
    }
}