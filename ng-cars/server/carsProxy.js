/*
    Application specific server used to procxy the call to the public API shared
    The public API provided has CORS enabled and this is to over come the CORS
*/

// node imports
const httpRequest = require('request');
const express = require('express');
const urlHelper = require('url');
const cors = require('cors');
const fs = require('fs');

// application configuration
const config = require('../common/config').default;

// Logger classes that currently log to the console
// but can be configured to log to a file
const errorLog = require('./logger').errorlog;
const successlog = require('./logger').successlog;

// starts the light weight proxy server for the application
function startServer() {
    const proxyApp = express();
    const webServer = require('http').createServer(proxyApp);
    const port = process.env.port || 3088;

    // set up routes and enable CORS
    proxyApp.use(cors())
    proxyApp.get('/api/cars', getCarOwners);    
    const path  = __dirname + '/../dist';
    console.log('Hosting server at http://localhost:' + port)
    if (fs.existsSync(path)) {
        const staticContent = express.static(path);
        proxyApp.use(staticContent);
    } else {
        proxyApp.get('/', (req, res, next) => {
            res.send('<h1>Applicaton not built and published</h1>')
            next();
        });
    }

    // local server for Dev acting as Proxy for original service
    webServer.listen(port, () => {
        successlog.info('CORS enabled proxy API server launched..');
    });
}

// Get car owners function atht repsonds to the API/CARS endpoint
const getCarOwners = (req, res, next) => {
    try {
        // read any url sent via queryu string for data
        const queryData = urlHelper.parse(req.url, true);

        // if the URL is not sent via QUerystrig, then read from configuration file.
        const serviceUrl = queryData && queryData.src ? queryData.src : `${config.network.baseEndPointUrl}${config.apiEndpoints.cars}`;

        // set an HTTP request to the open URL,
        // this is only suported for the URL taht are readly accessible public without authetication
        httpRequest({
            url: serviceUrl,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                // respond with retrieved data on success
                successlog.info('Success Car Owners retrieved.');
                res.end(JSON.stringify(body));
                next();
            } else {
                // respond with not found status for the data could not retrieved
                errorLog.error('Unable to read car owners.', error.Message, error.stack);
                res.status(404).send(error.Message);
                next();
            }
        });
    } catch (error) {
        // any other error is constructing teh web request is logged and sent as server error
        errorLog.error('Unexpected server error', error.Message, error.stack);
        res.status(501).send('unexpected server error' + error.Message);
        next();
    }
};

startServer();
