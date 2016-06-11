var Users = require('./users_model.js');
var jwt = require('jwt-simple');

module.exports = userControls = {

  signup: function signup(req, res) {
    console.log('in users_controller.js: attempting to signup user')

    var email = req.body.email;
    var password = req.body.password;

    Users.findOne({'email': email})
      .then(function(user) {
        if (user) {
          console.log('ERROR: in users_controller signup')
        } else {
          var newUser = {
            email: email,
            password: password
          };
          return Users.create(newUser);
        }
      }).then(function(user) {
         var token = jwt.encode(user, 'secret');
         res.json({token: token});
      }).fail(function(err) {
        console.error(err)
      });
  },

  signin: function signin(req, res) {
    console.log('in users_controller.js: attempting to signin user')
    var email = req.body.email;
    var password = req.body.password;
    
    Users.findOne({'email': email})
      .then(function(user) {
        if (user) {
          // check password...
            // if passwork checks out
              // make token
              // res with success and token
        } else {
          // res that user does not exist
        }
      })
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
