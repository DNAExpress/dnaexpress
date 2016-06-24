var db = require('../db_schema');
var UserEvents = require('../collections/user_events');
var User = require('./user');
var Event = require('./event');
var Food = require('./food');

var UserEvent = db.Model.extend({
  tableName: 'userEvents',
  hasTimestamp: false,
  users: function () {
    return this.belongsTo(User);
  },
  events: function () {
    return this.belongsTo(Event);
  },
  foods: function() {
    return this.belongsToMany(Food, 'userEventsFood');
  },
  initialize: function () {
    this.set('responseStatus', 0);
  }
});

module.exports = UserEvent;
