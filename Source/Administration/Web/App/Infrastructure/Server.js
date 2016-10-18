import $ from "jquery";

class Server
{
    get(url, parameters) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: parameters,
                contentType: "application/json; charset=utf-8",
                complete: (result, statusAsText) => {
                    resolve(result);
                },
                error: (jqXHR, statusAsText, errorThrown) => {
                    reject(jqXHR);
                }
            });
        });

        return promise;
    }

    put(url, parameters) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "PUT",
                dataType: "json",
                data: JSON.stringify(parameters),
                contentType: "application/json; charset=utf-8",
                complete: (result, statusAsText) => {
                    resolve(result);
                },
                error: (jqXHR, statusAsText, errorThrown) => {
                    reject(jqXHR);
                }
            });
        });

        return promise;
    }
}
export let server = new Server();
