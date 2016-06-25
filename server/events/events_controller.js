var Events = require('./../data/collections/events');
var Event = require('./../data/models/event');
var UserEvents = require('../data/collections/user_events');
var UserEvent = require('../data/models/user_event');
var Foods = require('../data/collections/foods');
var Food = require('./../data/models/food');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');
var UserEventsFoods = require('../data/collections/user_events_foods');
var UserEventsFood = require('../data/models/user_events_food');
var userEventServices = require('../services/user_event_services')
var FoodServices = require('../services/food_services')

module.exports = eventControls = {
  createEvent: function(req, res, next) {
    // console.log('createEvent', req.body);
    var name = req.body.eventName;
    var date = req.body.date;
    var creator = req.body.creator;
    var attendees = (req.body.attendees).concat({username: creator});
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
    eventControls.getUserModelByUsername(username)
      .then(function (user) {
        user.set('responseStatus', 1);
        eventControls.getEventModelByPubId(pubEventId)
          .then(function (event) {
            var attendeesNum = event.get('attendeesNum');
            var responded = event.get('responded') + 1;
            event.save('responded', responded);
            eventControls.getUserEventModel(user.attributes.id, event.attributes.id)
          }).then(function (userEvent) {
            eventControls.addEventUserFoodPrefs(userEvent, prefs);
          }).then(function () {
            [attendees]
            eventControls.getEventUserFoodPrefs()
            // user.getEvents();
            if (attendeesNum === responded) {
              var userPrefs = {};
              eventControls.getAllEventAttendees(event.attributes.id)
              .then(function (attendees) {
                var attendeeProfileAndEventFoodPrefs = [];
                return attendees.forEach(function(attendee) {
                  User
                  .forge({id: attendee.attributes.user_id})
                  .fetch()
                  .then(function (userModel) {
                      FoodServices.getProfileFoodPrefs(userModel)
                      .then(function (profileFoodArray){
                        eventControls.getEventFoodPrefs(attendees);
                      }).then(function(eventFoodArray) {
                        attendeeProfileAndEventFoodPrefs.push([profileFoodArray, eventFoodArray]);
                      }); // dietary restrictions
                  })
                });
              });

              // get all attendee profile food pref data and user event food prefs and diet restrictions
              // pipe result to algorithm
              // make yelp api call
              // add recommendations to recommendation table
            } else {

            }


          // get all events, recommendations, and response status for current user and send back to user
        });
      })
  },

  getAllEventAttendees: function (eventId) {
    UserEvent
      .forge()
      .query('where', 'event_id', '=', eventId)
      .fetchAll()
      .then(function (userEvent) {
        return userEvent.models;
      });
  },
// for each attendee
  // get user profile food prefs (getProfileFoodPrefs) and user event food prefs (getEventUserFoodPrefs)
  addEventUserFoodPrefs: function (userEvent, foodPrefs /*array of foodPrefs*/) {
    console.log(userEvent);
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
              console.log('Success!')
          }).catch(function (error) {
            console.log(error);
          });
        });
    }
  },

  getUserEventsFoodPrefs: function (userEvent) {
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
  },

  // changeUserResponseNum

  getUserEventModel: function (userId, eventId) {
    return UserEvent
      .forge()
      .query(function(qb){
        qb.where('user_id', '=', userId).andWhere('event_id', '=', eventId);
      })
      .fetch()
      .then(function (userevent) {
        return userevent;
      });
  },

  getUserModelByUsername: function (username) {
    return User
      .forge({username: username})
      .fetch()
      .then(function (user) {
        return user;
    });
  },

  getEventModelByPubId: function (pubEventId) {
    return Event
      .forge({id: pubEventId})
      .fetch()
      .then(function (event) {
        return event;
      });
  },

  connectEventUsers: function (attendees, event, res, next) {
    var result = attendees.map(function (username) {
      return new User({username: username.username})
        .fetch()
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
  }
};
// eventControls.getAllEventAttendees(2);
// eventControls.getUserEventModel(1, 1)
//   .then(function (userEvent) {
//     eventControls.addEventUserFoodPrefs(userEvent, ['burgers', 'sushi', 'koreanbbq']);
//   });


    //   return Food
    //     .forge({type: type})
    //     .fetch()
    //     .then(function(food) {
    //       return {foodTypesModel: food, userEventModel: userEvent};
    //     })
    //     .then(function(references) {
    //       console.log(references);
    //       return references
    //         .userEventModel
    //         .foods()
    //         .attach(references.foodTypesModel);
    //     })
    //     .then(function(relation) {
    //       console.log(relation);
    //       console.log('Successfully created relationship in addEventUserFoodPrefs function');
    //     }).catch(function(error){
    //       console.log(error);
    //       // return next(new Error('Failed to create relationship in addEventUserFoodPrefs function'))
    //     });
    // };
