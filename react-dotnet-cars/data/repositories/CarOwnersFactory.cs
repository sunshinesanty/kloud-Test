namespace react_dotnet_cars
{
    public class CarOwnersFactory
    {
        public virtual ICarOwnersRepository CreateRepository(MemoryType memory = MemoryType.InMemory, string connectionString = "") {
            ICarOwnersRepository carOwners = null;
            switch(memory)
            {
                case MemoryType.MongoDB:
                    try{ carOwners = new CarOwnersRepository(connectionString);  }
                    catch{ carOwners = new CarOwnersInMemRepository(); }
                    break;
                default:
                    carOwners = new CarOwnersInMemRepository();
                    break;
            }
            return carOwners;
        }
    }
}