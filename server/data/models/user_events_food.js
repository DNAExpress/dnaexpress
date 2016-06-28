var db = require('./../db_schema');

var userEventsFood = db.Model.extend({
  tableName: 'userEventsFood',
  hasTimestamp: false,
});

module.exports = userEventsFood;
