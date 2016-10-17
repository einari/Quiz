import globalState from "./GlobalState";

export class Game {
    constructor() {
        let self = this;
        this.quiz = ko.observable({
            id: 42, title: "Magical quiz", description: "This is the awesome one", questions: [
                {
                    id: 43,
                    question: "Name all magicians", options: [
                        { id: 44, text: "Lord Vader", isCorrect: false },
                        { id: 45, text: "El Presidento", isCorrect: false },
                        { id: 46, text: "David Blaine", isCorrect: true },
                        { id: 47, text: "David Copperfield", isCorrect: true }
                    ]
                },
                {
                    id: 48,
                    question: "Name all horses", options: [
                        { id: 48, text: "Horse man", isCorrect: false },
                        { id: 49, text: "El horso", isCorrect: false },
                        { id: 50, text: "David Horso", isCorrect: true },
                        { id: 51, text: "David Copperfield", isCorrect: true }
                    ]
                }
            ]
        });
        //globalState.currentQuiz;
        this.currentQuestionIndex = ko.observable(0);
        this.currentQuestion = ko.computed(() => {
            return self.quiz().questions[self.currentQuestionIndex()]
        });

        this.currentQuestion.subscribe(this.prepareQuestion);
        this.prepareQuestion(this.currentQuestion());

        this.currentQuestionOptions = ko.computed(() => {
            let options = self.currentQuestion().options;
            return options;
        });

        this.isLastQuestion = ko.computed(() => self.currentQuestionIndex() == self.quiz().questions.length-1);
        this.hasPrevious = ko.computed(() => self.currentQuestionIndex() != 0);
        this.hasNext = ko.computed(() => self.currentQuestionIndex() < self.quiz().questions.length-1  && !self.isLastQuestion());
    }

    prepareQuestion(question) {
        question.options.forEach(option => {
            if( !option.selected || !ko.isObservable(option.selected) ) {
                option.selected = ko.observable(false);
            }
        });
    }

    goToPreviousQuestion() {
        if( this.currentQuestionIndex() > 0 ) {
            this.currentQuestionIndex(this.currentQuestionIndex()-1);
        }
    }

    goToNextQuestion() {
        this.currentQuestion().options.forEach(option => {
            console.log(`${option.text} - ${option.selected()}`)
        });
        
        if( this.currentQuestionIndex() < this.quiz().questions.length-1 ) {
            this.currentQuestionIndex(this.currentQuestionIndex()+1);
        }
    }

    submitAnswers() {

    }
}