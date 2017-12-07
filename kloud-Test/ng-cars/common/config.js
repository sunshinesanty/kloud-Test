const config = {
    network: {
        baseEndPointUrl: 'https://kloudcodingtest.azurewebsites.net',
        useMockData: false,
        corsEnabled: true,
        userProxy: true,
        proxy : {
            baseEndPointUrl: 'http://localhost:3088'
        }
    },
    apiEndpoints: {
        cars: '/api/cars'
    }
};

module.exports["default"] = config;
