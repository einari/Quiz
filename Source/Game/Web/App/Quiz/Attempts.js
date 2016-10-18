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

    submitAnswer(attempt, question, answers) {
        server.post("/attempts/submit", {
            attempt: attempt,
            question: question,
            answers: answers
        });
    }

    end(attempt) {
        server.post("/attempts/end", { attempt: attempt });
    }
}
export let attempts = new Attempts();