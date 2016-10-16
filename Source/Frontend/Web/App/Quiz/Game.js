import globalState from "./GlobalState";

export class Game {
    constructor() {
        let self = this;
        this.quiz = ko.observable({
            id: 42, title: "Magical quiz", description: "This is the awesome one", questions: [
                {
                    question: "Name all magicians", options: [
                        { text: "Lord Vader", isCorrect: false },
                        { text: "El Presidento", isCorrect: false },
                        { text: "David Blaine", isCorrect: true },
                        { text: "David Copperfield", isCorrect: true }
                    ]
                },
                {
                    question: "Name all horses", options: [
                        { text: "Horse man", isCorrect: false },
                        { text: "El horso", isCorrect: false },
                        { text: "David Horso", isCorrect: true },
                        { text: "David Copperfield", isCorrect: true }
                    ]
                }
                

            ]
        });
        //globalState.currentQuiz;
        this.currentQuestionIndex = ko.observable(0);
        this.currentQuestion = ko.computed(() => {
            return self.quiz().questions[self.currentQuestionIndex()]
        });

        this.hasPrevious = ko.computed(() => self.currentQuestionIndex() != 0);
        this.hasNext = ko.computed(() => self.currentQuestionIndex() < self.quiz().questions.length-1);
    }

    goToPreviousQuestion() {
        if( this.currentQuestionIndex() > 0 ) {
            this.currentQuestionIndex(this.currentQuestionIndex()-1);
        }
    }

    goToNextQuestion() {
        if( this.currentQuestionIndex() < this.quiz().questions.length-1 ) {
            this.currentQuestionIndex(this.currentQuestionIndex()+1);
        }
    }
}