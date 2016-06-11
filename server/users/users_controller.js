var usersModel = require('./users_model.js');

module.exports = userControls = {
  signup = function signup(req, res) {
    // do something
    console.log('attempting to add user')
    // check if user exists in db
      // if the user does not exist
        // add them
        // res with token
      // if they already exist, res with that info
  },

  signin = function signin(req, res) {

  },

  checkAuth = function checkAuth(req, res) {

  },

  editUserProfile = function(req, res) {
    // authenticate first

    // use for adding and updating a users profile?
    // or redirect to a function for each
  }

  // handle connections - requestConnection, acceptConnection, delete connection

  // signin, signout / authentication
};
