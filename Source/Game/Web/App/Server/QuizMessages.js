import { namingService } from "./NamingService"
import amqp from "amqplib/callback_api";

const _callbacks = new WeakMap();

class Event {
    constructor() {
        _callbacks.set(this, []);
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

        namingService.resolveEndpoint("QuizCommon", "QuizCommon/Messaging", "MessagingPort").then(endpoint => {
            amqp.connect("amqp://192.168.50.50", (error, connection) => {
                console.log("Connected");
                let channel = connection.createChannel((e, channel) => {
                    let exchangeName = "events";

                    console.log("Channel setup");

                    channel.assertExchange(exchangeName, "fanout", { durable: false });
                    channel.assertQueue("", { exclusive: true }, (ee, q) => {
                        channel.bindQueue(q.queue, exchangeName, "");
                        channel.consume(q.queue, message => {
                            let messageBody = JSON.parse(message.content.toString());

                            if (self.hasOwnProperty(messageBody.type)) {
                                self[messageBody.type].trigger(messageBody.body);
                            }
                        }, { noAck: true });
                    });
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
                let messageAsString = JSON.stringify(message);
                console.log(`Publish : ${messageAsString}`);
                channel.publish(exchangeName, "", new Buffer(messageAsString));
            });
        });
    }


    attemptStarted(quiz, attempt, user) {
        console.log(`attemptStarted(${quiz}, ${attempt}, ${user})`);
        this.publish("attemptStarted", {
            quiz: quiz,
            attempt: attempt,
            user: user
        });
    }

    questionAnswerSubmitted(attempt, question, answers) {
        this.publish("questionAnswerSubmitted", {
            attempt: attempt,
            question: question,
            answers: answers
        });
    }

    attemptSubmitted(attempt) {
        this.publish("attemptSubmitted", { attempt: attempt });
    }
}
export let quizMessages = new QuizMessages();