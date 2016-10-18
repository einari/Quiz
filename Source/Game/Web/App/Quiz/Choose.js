import {quizes} from "./Quizes";
import {attempts} from "./Attempts";
import navigation from "../Infrastructure/Navigation";
import globalState from "./GlobalState";
import io from "socket.io/socket.io";

let Guid = {
    create: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    empty: "00000000-0000-0000-0000-000000000000"    
};


export class Choose
{
    constructor() {
        let self = this;
        this.userName = ko.observable();

        this.hasUserName = ko.computed(() => {
            //return true;
            
            return typeof globalState.userName() != "undefined" && 
                            globalState.userName() != null &&
                            globalState.userName() != "";
        });
        

        this.quizes = ko.observableArray();
        quizes.getAll().then(result => self.quizes(result));

        let socket = io.connect(document.location.origin);
        socket.on("quizAdded", data => {
            self.quizes.push(data);
        });
        socket.on("attemptScored", data => {
            console.log("Attempt scored");
        });
    }

    start(quiz) {
        globalState.currentQuiz(quiz);
        globalState.currentAttempt(Guid.create());
        globalState.userName(this.userName());
        navigation.goTo("Quiz/Game");
        attempts.start(quiz.id, globalState.currentAttempt(), globalState.userName());
    }

    setUsername() {
        globalState.userName(this.userName);
    }
}