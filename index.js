var app = require('./server/server.js');

var port = process.env.PORT || 8000;

var db = require('./server/data/db_schema.js')
app.listen(port);
console.log("Listening on port: " + port);
