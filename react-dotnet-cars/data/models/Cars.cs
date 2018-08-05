
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace react_dotnet_cars
{
    public class Cars : ICars
    {
        [JsonProperty(PropertyName="brand")]        
        public string Brand { get; set; }

        [JsonProperty(PropertyName="colour")]        
        public string Colour { get; set; }
    }
}