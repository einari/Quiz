import {quizMessages} from "./QuizMessages";

export default class Attempts
{
    constructor(express) {
        var self = this;
        express.post("/attempts/submit", (request, response, next) => {
            self.submitAnswer(request.body.attempt, request.body.question, request.body.options);
        });

        express.post("/attempts/end", (request, response, next) => {
            self.end(request.body.attempt);
        });

        express.post("/attempts", (request, response, next) => {
            console.log("Attempts");
            self.start(request.body.quiz, request.body.attempt, request.body.user);
        });
    }

    start(quiz, attempt, user) {
        quizMessages.attemptStarted(quiz, attempt, user);
    }

    submitAnswer(attempt, question, answers) {
        console.log("submitAnswer");
        quizMessages.questionAnswerSubmitted(attempt, question, answers);
    }

    end(attempt) {
        quizMessages.attemptSubmitted(attempt);
    }
}