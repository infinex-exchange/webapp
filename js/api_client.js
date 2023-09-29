function rawApi(method, url, data, apiKey) {
    let headers = {};
    if(apiKey)
        headers['Authorization'] = 'Bearer ' + apiKey;
        
    return $.ajax({
        url: config.apiUrl + '/v2' + url,
        type: 'POST',
        headers: headers,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json"
    });
}

function api(method, url, data = {}, redirectOnError = false) {
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
