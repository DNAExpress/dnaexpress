var db = require('./../db_schema.js');
var Event = require('./event');
var Food = require('./food');
var UserEvent = require('./user_event');
var DietRestriction = require('./diet_restrictions');
var bcrypt = require('bcrypt-nodejs');
var foodServices = require('../../services/food_services.js');
var dietServices = require('../../services/diet_services.js');
var userEventServices = require('../../services/user_event_services');
var Bookshelf = require('bookshelf');
db.plugin('registry');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  events: function() {
    return this.belongsToMany(Event, 'usersEvents');
  },
  initialize: function() {
    return this.on('creating', this.hashPassword);
  },
  userEvents: function() {
    return this.hasMany(UserEvent);
  },
  foodtypes: function(){
    return this.belongsToMany(Food, 'userProfileFoodPrefs');
  },
  dietRestrictions: function () {
    return this.belongsToMany(DietRestriction, 'userDietRestricts');
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(currUser, req, res) {
    var self = this;
    var salt;

    return cipher(this.get('password'), getSalt())
      .then(function(hash) {
        self.set('salt', salt);
        self.set('password', hash);
      })
      .catch(function(error) {
        console.log('error hashing password', error);
      });

    function cipher(password, salt) {
      return new Promise(function (resolve, reject) {
        bcrypt.hash(password, salt, null, function (err, hash) {
          if(err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    };

    function getSalt() {
      bcrypt.genSalt(10, function(error, newSalt) {
        if (error) console.log('error creating salt', error)
        salt = newSalt;
        return salt;
      });
    };
  },
  editUserInfo: function(req, res, next, callback) {
    console.log('inside editUserInfo');

    var newInfo = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      // password: req.body.password,
      location: req.body.location
    };
    var preferences = req.body.preferences;
    var restrictions = req.body.restrictions;

    for (var key in newInfo) {
      var storedData = this.get(key);

      if (storedData !== newInfo[key]) {
        this.set(key, newInfo[key]);
      }
    }

    var self = this;

    var resData = {
      user: {
        username: self.attributes.username,
        firstname: self.attributes.firstname,
        lastname: self.attributes.lastname,
        email: self.attributes.email,
        location: self.attributes.location
      }
    };

    foodServices.editProfileFoodPrefs(next, self, preferences)
    .then(function(prefs) {
      resData.user.preferences = prefs;
    })
    .then(function() {
      console.log('restrictions', restrictions)
      dietServices.editDietRestrictions(next, self, restrictions)
      .then(function(restrictions) {
        resData.user.restrictions = restrictions;
        console.log('resData', resData)
        callback(resData);
      });
    })
  },
  getEvents: function(req, res, next) {
    var self = this;

    return userEventServices.getSingleUsersEventConnections(self.attributes.id)
      // get user-event joins for the specified user
      .then(function(eventConnections){ 
        // get events from the event_id in the userevent joins
        return userEventServices.getSingleUsersEvents(eventConnections)
      })
      .then(function(usersEvents) {
        // after getting all of the events, filter them by status
        var activeEvents = [];
        for (var i in usersEvents) {
          if (usersEvents[i].status === 'active') {
            activeEvents.push(usersEvents[i]);
          }
        }
        return activeEvents;
      })
      .then(function(activeEvents) {
        // find event recommondations, return promisified version of the mapped events
        var allEvents = activeEvents.map(function(event) {
          return Event.forge({id: event.id})
          .fetch() 
          .then(function(eventModel) {
            return eventModel.getRecommendations()
            // recommendation table accessed through each spacific event instance
            .then(function(recommendations) {
              // include event details and recommendations
              return {
                name: event.name,
                creator: event.creator,
                date: event.date,
                numAttendees: event.attendeesNum,
                attendeesResponded: event.responded,
                publicEventId: event.publicEventId,
                recommendations: recommendations
              }
          }); 
          }) 

        });
        return Promise.all(allEvents);

      });

  }

});

module.exports = User;
