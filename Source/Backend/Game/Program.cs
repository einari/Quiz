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
                                if( message.type == "attemptStarted" ) 
                                {
                                    Console.WriteLine("Starting an attempt");
                                    var actor = ActorProxy.Create<IQuizAttempt>(new ActorId(Guid.NewGuid()), "fabric:/QuizBackend", "Game");
                                    actor.Start(message.body.quiz, message.body.user);
                                }

                                Console.WriteLine(" [x] Received {0}", message);
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
