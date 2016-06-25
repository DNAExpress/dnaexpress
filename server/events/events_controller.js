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
var userEventServices = require('../services/user_event_services');
var FoodServices = require('../services/food_services');
var MailServer = require('../mail_server/mail_server');

module.exports = eventControls = {
  createEvent: function(req, res, next) {
    console.log('createEvent', req.body);
    var name = req.body.eventName;
    var date = req.body.date;
    var creator = req.body.creator;
    var attendees = (req.body.attendees).concat(creator);
    var event = new Event({
      name: name,
      date: date,
      creator: creator,
      attendeesNum: attendees.length,
      responded: 0,
      status: 'active'
      // location: 'San Francisco'
    });
    event.save()
    .then(function(newEvent){
      return eventControls.connectEventUsers(attendees, newEvent, res, next)
      .then(function() {
        User
        .forge({username: creator})
        .fetch()
        .then(function(user){
          // console.log('about to call getSingleUserEventsConnections', user.attributes);
          return UserEventServices.getSingleUsersEventConnections(user.attributes.id);
        })
        .then(function(events){
          //console.log('about to call getSingleUserEvents', events);
          UserEventServices.getSingleUsersEvents(events)
          .then(function(usersEvents) {
            // console.log('Final .then before sending response', usersEvents);
          // console.log(UserEvents);
            res.status(200).send(usersEvents);
            return;
          })
          .then(function() {
            eventControls.mailAttendees(attendees, creator);
          })
          .catch(function (err) {
            console.error(err);
          });;
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
    var eventId;
    eventControls.getUserModelByUsername(username)
      .then(function (user) {
        // set users resp status for event to true, 
          // so that sever and client know they have completed form
        user.set('responseStatus', 1);
        eventControls.getEventModelByPubId(pubEventId)
          .then(function (event) {
            eventId = event.attributes.id;
            // update the number of responded attendees ; 
              // will be used below to check if all attendees have completed foodPref forms
            var attendeesNum = event.get('attendeesNum');
            var responded = event.get('responded') + 1;
            event.save('responded', responded);

            eventControls.getUserEventModel(user.attributes.id, event.attributes.id)
          })
          .then(function (userEvent) {
            // uesrEventModel links a user and event, used to get user and event info, and users prefs for specific event
            eventControls.addEventUserFoodPrefs(userEvent, prefs);
          })
          .then(function () {
            // if all users have responded, collect all of their pref data and generate list of recommendations!
            if (attendeesNum === responded) {
              return eventControls.getPrefsForAllAttendees(eventId)
                .then(function(allUserPrefs) {
                  // spit through algorithm
                })
                .then(function() {
                  // fetch all of users events and res

                    // .then(function(usersEvents) {
                    //   //respnd
                    // })
                })
            } else {
              // fetch all of users events and res
            }
          })
          .catch(function(error) {
            return next(new Error('failure in form submission handling: ' + error));
          });
      })
  },

  getPrefsForAllAttendees: function(eventId) {
    eventControls.getAllUserEventsForEvent(eventId)
      .then(function(eventsUserEvents) {
        var allUserPrefs = eventsUserEvents.map(function(currUserEvent) {
          return eventControls.getDataForGeneratingRecs(currUserEvent)
            .then(function(userPrefs) {
              console.log('individual Users TOTAL Prefs', userPrefs)
              return userPrefs;
            });
        });
      })
  },

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

  getAllUserEventsForEvent: function (eventId) {
    return UserEvent
      .forge()
      .query('where', 'event_id', '=', eventId)
      .fetchAll()
      .then(function (userEvent) {
        return userEvent.models;
      });
  },

  getDataForGeneratingRecs: function (userEvent) {
    var allUserPrefs = {};
    console.log('user id', userEvent.attributes.user_id);
    return User.forge({id: userEvent.attributes.user_id})
      .fetch()
      .then(function (user) {
          return foodServices.getProfileFoodPrefs(user)
          .then(function (profileFoodArray) {
            allUserPrefs.profileFoodPrefs = profileFoodArray;
          })
          .then(function(){
            return dietServices.getDietRestrictions(user)
              .then(function(restrictions) {
                allUserPrefs.restrictions = restrictions;
              })
              .then(function() {
                return UserEventServices.getUserEventsFoodPrefs(userEvent)
                  .then(function(eventFoodArray) {
                    allUserPrefs.eventFoodPrefs = eventFoodArray;
                    return allUserPrefs;
                  });
              });
          });
      });

    },

  connectEventUsers: function (attendees, event, res, next) {
    var result = attendees.map(function (username) {
      return new User({username: username})
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
  },

  mailAttendees: function (attendees, creator) {
   return Promise.all(attendees.map(function (attendee) {
     console.log(attendee);
     return User
     .forge({username: attendee})
     .fetch()
     .then(function (user) {
       return user.attributes.email;
     });
   })).then(function (emailList) {
     emailList = emailList.join(', ');
     console.log(emailList);
     MailServer.mail(creator, 'http://localhost:8000', '/mail_Templates/eventAlert.html', emailList);
   });
 }
};
// eventControls.getAllEventAttendees(2);
// eventControls.getUserEventModel(1, 1)
//   .then(function (userEvent) {
//     eventControls.addEventUserFoodPrefs(userEvent, ['burgers', 'sushi', 'koreanbbq']);
//   });

};

// old
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
//eventControls.getAllUserEventsForEvent(2)
eventControls.getPrefsForAllAttendees(1);


new Event({id: 1})
      .fetch()
      .then(function (event) {
        console.log(event)
        return event.attributes;
      });
