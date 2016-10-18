import {server} from "../Infrastructure/Server";

class Attempts
{
    start(quiz, user) {
        console.log("Attempts : start");
        let promise = new Promise((resolve, reject) => {
            server.post("/attempts", {
                quiz: quiz,
                user: user
            }).then(result => resolve(result));
        });
        return promise;
    }
}
export let attempts = new Attempts();