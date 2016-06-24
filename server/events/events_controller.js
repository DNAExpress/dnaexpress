var Events = require('./../data/collections/events');
var Event = require('./../data/models/event');
var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');
var UserEvents = require('./../data/collections/user_events');
var UserEvent = require('./../data/models/user_event');
var userEventServices = require('../services/user_event_services')

module.exports = eventControls = {
  createEvent: function(req, res, next) {
    // console.log('createEvent', req.body);
    var name = req.body.eventName;
    var date = req.body.date;
    var creator = req.body.creator;
    var attendees = (req.body.attendees).concat(creator);
    // var user = new User({username: creator});
    var event = new Event({
      name: name,
      date: date,
      creator: creator,
      attendeesNum: attendees.length,
      responded: 0,
      status: 'active'
    });
    event.save()
    .then(function(newEvent){
      return eventControls.connectEventUsers(attendees, newEvent, res, next)
      .then(function() {
        User
        .forge({username: creator})
        .fetch()
        .then(function(user){
          console.log('about to call getSingleUserEventsConnections', user.attributes);
          return UserEventServices.getSingleUsersEventConnections(user.attributes.id);
        })
        .then(function(events){
          console.log('about to call getSingleUserEvents', events);

          UserEventServices.getSingleUsersEvents(events)
          .then(function(usersEvents) {
            console.log('Final .then before sending response', usersEvents);
          // console.log(UserEvents);
            res.status(200).send(usersEvents);
          });
        });
      });
    });
  },

  deleteEvent: function () {

  },

  formSubmission: function (req, res, next) {
    var pubEventId = req.body.pubEventId;
    var username  = req.body.username;
    var prefs = req.body.preferences;

    Event
      .forge({publicEventId: pubEventId})
      .fetch()
      .then(function(event){
        event.attributes.id
      });
  },

  // getSingleUserEvent: function (username) {

  // },

  addEventUserFoodPrefs: function (userEvent, foodPrefs /*array of foodPrefs*/) {

    foodPrefs.forEach(function (foodPref) {
      add(foodPref);
    });

    function add(type) {
      return Food
        .forge({type: type})
        .fetch()
        .then(function(food) {
          return {foodTypesModel: food, userEventModel: userEvent};
        })
        .then(function(references) {
          return references
            .userEventModel
            .foods()
            .attach(references.foodTypesModel);
        })
        .then(function(relation) {
          console.log('Successfully created relationship in addEventUserFoodPrefs function');
        }).catch(function(error){
          // return next(new Error('Failed to create relationship in addEventUserFoodPrefs function'))
        });
    };
  },

  // getEventUserFoodPrefs: function () {

  // },

  getUserEventId: function (userId, eventId) {
    return UserEvent
      .forge()
      .query(function(qb){
        qb.where('user_id', '=', userId).andWhere('event_id', '=', eventId);
      })
      .fetch()
      .then(function (userevent) {
        return userevent.attributes.id;
      });
  },

  getUserByUsername: function (username) {
    return User
      .forge({username: username})
      .fetch()
      .then(function (user) {
        return user;
    });
  },

  getEventByPubId: function (pubEventId) {
    return Event
      .forge({id: pubEventId})
      .fetch()
      .then(function (event) {
        return event.attributes;
      });
  },

  connectEventUsers: function (attendees, event, res, next) {
    // console.log(attendees)
    var result = attendees.map(function (username) {
      return new User({username: username}).fetch()
      .then(function(user){
        if (user) {
          return new UserEvent({
            user_id: user.attributes.id,
            event_id: event.attributes.id,
            responseStatus: 0
          })
          .save()
          .then(function (eventuser) {
            if (!eventuser) {
              return next(new Error('failed to find user in user table when attempting to create an event'));
            }
            return eventuser;
          })
        } else {
          return next(new Error('failed to find user in user table when attempting to create an event'));
        }
      });
    });
    return Promise.all(result);
    // console.log(Promise.all(result));
  }
};

// eventControls.getUserByUsername('nate')
//   .then(function (user) {
//     console.log(eventControls.addEventUserFoodPrefs(user, ['burgers', 'thai', 'sushi']));
//   });


