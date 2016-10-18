import rabbit from "rabbit.js";

class QuizMessages
{
    publish(messageType, data) {
        let message = {
            type: messageType,
            body: data
        };

        let context = rabbit.createContext("amqp://localhost");
        context.on("ready", () => {
            let pub = context.socket("PUB");
            pub.connect("events", () => {
                let messageAsString = JSON.stringify(message);
                pub.write(messageAsString, "utf8");
                console.log(`Message published : ${messageAsString}`);
            });
        });
    }

    added(quiz) {
        this.publish("quizAdded", quiz);
    }

    updated(quiz) {
        this.publish("quizUpdated", quiz);
    }
}
export let quizMessages = new QuizMessages();