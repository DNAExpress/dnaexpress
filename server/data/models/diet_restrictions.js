var db = require('./../db_schema.js');
var User = require('./user');
var DietRestriction = db.Model.extend({
    tableName: 'dietRestricts',
    hasTimestamp: false,
    users: function () {
      return this.belongsToMany(User, 'userDietRestricts');
    }
});

module.exports = DietRestriction;
