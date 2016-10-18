import {quizes} from "./Quizes";
import ko from "knockout";
import komapping from "knockout.mapping";

let Guid = {
    create: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    empty: "00000000-0000-0000-0000-000000000000"    
};

export class Editor
{
    constructor() {
        let self = this;

        this.currentQuiz = ko.observable();
        this.currentQuestion = ko.observable();
        this.currentQuiz.subscribe(() => self.currentQuestion(null));

        this.quizTitle = ko.observable();
        this.question = ko.observable();
        this.optionText = ko.observable();
        this.optionCorrect = ko.observable(false);

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => {
            result.forEach(quiz => {
                quiz.questions = ko.observableArray(quiz.questions);
                quiz.questions().forEach(question => {
                    question.options = ko.observableArray(question.options);
                });
            });

            self.quizes(result);
        });
    }

    unwrap(quiz) {
        return ko.toJS(quiz);
    }


    addQuiz() {
        let quiz = {
            id: Guid.create(),
            title: this.quizTitle(),
            questions: ko.observableArray()
        };
        this.quizes.push(quiz);
        this.quizTitle("");
        this.currentQuiz(quiz);
        quizes.add(this.unwrap(quiz));
    }

    addQuestion() {
        let question = {
            id: Guid.create(),
            question: this.question(),
            options: ko.observableArray()
        };
        this.currentQuiz().questions.push(question);
        this.question("");
        this.currentQuestion(question);
        
        quizes.update(this.unwrap(this.currentQuiz()));
    }

    addOption() {
        let option = {
            id: Guid.create(),
            text: this.optionText(),
            isCorrect: this.optionCorrect()
        };
        this.optionText("");
        this.optionCorrect(false);
        
        this.currentQuestion().options.push(option);
        quizes.update(this.unwrap(this.currentQuiz()));
    }
}