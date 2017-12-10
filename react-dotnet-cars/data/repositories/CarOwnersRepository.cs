using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Collections.Generic;

namespace react_dotnet_cars
{
    public class CarOwnersRepository
    {
        MongoClient _client;
        MongoServer _server;
        IMongoDatabase _db;
 
        public CarOwnersRepository(string connectionString)
        {
           _client = new MongoClient(connectionString); //("mongodb://localhost:27017");
            _db = _client.GetDatabase("carsOwnersDB");
        }
 
        public IEnumerable<CarOwners> GetCarOwners()
        {
            return _db.GetCollection<CarOwners>("carOwners").Find(_ => true).ToList();
        }
 
        public CarOwners GetCarOwner(ObjectId id)
        {
            var res = _db.GetCollection<CarOwners>("carOwners").Find(x => x.Id == id).ToList();
            return res != null && res.Count > 0 ? res[0] : null;
        }
 
        public CarOwners Create(CarOwners p)
        {
            _db.GetCollection<CarOwners>("carOwners").InsertOne(p);
            return p;
        }
    }
}