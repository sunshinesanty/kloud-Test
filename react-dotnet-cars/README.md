
# dotnet-react-cars
This is another implementation of teh same logic with React as Front end and dotnet core as backend to replciate the service api.

The service api is been configured for 2 stores, inmemory which is default and mongodb, the data for the application is stored in a mongd dba nd the appropriate connection string is provided in the appsetting.json file. then the data will be read from the mongo db server.

This is not fully automated for build, if using visual studio code, currently we have to run the Web api in debug that will run the service on http://localhost:5000/api/cars.
The point the command prompt to the **frontend** folder within teh web api application and then run **npm start**
The front end application will be hosted on http://localhost:3000
