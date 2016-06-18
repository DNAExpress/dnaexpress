var db = require('./../db_schema.js');
var Recommendation = require('../models/recommendation');

var Recommendations = new db.Collection();

Recommendations.Model = Recommendation;

module.exports = Recommendations;
