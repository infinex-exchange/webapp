class InfiniteScrollOffsetPg extends InfiniteScroll {
    initPaginator() {
        this.cursor = null;
    }
    
    getNextPageQuery() {
        return this.cursor ? 'cursor=' + this.cursor : null;
    }
    
    isNoMoreData(response) {
        this.cursor = response.cursor;
        return this.cursor !== null;
    }
    
    append(elem) {
        throw "Illegal append() on cursor paginated content";
    }
}