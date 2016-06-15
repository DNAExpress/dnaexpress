var db = require('./../db_schema');
var Event = require('../models/event');

var Events = new db.Collection();

Events.model = Event;

module.exports = Events;
