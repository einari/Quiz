import {quizes} from "./Quizes";
import navigation from "../Infrastructure/Navigation";
import globalState from "./GlobalState";

export class Choose
{
    constructor() {
        let self = this;

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => self.quizes(result));
    }

    start(quiz) {
        globalState.currentQuiz(quiz);
        navigation.goTo("Quiz/Game");
    }
}