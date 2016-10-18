
import amqp from "amqplib/callback_api";

class QuizMessages {
    constructor() {
        amqp.connect("amqp://192.168.50.50", (error, connection) => {
            console.log("Connected");
            let channel = connection.createChannel((e, channel) => {
                let exchangeName = "events";

                console.log("Channel setup");

                channel.assertExchange(exchangeName, "fanout", { durable: false });
                channel.assertQueue("", { exclusive: true }, (ee, q) => {
                    channel.bindQueue(q.queue, exchangeName, "");
                    channel.consume(q.queue, message => {
                        console.log(`Message received : ${message.content.toString()}`);
                    }, { noAck: true });
                });
            });
        });
    }

    publish(messageType, data) {
        let message = {
            type: messageType,
            body: data
        };

        amqp.connect("amqp://192.168.50.50", (error, connection) => {
            console.log("Connected");
            let channel = connection.createChannel((e, channel) => {
                let exchangeName = "events";
                channel.assertExchange(exchangeName, "fanout", { durable: false });
                channel.publish(exchangeName, "", new Buffer(JSON.stringify(message)));
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