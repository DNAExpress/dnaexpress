var Events = require('../data/collections/events');
var Event = require('../data/models/event');
var UserEvents = require('./../data/collections/user_events');
var UserEvent = require('./../data/models/user_event');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');
var UserEventsFoods = require('./../data/collections/user_events_foods');
var UserEventsFood = require('./../data/models/user_events_food');
var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');

module.exports = UserEventServices = {

  getSingleUsersEventConnections: function (userId) {
    console.log('userEvent', UserEvent)
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
              console.log('add food type to userEventsFood!')
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
    // return Food
      //     .forge()
      //     .query(function(qb){
      //       qb.where('userEvent_id', '=', userEvent.attributes.id);
      //     })
      //     .fetch()
      //     .then(function(food) {
      //         //send both references down the promise chain
      //         return {foodModel: food, userEventModel: userEvent};
      //     })
        // .then(function(references) {
        //     return references
        //         .userModel
        //         //get the belongsToMany relation specified in the first definition, which returns a collection
        //         .foodtypes()
        //         .fetch();
        // })
        // .then(function(relation) {
        //     //console.log('got userProfileFoodPrefs table', relation.models)
        //     return relation.models.map(function(model) {

        //       console.log('model atts.type', model.attributes.type)
        //       return model.attributes.type
        //     })
        // })
  }

};

//console.log(UserEventServices.getAllUserEventsForEvent(2))
//console.log(UserEventServices.getSingleUsersEventConnections(1))
// test for adding userEventFoodPrefs
// UserEvent
//   .forge({id: 3})
//   .fetch()
//   .then(function(userEvent){
//     UserEventServices.addEventUserFoodPrefs(userEvent, ['burgers'])
//   });


