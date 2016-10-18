import amqp from "amqplib/callback_api";

class QuizMessages
{
    publish(messageType, data) {
        let message = {
            type: messageType,
            body: data
        };

        amqp.connect("amqp://192.168.50.50",(error, connection) => {
            let channel = connection.createChannel((e,channel) => {
                let exchangeName = "events";
                channel.assertExchange(exchangeName, "fanout", { durable: false });
                channel.publish(exchangeName, "", new Buffer(JSON.stringify(message)));
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