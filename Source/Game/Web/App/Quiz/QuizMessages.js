import io from "socket.io-client";

const _callbacks = new WeakMap();

class Event {
    constructor() {
        _callbacks.set(this,[]);
    }

    trigger(data) {
        _callbacks.get(this).forEach(callback => callback(data));
    }

    subscribe(callback) {
        _callbacks.get(this).push(callback);
    }
}

class QuizMessages {
    constructor() {
        var self = this;

        this.quizAdded = new Event();
        this.quizUpdated = new Event();
        this.attemptScored = new Event();

        let socket = io.connect(document.location.origin);
        socket.on("quizAdded", data => {
            self.quizAdded.trigger(data);
        });
        socket.on("attemptScored", data => {
            self.attemptScored.trigger(data);
        });
    }

}
export let quizMessages = new QuizMessages();