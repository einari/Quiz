import globalState from "./GlobalState";

export class Game {
    constructor() {
        let self = this;
        this.quiz = ko.observable(globalState.currentQuiz());
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

        this.submitting = ko.observable(false);
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

        this.submitting(true);

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