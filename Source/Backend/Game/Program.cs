namespace Game
{
    using System;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.ServiceFabric.Actors;
    using Microsoft.ServiceFabric.Actors.Client;
    using Microsoft.ServiceFabric.Actors.Runtime;
    using Newtonsoft.Json;
    using RabbitMQ.Client;
    using RabbitMQ.Client.Events;

    internal static class Program
    {
        /// <summary>
        /// This is the entry point of the service host process.
        /// </summary>
        private static void Main()
        {
            Console.WriteLine("Main - starting up");
            try
            {

                Console.WriteLine("Registering actor");
                ActorRuntime.RegisterActorAsync<QuizAttempt>(
                   (context, actorType) => new ActorService(context, actorType)).GetAwaiter().GetResult();

                Task.Run(() =>
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

                                
                            };

                            channel.BasicConsume(queue: queueName,
                                                 noAck: true,
                                                 consumer: consumer);

                            Console.WriteLine(" Waiting for messages");
                            Thread.Sleep(Timeout.Infinite);
                        }
                    }
                });



                Console.WriteLine("Registered");
                Thread.Sleep(Timeout.Infinite);
            }
            catch (Exception)
            {
                // Add Exception Handling Code Here.
                throw;
            }
        }
    }
}
