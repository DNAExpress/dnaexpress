var jwt = require('jwt-simple');
var User = require('./../data/models/user');
var Users = require('./../data/collections/users');
var foodServices = require('./../services/food_services');
var dietServices = require('./../services/diet_services');

module.exports = userControls = {

  signup: function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var location = req.body.location;
    var resData = {};

    new User({ username: username })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            username: username,
            email: email,
            password: password,
            salt: null,
            firstname: firstname,
            lastname: lastname,
            location: location,
            status: 'active'
          });
          newUser.save()
            .then(function(newUser) {
              resData.token = jwt.encode(newUser, 'secret');
              resData.user = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                location: location
              };
              userControls.getAllUsers(newUser)
                .then(function(allUsers) {
                  resData.allUsers = allUsers;
                  res.status(200).send(resData);
              });
            });
        } else {
          return next(new Error('account already exists'));
        }
      });
  },

  signin: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var resData = {};

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(404).send({error: 'user does not exist'});
        } else {
          user.comparePassword(password, function(match) {
            if (match) {
              var token = jwt.encode(user, 'secret');
              resData.token = token;
              resData.user = {
                  username: user.attributes.username,
                  firstname: user.attributes.firstname,
                  lastname: user.attributes.lastname,
                  email: email,
                  location: user.attributes.location,
              }
            } else {
              res.status(400).send({error: 'user password does not match'});
            }
          })
          userControls.getAllUserData(res, req, next, user).then(function(allData) {
              resData.allUsers = allData.allUsers;
              resData.user.preferences = allData.preferences;
              resData.user.dietRestrictions = allData.restrictions;
              resData.user.events = allData.events;

              res.status(200).send(resData);
          });
        }
    });
  },

  editUserProfile: function (req, res, next) {
    new User({ email: req.body.email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(404).send({error: 'user does not exist'});
        } else {
          user.editUserInfo(req, res, next, function(resData) {
            res.status(200).send(resData)
          });
        }
      });
  },

  getAllUserData: function (req, res, next, user) {
    var allData = {};
    return userControls.getAllUsers(user)
      .then(function(allUsers) {
        allData.allUsers = allUsers;
      })
      .then(function() {
        // get users events AND recommendations for events
        return user.getEvents()
      })
      .then(function(events) {
          allData.events = events;
      })
      .then(function() {
        return foodServices.getProfileFoodPrefs(user)
          .then(function(prefs) {
            allData.preferences = prefs;
          })
          .then(function(){
            return dietServices.getDietRestrictions(user)
              .then(function(restrictions) {
                allData.restrictions = restrictions;
                return allData;
              })
          })
      .catch(function(error) {
        return next(new Error('failed getting all data'));
      });
    })
  },

  getAllUsers: function (currUser) {
    var currUser = currUser.attributes.username;
    return User
      .query('where', 'status', '=', 'active')
      .fetchAll()
      .then(function(users) {
        var currUsers = {};
        var userModels = users.models;
        for (var i = 0; i < userModels.length; i++) {
          if (userModels[i].attributes.username !== currUser) {
            var userAttributes = userModels[i].attributes;
            
            currUsers[userAttributes.username] = {
              username: userAttributes.username,
              location: userAttributes.location,
              firstname: userAttributes.firstname,
              lastname: userAttributes.lastname
            };
          }
        }
        return currUsers;
      });
  }
};
