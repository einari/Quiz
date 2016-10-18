class GlobalState
{
    constructor() {
        this.currentQuiz = ko.observable();
        this.currentAttempt = ko.observable();
        this.userName = ko.observable();
    }

    get hasCurrentQuiz() {
        return typeof this.currentQuiz() != "undefined" && 
                this.currentQuiz() != null; 
    }
}
export default new GlobalState();