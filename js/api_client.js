function rawApi(method, url, data, apiKey) {
    let options = {
        url: config.apiUrl + '/v2' + url,
        type: method,
        headers: headers,
        dataType: "json"
    };
    
    if(headers)
        options['headers'] = {
            Authorization: 'Bearer ' + apiKey
        };
    
    if(data) {
        options['data'] = JSON.stringify(data);
        options['contentType'] = "application/json";
    }
        
    return $.ajax(options);
}

function api(method, url, data = null, redirectOnError = false) {
    return new Promise(
        function(resolve, reject) {
            rawApi(
                method,
                url,
                data,
                window.loggedIn ? window.apiKey : null
            ).done(
                resolve
            ).fail(
                function(jqXHR, textStatus, errorThrown) {
                    msgBox(jqXHR.responseJSON.error.msg, null, redirectOnError ? '/' : null);
                    reject(jqXHR.responseJSON.error.code);
                }
            );
        }
    );
}
