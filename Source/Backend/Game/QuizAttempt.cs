using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors.Runtime;

namespace Game
{
    [ActorService(Name="QuizAttempt")]
    [StatePersistence(StatePersistence.Persisted)]
    public class QuizAttempt : Actor, IQuizAttempt
    {
        public Task Begin(Guid quiz, string user)
        {
            throw new NotImplementedException();
        }

        public Task End()
        {
            throw new NotImplementedException();
        }

        public Task SubmitAnswer(Guid answer, IEnumerable<Guid> attemptedOptions)
        {
            throw new NotImplementedException();
        }
    }
}