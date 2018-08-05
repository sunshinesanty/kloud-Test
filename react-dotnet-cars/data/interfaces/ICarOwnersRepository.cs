using System.Collections.Generic;
using MongoDB.Bson;

namespace react_dotnet_cars
{
    public enum MemoryType {
        InMemory = 0,
        MongoDB = 1
    }
    public interface ICarOwnersRepository
    { 
        IEnumerable<CarOwners> GetCarOwners();
 
        CarOwners GetCarOwner(string id);
 
        CarOwners Create(CarOwners p);
    }
}