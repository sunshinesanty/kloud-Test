
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace react_dotnet_cars
{
    public class Cars : ICars
    {
        [BsonElement("brand")]
        public string Brand { get; set; }

        [BsonElement("colour")]
        public string Colour { get; set; }
    }
}