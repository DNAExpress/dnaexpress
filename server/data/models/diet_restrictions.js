var db = require('./../db_schema.js');

var DietRestriction = db.Model.extend({
    tableName: 'dietRestricts',
    hasTimestamp: false
});

module.exports = DietRestriction;
