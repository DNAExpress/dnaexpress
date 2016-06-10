var express = require('express');
var app = express();

require('./config/middleware.js')(app, express);


module.exports = app;

// var db = require('./data/db_schema.js');  //temporary to get the database to initialize
