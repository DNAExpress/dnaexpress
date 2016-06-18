var jwt = require('jwt-simple');
var User = require('./../data/models/user');
var Users = require('./../data/collections/users');
var Food = require('./../data/models/food');
var Foods = require('./../data/collections/foods');

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
              res.json({token: token});
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
              res.json({token: token});
            } else {
              return next(new Error('user password does not match'));
            }
          });
        }
    });
  },
  getProfile: function getProfile(req, res, next) {

  },
  editUserProfile: function editUserProfile(req, res, next) {
    console.log('editProfileReqBody', req.body);
    // sample req.body:
      // var data = {
      //   username: username,
      //   firstname: firstname,
      //   lastname: lastname,
      //   email: email,
      //   password: password,
      //   location: location,
      //   restrictions: [],
      //   preferences: []
      // };
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
          user.editUserInfo(userInfo, function() {
            res.status(200).send();
          });
        }
      })

    // look up user
      // if user does not exist throw error
      // otherwise - change user data in:
        // 'users', userdietrestrictions, userprofileprefs
  },
  editFoodPrefs: function editFoodPrefs(user, foodPrefs) {
    //for each food pref
      // if food does not exist in food table, add
    // fetch users pre-existing food preferences
      // if a preference has been removed, remove their connection with it from the db
      // if one has been added, add their connection with it to the db
  },
  editFoodRestrictions: function editFoodRestrictions(user, userRestrictions) {
    //for each restriction
      // if restriction does not exist in restriction table, add
    // fetch users pre-existing restrictions
      // if a restriction has been removed, remove their connection with it from the db
      // if one has been added, add their connection with it to the db
  }
};
