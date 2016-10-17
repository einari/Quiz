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
                    question: "Find the horse", options: [
                        { id: 48, text: "Horse man", isCorrect: false },
                        { id: 49, text: "El horso", isCorrect: false },
                        { id: 50, text: "David Horso", isCorrect: true },
                        { id: 51, text: "David Copperfield", isCorrect: false }
                    ]
                },
                {
                    id: 52,
                    question: "Check all that applies", options: [
                        { id: 53, text: "Water is heavy", isCorrect: false },
                        { id: 54, text: "Water is fluid", isCorrect: true },
                        { id: 55, text: "Water is transparent", isCorrect: true },
                        { id: 56, text: "Water is solid", isCorrect: false }
                    ]
                },
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

        this.hasMultipleChoice = ko.computed(() => {
            let numberOfOptions = 0;

            self.currentQuestion().options.forEach(option => {
                if( option.isCorrect ) numberOfOptions ++;
            });

            return numberOfOptions > 1;
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
        let questionsAndAnswers = [];

        this.quiz().questions.forEach(question => {
            let questionAndAnswers = {
                id: question.id,
                answers: []
            }; 

            console.log(`Question : ${question.question}`);

            question.options.forEach(option => {
                if( option.selected() == true || option.selected() == "on") {
                    questionAndAnswers.answers.push(option.id);
                    console.log(`Answer : ${option.text}`)
                }
            });
        });
    }
}