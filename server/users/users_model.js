var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
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
      type: Boolean
    },
    vegan: {
      type: Boolean
    },
    gultenFree: {
      type: Boolean
    }
  }],
  friends: {
    type: [String]
  }
});


module.exports = mongoose.model('users', UserSchema);
