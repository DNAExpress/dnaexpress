var db = require('./../db_schema.js');
var Event = require('./event');
var Food = require('./food');
var UserEvent = require('./user_event');
var DietRestriction = require('./diet_restrictions');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

var cipher = function (password, salt) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, salt, null, function (err, hash) {
      if(err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamp: true,
  events: function() {
    return this.belongsToMany(Event, 'usersEvents');
  },
  userEvents: function() {
    return this.hasMany(UserEvent);
  },
  foodtypes: function(){
    return this.belongsToMany(Food, 'userProfileFoodPrefs');
  },
  dietRestrictions: function () {
    return this.belongsToMany(DietRestriction, 'userDietRestricts');
  },
  initialize: function() {
    return this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    console.log('in comparePassword')
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(currUser) {
    //console.log('in hashPassword');
    // var cipher = Promise.promisify(bcrypt.hash);
    var salt;
    var getSalt = function() {
      bcrypt.genSalt(10, function(error, newSalt) {
        salt = newSalt;
        return salt;
      });
    };

    return cipher(this.get('password'), getSalt()).bind(this)
      .then(function(hash) {
        this.set('salt', salt);
        this.set('password', hash);
      })
      .catch(function(error) {
        res.status(500).send('Error hashing password');
      });
  },
  editUserInfo: function(newInfo, callback) {
     for (var key in newInfo) {
      var storedData = this.get(key);

      if (storedData !== newInfo[key]) {
        this.set(key, newInfo[key]);
      }

      callback();
     }
  }
});

module.exports = User;
