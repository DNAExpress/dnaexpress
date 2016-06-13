 var Users = require('./users_model.js');
var jwt = require('jwt-simple');
var Q = require('q');

module.exports = userControls = {

  signup: function signup(req, res) {
    console.log('in users_controller.js: attempting to signup user')
    var newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    var findUser = Q.nbind(Users.findOne, Users);
    findUser({'email': newUser.email})
      .then(function(user) {
        if (user) {
          console.log('ERROR: in users_controller signup')
        } else {
          return Users.create(newUser);
        }
      })
      .then(function(user) {
         var token = jwt.encode(user, 'secret');
         res.json({token: token});
      })
      .fail(function(err) {
        console.error(err)
      });
  },

  signin: function signin(req, res) {
    console.log('in users_controller.js: attempting to signin user')
    var currUser = {
      email: req.body.email,
      password: req.body.password
    };
    console.log('currUser attempting login', currUser)
    var findUser = Q.nbind(Users.findOne, Users);
    findUser({'email': currUser.email})
      .then(function(user) {
        if (!user) {
          console.log('not a user!')
        } else {
          console.log('db resp of user', user);
          if (user.password === currUser.password) {
            var token = jwt.encode(user, 'secret');
            res.json({token: token});
          }
          // return user.checkPassword(password)
          //   .then(function(user) {
          //     if (user) {
          //       var token = jwt.encode(user, 'secret');
          //       res.json({token: token});
          //     } else {
          //       console.log("no user")
          //     }
          // });
        }
      })
      .fail(function(err) {
        console.error(err)
      });
  },

  checkAuth: function checkAuth(req, res) {
    console.log('in users_controller.js: attempting to checkAuth')
    //
  },

  editUserProfile: function(req, res) {
    console.log('in users_controller.js: attempting to edit profile')
    // authenticate first
  }
};
