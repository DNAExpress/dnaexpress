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
  hashPassword: function(){
    console.log('in hashPassword')
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },
  // friends: function() {
  //   return this.belongsToMany(User);
  // },
  // dietRestricts: function() {
  //   return this.hasMany(DietRestricts);
  // }
});

module.exports = User;
