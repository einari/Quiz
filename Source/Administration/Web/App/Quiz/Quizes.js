import {server} from "../Infrastructure/Server";

class Quizes
{
    getAll() {
        let promise = new Promise((resolve, reject) => {
            server.get("/quizes", {}).then(result => resolve(result));
        });
        return promise;
    }
}
export let quizes = new Quizes();