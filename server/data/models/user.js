var db = require('./../db_schema.js');
var Event = require('./event');
var Food = require('./food');
var UserEvent = require('./user_event');
var Recommendation = require('./recommendation');
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

    var resData = { user: {} };
    var self = this;

    this.save(newInfo)
    .then(function(updatedUser) {
      resData.user.username = updatedUser.attributes.username,
      resData.user.firstname = updatedUser.attributes.firstname,
      resData.user.lastname = updatedUser.attributes.lastname,
      resData.user.email = updatedUser.attributes.email,
      resData.user.location = updatedUser.attributes.location
    })
    .then(function() {
      foodServices.editProfileFoodPrefs(next, self, preferences)
      .then(function(prefs) {
        resData.user.preferences = prefs;
      })
      .then(function() {
        dietServices.editDietRestrictions(next, self, restrictions)
        .then(function(restrictions) {
          resData.user.restrictions = restrictions;
        })
        .then(function() {
          callback(resData);
        })
      });
    })
    
  },

  getEvents: function(req, res, next) {
    var self = this;
    var eventUserRespMap = {};

    return userEventServices.getSingleUsersEventConnections(self.attributes.id)
      // get user-event joins for the specified user
      .then(function(eventConnections){ 
        eventConnections.forEach(function(connection) {
          eventUserRespMap[connection.attributes.event_id] = connection.attributes.responseStatus;
        });
        // get events from the event_id in the userevent joins
        return userEventServices.getSingleUsersEvents(eventConnections)
      })
      .then(function(events) {
        // after getting all of the events, filter them by status
        var activeEvents = [];
        for (var i in events) {
          if (events[i].status === 'active') {
            activeEvents.push(events[i]);
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
            // recommendation table accessed through each spacific event instance
            // include event details and recommendations
            var eventDetails = {
              name: event.name,
              creator: event.creator,
              date: event.date,
              numAttendees: event.attendeesNum,
              attendeesResponded: event.responded,
              publicEventId: event.publicEventId,
              recommendations: [],
              userResponseStatus: eventUserRespMap[event.id],
              selectedRestaurant: null
            }
            return User.forge({id: event.creator})
              .fetch()
              .then(function(creator) {
                eventDetails.creator = creator.attributes.username;
              }).then(function() {
                return eventModel.getRecommendations()
                  .then(function(recommendations) {
                    eventDetails.recommendations = recommendations;
                  })
                  .then(function() {
                    if (event.selectedRestaurant) {
                      return Recommendation.forge({id: event.selectedRestaurant})
                      .fetch()
                      .then(function(model) {
                        return {
                          name: model.attributes.name,
                          address: model.attributes.address,
                          city: model.attributes.city,
                          phone: model.attributes.phone,
                          rating_img_url: model.attributes.rating_img_url,
                          snippet_image_url: model.attributes.snippet_image_url,
                          url: model.attributes.url,
                          userVotes: model.attributes.userVotes
                        }
                      })
                      .then(function(selectedRestaurant) {
                        eventDetails.selectedRestaurant = selectedRestaurant;
                        return eventDetails;
                      }) 
                    } else {
                      return eventDetails;
                    }
                  }) 
              })
            })

        });
        return Promise.all(allEvents);

      });

  }

});

module.exports = User;
