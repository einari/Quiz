using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Actors.Runtime;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;


using Game.Interfaces;

namespace Receiver
{
    internal sealed class MessagePump : StatelessService
    {
        public MessagePump(StatelessServiceContext context)
            : base(context)
        { }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            var factory = new ConnectionFactory() { HostName = "192.168.50.50" };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    var exchangeName = "events";
                    channel.ExchangeDeclare(exchangeName, "fanout");
                    var queueName = channel.QueueDeclare().QueueName;
                    channel.QueueBind(queue: queueName, exchange: exchangeName, routingKey: "");

                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var messageAsString = Encoding.UTF8.GetString(body);

                        dynamic message = JsonConvert.DeserializeObject(messageAsString);
                        Console.WriteLine(" [x] Received {0}", message);

                        Console.WriteLine("Message type : " + message.type);
                        if (message.type == "attemptStarted")
                        {
                            try
                            {
                                var attempt = Guid.Parse(message.body.attempt.ToString());
                                var quiz = Guid.Parse(message.body.quiz.ToString());
                                var user = message.body.user.ToString();

                                Console.WriteLine("Starting an attempt: ");
                                Console.WriteLine($"  Attempt: {attempt}");
                                Console.WriteLine($"  Quiz : {quiz}");
                                Console.WriteLine($"  User : {user}");
                                var actor = ActorProxy.Create<IQuizAttempt>(new ActorId(attempt), "fabric:/QuizBackend", "Game");
                                actor.Start(quiz, user);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine("Exception : " + ex);
                            }
                        }

                        if (message.type == "questionAnswerSubmitted")
                        {
                            var attempt = Guid.Parse(message.body.attempt.ToString());
                            var question = Guid.Parse(message.body.question.ToString());
                            var answers = ((IEnumerable<object>)message.body.answers).Select(a => Guid.Parse(a.ToString()));
                            var actor = ActorProxy.Create<IQuizAttempt>(new ActorId(attempt), "fabric:/QuizBackend", "Game");
                            actor.Submit(question, answers);
                        }

                        if (message.type == "attemptSubmitted")
                        {
                            Console.WriteLine("Conclude");
                            var attempt = Guid.Parse(message.body.attempt.ToString());
                            var actor = ActorProxy.Create<IQuizAttempt>(new ActorId(attempt), "fabric:/QuizBackend", "Game");
                            //actor.Conclude().ContinueWith(result => 
                            {
                                Console.WriteLine("Concluded");
                                var resultMessage = new
                                {
                                    type = "attemptScored",
                                    body = new
                                    {
                                        result = 42f
                                    }
                                };
                                var resultBody = JsonConvert.SerializeObject(resultMessage);
                                Console.WriteLine($" [x] Send {resultBody}");
                                var bodyAsBytes = Encoding.UTF8.GetBytes(resultBody);

                                using (var chn = connection.CreateModel())
                                {
                                    chn.ExchangeDeclare(exchangeName, "fanout");
                                    chn.BasicPublish(exchange: exchangeName, routingKey: "", basicProperties: null, body: bodyAsBytes);
                                }
                            }
                        }
                    };

                    channel.BasicConsume(queue: queueName,
                                            noAck: true,
                                            consumer: consumer);

                    Console.WriteLine(" Waiting for messages");
                    Thread.Sleep(Timeout.Infinite);
                }
            }

            while (true)
            {
                cancellationToken.ThrowIfCancellationRequested();

                await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
            }
        }
    }    
}