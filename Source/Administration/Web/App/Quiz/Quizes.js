import {server} from "../Infrastructure/Server";

class Quizes
{
    add(quiz) {
        server.post("/quizes", quiz);
    }

    update(quiz) {
        server.put("/quizes", quiz);
    }

    getAll() {
        let promise = new Promise((resolve, reject) => {
            server.get("/quizes", {}).then(result => resolve(result));
        });
        return promise;
    }
}
export let quizes = new Quizes();