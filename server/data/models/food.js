var db = require('./../db_schema');

var Food = db.Model.extend({
  tableName: 'foodTypes',
  hasTimestamp: false
  // events: function() {
  //   return this.belongsToMany(Event, 'usersEvents', 'user_id', 'event_id');
  // },
});

module.exports = Food;
