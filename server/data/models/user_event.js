var db = require('../db_schema');
// var UserEvents = require('../collections/user_events');
var Food = require('./food');

var UserEvent = db.Model.extend({
  tableName: 'userEvents',
  hasTimestamp: false,
  users: function () {
    return this.belongsTo('User');
  },
  events: function () {
    return this.belongsTo('Event');
  },
  foods: function() {
    return this.belongsToMany(Food, 'userEventsFood');
  },
  initialize: function () {
    return this.on('creating', function() {
      this.set('responseStatus', 0);
    });
  }
});

module.exports = UserEvent;
