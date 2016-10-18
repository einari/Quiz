import rabbit from "rabbit.js";

class QuizMessages
{
    constructor() {
        let context = rabbit.createContext("amqp://192.168.50.50");
        context.on("ready", () => {
            let sub = context.socket("SUB");

            console.log("Ready");

            sub.setEncoding("utf8");

            sub.on("data", message => {
                console.log(`Data ${message}`);
            });

            sub.connect("events", () => {
                console.log("Connected");

            });
        });
    }

    publish(messageType, data) {
        let message = {
            type: messageType,
            body: data
        };

        let context = rabbit.createContext("amqp://192.168.50.50");
        context.on("ready", () => {
            let pub = context.socket("PUB");
            pub.connect("events", () => {
                let messageAsString = JSON.stringify(message);
                pub.write(messageAsString, "utf8");
                console.log(`Message published : ${messageAsString}`);
            });
        });
    }

    attemptStarted(quiz, user) {
        this.publish("attemptStarted", {
            quiz: quiz,
            user: user
        });
    }
}
export let quizMessages = new QuizMessages();