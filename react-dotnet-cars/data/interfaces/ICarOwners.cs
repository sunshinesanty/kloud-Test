using System.Collections.Generic;

namespace react_dotnet_cars
{
    public interface ICarOwners
    {
        string Name { get; set; }
        List<ICars> Cars { get; set; }
    }
}