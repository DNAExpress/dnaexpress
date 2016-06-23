var Events = require('../data/collections/events');
var Event = require('../data/models/event');
var UserEvents = require('../data/collections/user_events');
var UserEvent = require('../data/models/user_event');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = UserEventServices = {

  getSingleUsersEventConnections: function (userId) {
    return UserEvent
      .forge()
      .query('where', 'user_id', '=', userId)
      .fetchAll()
      .then(function (userEvents) {
        return userEvents.models;
      });
  },

  getSingleUsersEvents: function(userEventConnections) {
    // console.log(userEventConnections);
    // var eventResults;

    return Promise.all(userEventConnections.map(function (connection) {
      return UserEventServices.getEvent(connection.attributes.event_id);
    }));
  },

  getEvent: function(eventId) {
    return Event
      .forge({id: eventId})
      .fetch()
      .then(function (event) {
        return event.attributes;
      });
  },

  getRecommendations: function () {

  }, //event model

  getUserEventFoodPrefs: function () {

  },

  getResponseStatus: function (userEvent) {
    return userEvent.attributes.responseStatus;
  }, //used in getUserEvents

  submitUserEventPrefs: function () {

  },

  changeResponseStatus: function() {

  },

  getTotalEventUsers: function() {

  },

  getRespondedTotal: function() {

  }

};
// User
// .forge({username: 'diana'})
// .fetch()
// .then(function(user){
//   // console.log(user.attributes.id);
//   return UserEventServices.getSingleUsersEventConnections(user.attributes.id);
// }).then(function(usertoevents){
//   console.log(UserEventServices.getSingleUsersEvents(usertoevents));
// });




