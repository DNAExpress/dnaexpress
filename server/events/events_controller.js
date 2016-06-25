var Events = require('./../data/collections/events');
var Event = require('./../data/models/event');
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

// console.log(eventControls.createEvent(object, res, next));
