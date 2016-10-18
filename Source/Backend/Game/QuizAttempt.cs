using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Runtime;

namespace Game
{
    [ActorServiceAttribute(Name="Game")]
    [StatePersistence(StatePersistence.Persisted)]
    internal class QuizAttempt : Actor, IQuizAttempt
    {
        public QuizAttempt(ActorService actorService, ActorId actorId) : base(actorService, actorId) 
        {
        }

        protected override Task OnActivateAsync()
        {
            return Task.FromResult(0);
        } 

        Task IQuizAttempt.Conclude()
        {
            throw new NotImplementedException();
        }

        Task IQuizAttempt.Start(Guid quiz, string user)
        {
            throw new NotImplementedException();
        }

        Task IQuizAttempt.Submit(Guid answer, IEnumerable<Guid> attemptedOptions)
        {
            throw new NotImplementedException();
        }
    }
}