var Events = require('../data/collections/events');
var Event = require('../data/models/events');
var UserEvents = require('../data/collections/user_events');
var UserEvent = require('../data/models/user_event');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = UserEventServices = {

  connectEventUsers: function (event, eventUsers /* array of users add to an event */) {

  },

  // getUserEvents: function (user) {
  //   return UserEvent
  //     .forge({user_id: user.attributes.id})
  //     .fetchAll();
  //     .then(function (user) {
  //       return Event
  //         .forge({})
  //     }
  // },

  getRecommendations: function () {

  }, //event model

  getUserEventFoodPrefs: function () {

  },

  getResponseStatus: function () {

  }, //used in getUserEvents

  submitUserEventPrefs: function () {

  }

};
