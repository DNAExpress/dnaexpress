var db = require('./../db_schema');
var Food = require('../models/food');

var Foods = new db.Collection();

Foods.model = Food;

module.exports = Foods;
