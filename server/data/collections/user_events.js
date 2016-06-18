var db = require('./../db_schema');
var UserEvent = require('../models/user_event');

var UserEvents = new db.Collection();

UserEvents.model = UserEvent;

module.exports = UserEvents;
