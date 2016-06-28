var Events = require('./../data/collections/events');
var Event = require('./../data/models/event');
var UserEvents = require('../data/collections/user_events');
var UserEvent = require('../data/models/user_event');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');
var UserEventsFoods = require('../data/collections/user_events_foods');
var UserEventsFood = require('../data/models/user_events_food');
var userEventServices = require('../services/user_event_services');
var FoodServices = require('../services/food_services');
var MailServer = require('../mail_server/mail_server');
var searchControls = require('./../search/search_controller');

module.exports = eventControls = {
  createEvent: function(req, res, next) {
    console.log('createEvent', req.body);
    var name = req.body.eventName;
    var date = req.body.date;
    var creator = req.body.creator;
    var attendees = (req.body.attendees).concat(creator);
    var location = 'San Francisco'  // get from client!!
    var event = new Event({
      name: name,
      date: date,
      creator: creator,
      attendeesNum: attendees.length,
      responded: 0,
      status: 'active',
      location: location
    });
    event.save()
    .then(function(newEvent){
      return eventControls.connectEventUsers(attendees, newEvent, res, next)
      .then(function() {
        User
        .forge({username: creator})
        .fetch()
        .then(function(user){
          return UserEventServices.getSingleUsersEventConnections(user.attributes.id);
        })
        .then(function(events){
          UserEventServices.getSingleUsersEvents(events)
          .then(function(usersEvents) {
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
    var prefs = req.body.prefs;
    var searchDetails = {location:'', restrictions: [], userFoodPrefs: [], eventId: null};
    eventControls.getUserModelByUsername(username)
      .then(function (user) {
        eventControls.getEventModelByPubId(pubEventId)
          .then(function (event) {
            searchDetails.eventId = event.attributes.id;
            searchDetails.location = event.attributes.location;
            // update the number of responded attendees ; 
              // will be used below to check if all attendees have completed foodPref forms
            var attendeesNum = event.get('attendeesNum');
            var responded = event.get('responded') + 1;
            event.save('responded', responded);

            eventControls.getUserEventModel(user.attributes.id, event.attributes.id)
            .then(function (userEvent) {
              // set users resp status for event to true, 
              // so that sever and client know they have completed form
              userEvent.save('responseStatus', 1);
            // uesrEventModel links a user and event, used to get user and event info, and users prefs for specific event
            console.log(prefs)
            UserEventServices.addEventUserFoodPrefs(userEvent, prefs);
            })
            .then(function () {
              // if all users have responded, collect all of their pref data and generate list of recommendations!
              if (attendeesNum === responded) {
                return eventControls.getPrefsForAllAttendees(searchDetails.eventId)
                  .then(function(allUserPrefs) {
                    // format food Prefs into and array of arrays for the algorithm
                    allUserPrefs.forEach(function(userPrefs) {
                      searchDetails.restrictions.push(userPrefs.restrictions)
                      searchDetails.userFoodPrefs.push([userPrefs.profileFoodPrefs, userPrefs.eventFoodPrefs]);
                    });
                  })
                  .then(function () {
                     // spit through alg
                    searchControls.getEventRecommendations(searchDetails);
                  })
                  .then(function() {
                    // fetch all of users events and res
                    return user.getEvents()
                      .then(function(events) {
                        res.status(200).send(events);
                      })
                  }).catch(function(error) {
                    console.log('error line 110 events controller', error)
                    //return next(new Error('failure in form submission handling: ' + error));
                  });
              } else {
                return user.getEvents()
                  .then(function(events) {
                    console.log('more forms to submit')
                    res.status(200).send(events);
                  });
              }
            })
            .catch(function(error) {
              console.log('error line 122 events controller', error)
              //return next(new Error('failure in form submission handling: ' + error));
            });
          })
          
      })
  },

  getPrefsForAllAttendees: function(eventId) {
    return eventControls.getAllUserEventsForEvent(eventId)
      .then(function(eventsUserEvents) {
        var result = eventsUserEvents.map(function(currUserEvent) {
          return eventControls.getDataForGeneratingRecs(currUserEvent)
            .then(function(userPrefs) {
              return userPrefs;
            });
        });
        return Promise.all(result)
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
      .forge({publicEventId: pubEventId})
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

  getEvent: function(eventId) {
    return Event
      .forge({id: eventId})
      .fetch()
      .then(function (event) {
        return event.attributes;
      });
  },

  getUsersEvents: function(req, res, next) {
    console.log('events req', req.body)
    User.forge({username: req.body})
      .fetch()
      .then(function(user) {
        if (!user) {
          next(new Error('user not foundd'));
        } else {
          user.getEvents()
            .then(function(events) {
              res.status(200).send(events);
            })
        }
      })
      .catch(function(error) {
        next(new Error('error in getUsersEvents in events controller' + error));
      })
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
