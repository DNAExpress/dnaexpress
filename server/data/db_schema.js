
var mongoose = require('mongoose');
var options = { server: { socketOptions: { connectTimeoutMS: 1000000, maxTimeMS:100000 }}};
var databaseUrl = 'mongodb://localhost/server/data/db/';
mongoose.connect('mongodb://localhost/server/data/db/');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "My own Connection Error"));
db.once('open', function() {
  console.log("Connection to localhost:8000/server/data/db is open")
});

module.exports = db;
