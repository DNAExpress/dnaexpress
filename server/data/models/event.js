var db = require('./../db_schema.js');
var User = require('./user');
// var Suggestions = require('./event_suggestions')
var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamp: true,
  attendees: function() {
    return this.belongsToMany(User, 'usersEvents');
    //through usersEvents
  },
  // suggestions: function() {
  //   return this.hasMany('Suggestions');
  // },

  creator: function() {
    return this.hasOne('User');
  },

  initialize: function() {
    return this.on('creating', function() {
      console.log('initializing event')
    });
  },
});

module.exports = Event;
