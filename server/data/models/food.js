var db = require('./../db_schema');
var User = require('./user');
// var UserEvent = require('./user_event');
var Food = db.Model.extend({
  tableName: 'foodTypes',
  hasTimestamp: false,
  // events: function() {
  //   return this.belongsToMany(Event, 'usersEvents', 'user_id', 'event_id');
  // },
  users: function () {
    return this.belongsToMany(User, 'userProfileFoodPrefs');
  },
  userevent: function () {
    return this.belongsToMany(Food, 'userEventsFood');
  }
});

module.exports = Food;
