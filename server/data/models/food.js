var db = require('./../db_schema');
var User = require('./user');

var Food = db.Model.extend({
  tableName: 'foodTypes',
  hasTimestamp: false,

  users: function () {
    return this.belongsToMany(User, 'userProfileFoodPrefs');
  },

  userevent: function () {
    return this.belongsToMany(Food, 'userEventsFood');
  }
});

module.exports = Food;
