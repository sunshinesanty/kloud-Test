using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace react_dotnet_cars
{
    [Route("api/[controller]")]
    public class CarOwnersController : Controller
    {
        #region  Members
        CarOwnersRepository carOwners;
        private IConfiguration _iConfig;
        #endregion

        #region Contructor
        public CarOwnersController(IConfiguration config) {
            _iConfig = config;
            carOwners = new CarOwnersRepository(_iConfig.GetValue<string>("connectionString:mongoDb"));
        }
        #endregion

        // GET api/carowner
        [HttpGet]
        public IEnumerable<CarOwners> Get()
        {
            return carOwners.GetCarOwners();
        }

        // GET api/carowner/objectID
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/carowners
        [HttpPost]
        public void Post([FromBody]CarOwners value)
        {
            carOwners.Create(value);
        }        
    }
}
