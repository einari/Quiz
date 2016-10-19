using System;
using System.Threading;
using Microsoft.ServiceFabric.Actors.Runtime;

namespace Game
{
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
