using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace react_dotnet_cars
{
    public class CarOwners : ICarOwners
    {
        public ObjectId Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("cars")]
        public List<ICars> Cars { get; set; }
    }
}