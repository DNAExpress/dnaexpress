var mongoose = require('mongoose');
mongoose.connect('mongodb:/db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
  console.log("mongoose is online")
})
