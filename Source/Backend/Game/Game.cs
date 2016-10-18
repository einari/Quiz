using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Runtime;

namespace Game
{
    [ActorServiceAttribute(Name="Game")]
    [StatePersistence(StatePersistence.Persisted)]
    internal class Game : Actor, IGame
    {
        public Game(ActorService actorService, ActorId actorId) : base(actorService, actorId)
        {
        }
        
        protected override Task OnActivateAsync()
        {
            return this.StateManager.TryAddStateAsync("count", 0);
        }

        Task<int>  IGame.GetCountAsync()
        {
            return this.StateManager.GetStateAsync<int>("count");
        }

        Task  IGame.SetCountAsync(int count)
        {
            return this.StateManager.AddOrUpdateStateAsync("count", count, (key, value) => count > value ? count : value);
        }
    }
}
