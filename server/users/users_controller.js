var jwt = require('jwt-simple');
var User = require('./../data/models/user');
var Users = require('./../data/collections/users');
var foodServices = require('./../services/food_services');
var dietServices = require('./../services/diet_services');

module.exports = userControls = {

  signup: function signup(req, res, next) {
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
            location: location
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
              userControls.getAllUsers(req, res, next)
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
  signin: function signin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var resData = {};

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(500).send({error: 'user does not exist'});
        } else {
          console.log('user found on signup', user)
          user.comparePassword(password, function(match) {
            if (match) {
              //console.log('making signin token')
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
              return next(new Error('user password does not match'));
            }
          })
          userControls.getAllUserData(res, req, next, user).then(function(allData) {
              resData.allUsers = allData.allUsers;
              resData.user.preferences = allData.preferences;
              resData.user.dietRestrictions = allData.restrictions;
              res.status(200).send(resData);
          });
        }
    });
  },
  editUserProfile: function editUserProfile(req, res, next) {
    new User({ email: req.body.email })
      .fetch()
      .then(function(user) {
        if (!user) {
          return next(new Error('user does not exist'));
        } else {
          user.editUserInfo(req, res, next, function(resData) {
            res.status(200).send(resData)
          });
        }
      });
  },
  getAllUserData: function(req, res, next, user) {
    console.log('getting all data with user: ', user.attributes.username)
    var allData = {};
    return userControls.getAllUsers()
      .then(function(allUsers) {
        allData.allUsers = allUsers;
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
          });
          // add get events
      })
      .catch(function(error) {
        return next(new Error('failed getting all data'));
      });
  },
  getAllUsers: function getAllUsers(req, res, next) {
    return User.fetchAll()
      .then(function(users) {
        var currUsers = {};
        var userModels = users.models;
        for (var i = 0; i < userModels.length; i++) {
          var userAttributes = userModels[i].attributes;
          currUsers[userAttributes.username] = {
            username: userAttributes.username,
            location: userAttributes.location,
            firstname: userAttributes.firstname,
            lastname: userAttributes.lastname
          };

        }
        return currUsers;
      });
  }
};

