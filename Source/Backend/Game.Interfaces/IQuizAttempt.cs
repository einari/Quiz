using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;

namespace Game.Interfaces
{
    public interface IQuizAttempt : IActor
    {
        Task Start(Guid quiz, string user);
        Task Submit(Guid question, IEnumerable<Guid> attemptedOptions);
        Task<float> Conclude();
    }
}