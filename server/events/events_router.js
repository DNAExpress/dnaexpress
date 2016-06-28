var eventsController = require('./events_controller');

module.exports = function (app) {
  app.post('/create', eventsController.createEvent);
  app.post('/delete', eventsController.deleteEvent);
  app.post('/formsubmission', eventsController.formSubmission);
  app.post('/getevents', eventsController.getUsersEvents);
};
