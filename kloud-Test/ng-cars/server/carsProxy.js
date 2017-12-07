/*
    Application specific server used to procxy the call to the public API shared
    The public API provided has CORS enabled and this is to over come the CORS
*/

// node imports
var httpRequest = require("request");
var express = require('express');
var urlHelper = require('url');
var cors = require('cors');

//application configuration
const config = require('../common/config').default;

// Logger classes
const errorLog = require('./logger').errorlog;
const successlog = require('./logger').successlog;

// starts the light weight proxy server for the application
function startServer() {
    var proxyApp = express();
    var webServer = require('http').createServer(proxyApp);
    var port = process.env.port || 3088;

    //set up routes    
    proxyApp.use(cors());
    proxyApp.get("/api/cars", getCarOwners);


    webServer.listen(port, () => {
        successlog.info('CORS enabled proxy API server launched..')
    });
}

function getCarOwners(req, res, next) {
    try {
        const queryData = urlHelper.parse(req.url, true);        
        let serviceUrl = queryData && queryData.src ? queryData.src : `${config.network.baseEndPointUrl}${config.apiEndpoints.cars}`;
        
        httpRequest({
            url: serviceUrl,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                successlog.info('Success Car Owners retrieved.');
                res.end(JSON.stringify(body));
                next();
            } else {
                errorLog.error('Unable to read car owners.', error.Message, error.stack);
                res.status(404).send(error.Message);
                next();
            }
        })
    } catch (error) {
        errorLog.error('unexpected error', error.Message, error.stack);
        res.status(501).send('unexpected server error' + error.Message);
        next();
    }
}

startServer();
