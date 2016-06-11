var usersController = require('./users_controller.js');

module.exports = function(app) {
<<<<<<< 6e8f7df0631409271fc7a691dd4ea5754fa9b4c9

  app.post('/signup', usersController.signup)

  app.post('/signin', usersController.signin)

  app.get('/auth', usersController.checkAuth)

  app.route('/profile')
    .post(usersController.editUserProfile)

  // routing for editing profile
  // handling connections with other users

=======
  app.route('/signup')
    .post(usersController.signup) ///controller.funtion

  // routing for authentication: sign-in, sign-out
  // routing for editing profile
  // handling connections
>>>>>>> [feat] add routing for signing up users
};
