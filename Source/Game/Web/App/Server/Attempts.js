import {quizMessages} from "./QuizMessages";

export default class Attempts
{
    constructor(express) {
        var self = this;
        express.post("/attempts", (request, response, next) => {
            console.log("Attempts");
            self.start(request.body.quiz, request.body.user);
        });
    }


    start(quiz, user) {

        quizMessages.attemptStarted(quiz, user);
    }

    submitAnswer(id, options) {

    }

    end(id) {

    }
}