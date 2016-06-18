var db = require('./../db_schema.js');
var Event = require('./event');
var Food = require('./food');
var UserEvent = require('./user_event');
var DietRestriction = require('./diet_restrictions');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamp: true,
  events: function() {
    return this.belongsToMany(Event, 'usersEvents');
  },
  initialize: function() {
    return this.on('creating', this.hashPassword);
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
  comparePassword: function(attemptedPassword, callback) {
    console.log('in comparePassword')
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(currUser, req, res) {
    var self = this;
    var salt;

    return cipher(this.get('password'), getSalt())
      .then(function(hash) {
        self.set('salt', salt);
        self.set('password', hash);
      })
      .catch(function(error) {
        console.log('error hashing password', error);
      });

    function cipher(password, salt) {
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

    function getSalt() {
      bcrypt.genSalt(10, function(error, newSalt) {
        if (error) console.log('error creating salt', error)
        salt = newSalt;
        return salt;
      });
    };
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
