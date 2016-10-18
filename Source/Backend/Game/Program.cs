namespace Game
{
    using System;
    using System.Text;
    using System.Threading;
    using Microsoft.ServiceFabric.Actors.Runtime;
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


                var factory = new ConnectionFactory() {
                    HostName = "192.168.50.50"
                };
                using( var connection = factory.CreateConnection() ) 
                {
                    using( var channel = connection.CreateModel() )
                    {
                        //channel.QueueDeclare(queue: "events", durable: false, exclusive: false, autoDelete: false, arguments:null);

                        var consumer = new EventingBasicConsumer(channel);
                        consumer.Received += (model, ea) => 
                        {
                            var body = ea.Body;
                            var message = Encoding.UTF8.GetString(body);
                            Console.WriteLine($"Message : {message}");
                            

                        };

                        channel.BasicConsume(queue:"events", noAck:true, consumer:consumer);
                    }
                }

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
