import {quizes} from "./Quizes";
import {attempts} from "./Attempts";
import navigation from "../Infrastructure/Navigation";
import globalState from "./GlobalState";

let Guid = {
    create: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    empty: "00000000-0000-0000-0000-000000000000"    
};


export class Choose
{
    constructor() {
        let self = this;

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => self.quizes(result));
    }

    start(quiz) {
        globalState.currentQuiz(quiz);
        globalState.currentAttempt(Guid.create());
        navigation.goTo("Quiz/Game");
        attempts.start(quiz.id, globalState.currentAttempt(), "einar@dolittle.com");
    }
}