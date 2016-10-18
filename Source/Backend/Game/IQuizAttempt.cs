using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;

namespace Game
{
    public interface IQuizAttempt : IActor
    {
        Task Start(Guid quiz, string user);
        Task Submit(Guid answer, IEnumerable<Guid> attemptedOptions);
        Task Conclude();
    }
}