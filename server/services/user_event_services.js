var Events = require('../data/collections/events');
var Event = require('../data/models/event');
var UserEvents = require('./../data/collections/user_events');
var UserEvent = require('./../data/models/user_event');
var UserEventsFoods = require('./../data/collections/user_events_foods');
var UserEventsFood = require('./../data/models/user_events_food');
var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');
// var User = require('./../data/models/user');
// var eventControls = require('./../events/events_controller');

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
    return Promise.all(userEventConnections.map(function (connection) {
      return eventControls.getEvent(connection.attributes.event_id);
    }));
  },

  getResponseStatus: function (userEvent) {
    return userEvent.attributes.responseStatus;
  }, //used in getUserEvents

  getUserEventFoodPrefs: function () {

  },

  addEventUserFoodPrefs: function (userEvent, foodPrefs) {
    foodPrefs.forEach(function (foodPref) {
      add(foodPref);
    });

    function add(type) {
      Food.forge({type: type})
        .fetch()
        .then(function(food) {
          UserEventsFood.forge({
            userEvent_id: userEvent.attributes.id,
            foodType_id: food.attributes.id
          }).save()
          .then(function(newUserEventsFoodJoin) {
              // console.log('add food type to userEventsFood!')
          }).catch(function (error) {
            console.log(error);
          });
        });
    }
  },

  getUserEventsFoodPrefs: function (userEvent) {
    return UserEventsFood
      .query('where', 'userEvent_id', '=', userEvent.attributes.id)
      .fetchAll()
      .then(function (foodPrefs) {
        var foods = foodPrefs.map(function(pref) {
          return Food
            .forge({id: pref.attributes.foodType_id})
            .fetch()
            .then(function (food) {
              return food.attributes.type;
            })
        })
        return Promise.all(foods)
      })
  }

};
