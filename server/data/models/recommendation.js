var db = require('./../db_schema.js');
var Recommendations = require('../collections/recommendations');
var Event = require('./event');
var Recommendation = db.Model.extend({
    tableName: 'recommendations',
    hasTimestamp: false,
    event: function () {
      return this.belongsTo(Event);
    }
});

module.exports = Recommendation;
