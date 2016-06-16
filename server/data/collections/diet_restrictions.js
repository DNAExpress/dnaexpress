var db = require('./../db_schema.js');
var DietRestriction = require('../models/diet_restrictions');

var DietRestrictions = new db.Collection();

DietRestrictions.Model = DietRestriction;

module.exports = DietRestrictions;
