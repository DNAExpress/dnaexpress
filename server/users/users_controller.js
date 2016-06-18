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
    console.log('routed to signup')
    new User({ username: username })
      .fetch()
      .then(function(user) {
        console.log('looked for user')
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
              console.log('saved user')
              var token = jwt.encode(newUser, 'secret');
              res.status(200).send({
                token: token,
                user: {
                  username: username,
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  location: location
                }
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

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(500).send({error: 'user does not exist'});
        } else {
          console.log('user found on signup', user)
          user.comparePassword(password, function(match) {
            if (match) {
              console.log('making signin token')
              var token = jwt.encode(user, 'secret');
              res.status(200).send({
                token: token,
                user: {
                  username: user.attributes.username,
                  firstname: user.attributes.firstname,
                  lastname: user.attributes.lastname,
                  email: email,
                  location: user.attributes.location
                }
              });
            } else {
              return next(new Error('user password does not match'));
            }
          });
        }
    });
  },
  editUserProfile: function editUserProfile(req, res, next) {
    console.log('editProfileReqBody', req.body);
    var userInfo = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    };
    var preferences = req.body.preferences;
    var restrictions = req.body.restrictions;

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          return next(new Error('user does not exist'));
        } else {
          user.editUserInfo(userInfo, next, function() {
            // foodServices.editProfileFoodPrefs(user, preferences, next);
            // dietServices.editDietRestrictions(user, restrictions, next);
          });
        }
      }).then(function() {
        res.status(200).send(user = req.body);
        // temporary placeholder
      });
  },
  getProfile: function getProfile(req, res, next) {

  },
  getAllUsers: function getAllUsers(req, res, next) {
    console.log('in getAllUsers')
    return User.fetchAll()
      .then(function(users) {
        var allUsers = [];
        var userModels = users.models
        
        for (var i = 0; i < userModels.length; i++) {
          var userAttributes = userModels[i].attributes;
          allUsers[userAttributes.username] = {
            username: userAttributes.username,
            location: userAttributes.location,
            firstname: userAttributes.firstname,
            lastname: userAttributes.lastname
          };
        }
        return allUsers;
      });
  }
};

