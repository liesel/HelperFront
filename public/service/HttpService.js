class HttpService {
    
    get(url, data={}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:            url,
                type:           'get',
                dataType:       'json',
                contentType:    'application/json',
                success:        function (data) {                
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                },
                data: data
            });
        });
    }

    post(url, data={}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:            url,
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success:        function (result) {
                    resolve(result)
                },
                error: function (error) {
                   reject(error.response)
                },
                data: JSON.stringify(data)
            });
        });
    }

    delete(url, data={}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:            url,
                type:           'DELETE',
                dataType:       'json',
                contentType:    'application/json',
                success:        function (result) {
                    resolve(result)
                },
                error: function (error) {
                   reject(error.response)
                },
                data: JSON.stringify(data)
            });
        });
    }

    patch(url, data={}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:            url,
                data :          JSON.stringify(data),
                type :          'PATCH',
                contentType :   'application/json',
                processData:    false,
                dataType:       'json',
                success:        function (result) {
                    resolve(result)
                },
                error: function (error) {
                   reject(error.response)
                },
                data: JSON.stringify(data)
            });
        });
    }
}