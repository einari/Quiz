class GlobalState
{
    constructor() {
        this.currentQuiz = ko.observable();
    }

    get hasCurrentQuiz() {
        return typeof this.currentQuiz() != "undefined" && 
                this.currentQuiz() != null; 
    }
}
export default new GlobalState();