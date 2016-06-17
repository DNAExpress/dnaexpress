var db = require('./../db_schema.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamp: true,
  // events: function() {
  //   return this.belongsToMany(Event, 'usersEvents', 'user_id', 'event_id');
  // },
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
    var cipher = Promise.promisify(bcrypt.hash);
    var salt;
    var getSalt = function() {
      bcrypt.genSalt(10, function(error, newSalt) {
        salt = newSalt;
        return salt;
      });
    };

    return cipher(this.get('password'), getSalt(), null).bind(this)
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
  // friends: function() {
  //   return this.belongsToMany(User);
  // },
  // dietRestricts: function() {
  //   return this.hasMany(DietRestricts);
  // }
});

module.exports = User;
