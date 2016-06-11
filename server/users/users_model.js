// will need mongoose, bycrypt, a promise library
var mongoose = require('mongoose');
var bycrypt = require('bycrypt-nodejs');

var userSchema = new mongoose.schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  profile: {
    //just a placeholder
  }
});
