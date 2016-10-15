import {quizes} from "./Quizes";

export class Choose
{
    constructor() {
        let self = this;

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => self.quizes(result));
    }

    start(quiz) {
        
    }
}