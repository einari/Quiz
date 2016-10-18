using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Game
{
    public interface IQuizAttempt
    {
        Task Begin(Guid quiz, string user);
        Task SubmitAnswer(Guid answer, IEnumerable<Guid> attemptedOptions);
        Task End();
    }
}