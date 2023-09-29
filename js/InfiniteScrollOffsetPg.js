class InfiniteScrollOffsetPg extends InfiniteScroll {
    initPaginator() {
    }
    
    getNextPageQuery() {
        let offset = $(this.container).children().length;
        return offset > 0 ? 'offset=' + offset : null;
    }
    
    isNoMoreData(response) {
        return !response.more;
    }
}