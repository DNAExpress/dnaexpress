var Users = require('./users_model.js');
var jwt = require('jwt-simple');

module.exports = userControls = {

  signup: function signup(req, res) {
    console.log('in users_controller.js: attempting to signup user')

    var email: req.body.email;
    var password: req.body.password;

    Users.findOne({'email': email})
      .then(function(user) {
        if (user) {
          // res that that user already exits 
        } else {
          // add user to db - encrypt password, send back token
        }
      })
    // check if user exists in db
      // if the user does not exist
        // add them
        // res with token
      // if they already exist, res with that info
  },

  signin: function signin(req, res) {
    console.log('in users_controller.js: attempting to signin user')
    var email: req.body.email;
    var password: req.body.password;
    
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

    // use for adding and updating a users profile?
    // or redirect to a function for each
  }

  // handle connections - requestConnection, acceptConnection, delete connection

  // signin, signout / authentication
};
