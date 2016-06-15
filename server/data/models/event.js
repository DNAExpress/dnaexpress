var db = require('./../db_schema.js');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamp: true,
  attendees: function() {
    return this.belongsToMany(User, 'usersEvents', 'event_id', 'user_id')
    //through usersEvents
  },
  initialize: function() {
    return this.on('creating', function() {
      console.log('initializing event')
    });
  },
});

module.exports = Event;