using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace react_dotnet_cars
{
    public interface ICarOwners
    {
        string Id { get; set; }
        string Name { get; set; }
        List<Cars> Cars { get; set; }
    }
}