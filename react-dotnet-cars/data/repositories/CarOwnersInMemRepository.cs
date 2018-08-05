using System.Collections.Generic;

namespace react_dotnet_cars
{
    public class CarOwnersInMemRepository : ICarOwnersRepository
    {
        List<CarOwners> InMemoryData;
        public CarOwnersInMemRepository()
        {
            InMemoryData = new List<CarOwners>() {
                new CarOwners() { Id="1", Name = "Bradley", Cars = new List<Cars>() { new Cars() { Brand = "MG", Colour = "Blue" }}},
                new CarOwners() { Id="2", Name = "Demetrios", Cars = new List<Cars>() {
                                    new Cars() { Brand = "Toyota", Colour = "Green"},
                                    new Cars() { Brand = "Holden", Colour = "Blue"}
                }},
                new CarOwners() { Id="3", Name = "Brooke", Cars = new List<Cars>() {
                    new Cars() { Brand = "Holden", Colour = ""}
                }},
                new CarOwners() { Id="4", Name = "Kristin", Cars = new List<Cars>() {
                    new Cars() { Brand = "Toyota", Colour = "Blue"},
                    new Cars() { Brand = "Mercedes", Colour = "Green"},
                    new Cars() { Brand = "Mercedes", Colour = "Yellow"}
                }},
                new CarOwners() { Id="5", Name = "Andre", Cars = new List<Cars>() {
                    new Cars() { Brand = "BMW", Colour = "Green"},
                    new Cars() { Brand = "Holden", Colour = "Black"}
                }},
                new CarOwners() { Id="6",Name="", Cars = new List<Cars>() {
                    new Cars() { Brand = "Mercedes", Colour = "Blue"}
                }},
                new CarOwners() { Id="7", Name = "", Cars = new List<Cars>() {
                    new Cars() { Brand = "Mercedes", Colour = "Red"},
                    new Cars() { Brand = "Mercedes", Colour = "Blue"}
                }},
                new CarOwners() { Id="8", Name = "Matilda", Cars = new List<Cars>() {
                    new Cars() { Brand = "Holden", Colour = ""},
                    new Cars() { Brand = "BMW", Colour = "Black"}
                }},
                new CarOwners() { Id="9", Name = "Iva", Cars = new List<Cars>() {
                    new Cars() { Brand = "Toyota", Colour = "Purple"}
                }},
                new CarOwners() { Id="10",Name="", Cars = new List<Cars>() {
                    new Cars() { Brand = "Toyota", Colour = "Blue"},
                    new Cars() { Brand = "Mercedes", Colour = "Blue"}
                }}
            };
        }

        public IEnumerable<CarOwners> GetCarOwners()
        {
            return InMemoryData;
        }

        public CarOwners GetCarOwner(string name)
        {
            var res = InMemoryData.Find(c => c.Name.ToUpper() == name.ToUpper());
            return res != null ? res : null;
        }

        public CarOwners Create(CarOwners c)
        {
            InMemoryData.Add(c);
            return c;
        }
    }
}