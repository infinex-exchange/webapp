class InfiniteScroll {
    constructor(endpoint, root, render, container, scrollable = window, preloader = null) {
        let th = this;
        
        this.endpoint = endpoint;
        this.root = root;
        this.render = render;
        this.container = container;
        this.preloader = preloader ? preloader : container + '-preloader';
        this.scrollable = scrollable;
        
        this.working = false;
        this.noMore = false;
        this.resetTimeout = null;
        
        this.initPaginator();
        
        $(this.scrollable).on('scroll', function() {
            if(th.working || th.noMore)
	            return;
	        
            if(
                this != window &&
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
                this == window &&
                $(window).scrollTop() + $(window).height() >= thisAS.container.height()
            ) {
                th.nextPage();
            }
        });
        
        this.nextPage();
    }
    
    nextPage() {
        let th = this;
        
        this.working = true;
        $(this.preloader).show();
        
        let url = this.endpoint;
        let nextPageQuery = this.getNextPageQuery();
        if(nextPageQuery) {
            let querySep = this.endpoint.includes('?') ? '&' : '?';
            url = url + querySep + nextPageQuery;
        
        }
        
        api('GET', url).then(
            function(resp) {
                for(item of resp[th.root])
                    th.append(item);
                
                th.noMore = th.isNoMoreData(resp);
            }
        ).finally(
            function() {
                th.working = false;
                $(th.preloader).hide();
            }
        );
    }
    
    reset() {
        let th = this;
        
        if(this.working) {
            clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(
                function() {
                    th.reset()
                },
                100
            );
        }
        else {
            this.noMore = false;
            $(this.container).empty();
            this.initPaginator();
        
            this.nextPage();
        }
    }
    
    append(elem) {
        $(this.container).append(this.render(elem));
    }
    
    prepend(elem) {
        $(this.container).prepend(this.render(elem));
    }
}