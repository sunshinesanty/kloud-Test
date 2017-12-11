using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace react_dotnet_cars
{
    [Route("api/cars")]
    public class CarOwnersController : Controller
    {
        #region  Members
        ICarOwnersRepository carOwners;
        private IConfiguration _iConfig;
        #endregion

        #region Contructor
        public CarOwnersController(IConfiguration config)
        {
            _iConfig = config;
            CarOwnersFactory factory = new CarOwnersFactory();

            MemoryType memoryType = MemoryType.InMemory;
            try { memoryType = (MemoryType)Enum.Parse(typeof(MemoryType), _iConfig.GetValue<string>("data:memory")); }
            catch { memoryType = MemoryType.InMemory; }
            carOwners = factory.CreateRepository(memory: memoryType, connectionString: _iConfig.GetValue<string>("data:connectionString:mongoDb"));
        }
        #endregion

        // GET api/cars
        [HttpGet]
        public IEnumerable<CarOwners> Get()
        {
            return carOwners.GetCarOwners();
        }

        // GET api/cars/objectID
        [HttpGet("{id}")]
        public CarOwners Get(string id)
        {
            return carOwners.GetCarOwner(id);
        }

        // POST api/cars
        [HttpPost]
        public void Post([FromBody]CarOwners value)
        {
            carOwners.Create(value);
        }
    }
}
