var eventsController = require('./events_controller');
var UserEventServices = require('./../services/user_event_services');

module.exports = function (app) {
  app.post('/create', eventsController.createEvent);
  app.post('/delete', eventsController.deleteEvent);
  app.post('/decline', eventsController.declineEvent);
  app.post('/formsubmission', eventsController.formSubmission);
  app.post('/getevents', eventsController.getUsersEvents);
  app.post('/selectrestaurant', eventsController.selectRestaurant);
};
