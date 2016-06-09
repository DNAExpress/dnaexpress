var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./config/middleware.js')(app, express);

var api_router = require('./data/api_requests/api_router.js');


app.post('/search', function (req, res) {
  api_router.askYelp(req, res);
})

module.exports = app;
