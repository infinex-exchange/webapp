function apiRawNoSession(method, url, data = null, apiKey = null) {
    return new Promise(
        function(resolve, reject) {
            let options = {
                url: config.apiUrl + '/v2' + url,
                type: method,
                dataType: "json"
            };
            
            if(apiKey)
                options['headers'] = {
                    Authorization: 'Bearer ' + apiKey
                };
            
            if(data) {
                options['data'] = JSON.stringify(data);
                options['contentType'] = "application/json";
            }
                
            $.ajax(options).done(
                resolve
            ).fail(
                function(jqXHR, textStatus, errorThrown) {
                    reject(jqXHR.responseJSON.error);
                }
            );
        }
    );
}

function apiRaw(method, url, data = null) {
    return apiRawNoSession(
        method,
        url,
        data,
        window.loggedIn ? window.apiKey : null
    );
}

function api(method, url, data = null, redirectOnError = false) {
    return apiRaw(
        method,
        url,
        data,
        window.loggedIn ? window.apiKey : null
    ).catch(
        function(error) {
            msgBox(error.msg, null, redirectOnError ? '/' : null);
            throw error.code;
        }
    );
}
