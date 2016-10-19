using System;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Runtime;

namespace Receiver
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Registering ReceiverType");
                ServiceRuntime.RegisterServiceAsync("ReceiverType",
                    context => new MessagePump (context)).GetAwaiter().GetResult();

                Console.WriteLine("ReceiverType Registered");
                Thread.Sleep(Timeout.Infinite);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
