var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  salt: String,
  profile: [{
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    preferences: {
      type: [String]
    },
    vegetarian: {
      type: String
    },
    vegan: {
      type: String
    },
    gultenFree: {
      type: String
    }
  }],
  friends: {
    type: [String]
  }
});


module.exports = mongoose.model('users', UserSchema);
