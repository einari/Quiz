import {quizes} from "./Quizes";
import navigation from "../Infrastructure/Navigation";

export class Choose
{
    constructor() {
        let self = this;

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => self.quizes(result));
    }

    start(quiz) {
        navigation.goTo("Quiz/Game");
    }
}