function rawApi(method, url, data, apiKey) {
    let headers = {};
    if(apiKey)
        headers['Authorization'] = 'Bearer ' + apiKey;
    
    let options = {
        url: config.apiUrl + '/v2' + url,
        type: 'POST',
        headers: headers,
        contentType: "application/json",
        dataType: "json"
    };
    
    if(data)
        options['data'] = JSON.stringify(data);
        
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
