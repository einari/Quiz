import {server} from "../Infrastructure/Server";

class Attempts
{
    start(quiz, attempt, user) {
        let promise = new Promise((resolve, reject) => {
            server.post("/attempts", {
                quiz: quiz,
                attempt: attempt,
                user: user
            }).then(result => resolve(result));
        });
        return promise;
    }
}
export let attempts = new Attempts();