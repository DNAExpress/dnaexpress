var db = require('./../db_schema');
var userEventsFood = require('../models/food');

var userEventsFoods = new db.Collection();

userEventsFoods.model = userEventsFood;

module.exports = userEventsFoods;
