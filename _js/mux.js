class MuxClient {
    constructor(url) {
        this.url = url;
        this.reconDelay = 0;
        this.requestsDb = new Object();
        
        var t = this;
        var oldAjax = $.ajax;
        $.ajax = function(options) {
            if(options.url.startsWith(config.apiUrl) && t.ws && t.ws.readyState === t.ws.OPEN) {
                var deferred = $.Deferred();
                
                t.request(
                    options.url,
                    typeof(options.data) != 'undefined' ? $.parseJSON(options.data) : {},
                    function(body) {
                        deferred.resolve(body);
                    },
                    function () {
                        deferred.reject();
                    }
                );
                
                deferred.retry = function(opts) {
                    return this;
                }
                
                return deferred;
            }
            else
                return oldAjax(options);
        };
    }
    
    open() {
        var t = this;
        
        t.connTimeout = setTimeout(function() {
	        t.ws.close();
	    }, 5000);
        
        t.ws = new WebSocket(t.url);
               
        t.ws.onopen = function(e) {
            this.requestsDb = new Object();
	        clearTimeout(t.connTimeout);
	        t.reconDelay = 0;
	        
            t.pingInterval = setInterval(function() {
                t.ping();
            }, 5000);
        }
        
        t.ws.onclose = function(e) {
	        t.ws = null;
	        
            clearTimeout(t.connTimeout);
            if(t.reconDelay < 20000)
	            t.reconDelay += 1000;
	        
	        clearTimeout(t.pingTimeout);
	        clearInterval(t.pingInterval);
            
            setTimeout(function() {
	            t.open();
            }, t.reconDelay);
        }
        
        t.ws.onmessage = function(e) {
            var msg = JSON.parse(e.data);
            t.process(msg);
        }
    }
    
    ping() {
        var t = this;
        
        t.pingTimeout = setTimeout(function() {
            t.ws.close();
        }, 5000);
        
        t.pingId = t.randomId();
        
        t.send({
            op: 'ping',
            id: t.pingId
        });
    }
    
    send(obj) {
        if(this.ws && this.ws.readyState === this.ws.OPEN)
            this.ws.send(JSON.stringify(obj));
    }
    
    randomId() {
        return Math.floor(Math.random() * 10000) + 1;
    }
    
    process(msg) {
        var t = this;
        
        if(msg.class == 'resp') {
            if(msg.id == t.pingId) {
                clearTimeout(t.pingTimeout);
                delete t.pingId;
                return;
            }
               
            if(msg.success) {
                t.requestsDb[msg.id]['dataCallback'](msg.body);
            }
            else {
                t.requestsDb[msg.id]['errorCallback']();
            }
            
            delete t.requestsDb[msg.id];
        }
    }
    
    request(url, post, dataCallback, errorCallback) {
        var id = this.randomId();
        
        this.requestsDb[id] = {
            dataCallback: dataCallback,
            errorCallback: errorCallback
        };
        
        this.send({
            op: 'req',
            url: url,
            post: post,
            id: id
        });                 
    }
}

if(typeof(config.muxUrl) !== 'undefined') {
    window.mux = new MuxClient(config.muxUrl);
    window.mux.open();
}