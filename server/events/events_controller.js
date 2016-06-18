var Events = require('./../data/collections/events');
var Event = require('./../data/models/event');
var UserEvents = require('./../data/collections/user_events');
var UserEvent = require('./../data/models/user_event');

module.exports = eventControls = {
  createEvent: function(req, res, next) {
    var name = req.body.eventName;
    var date = req.body.date;
    var creator = req.body.creator;
    var attendees = req.body.attendees;
    var event = new Event({
      name: name,
      date: date,
      creator: creator,
      attendeesNum: attendees.length,
      responded: 0
    });
    event.save().then(function(event){
      eventControls.connectEventUser(attendees, event, res, next);
    });
  },
  deleteEvent: function () {

  },
  connectEventUser: function (attendees, event, res, next) {
    attendees.forEach(function (username) {
      var user = new User({username: username});
      user.fetch()
        .then(function(user){
          if (user) {
            var eventUser = new UserEvent({
              user_id: user.attributes.id,
              event_id: event.attributes.id,
              responseStatus: 0
            });
            eventUser.save().then(function (eventuser) {
              if (!eventuser) {
                return next(new Error('failed to find user in user table when attempting to create an event'));
              }
            });
          } else {
            return next(new Error('failed to find user in user table when attempting to create an event'));
          }
        });
    })
  }
};

// var object = {
//   body: {
//     eventName;
//     date;
//     creator;
//     attendees;
//   }
// };

// console.log(eventControls.createEvent(object, res, next));
