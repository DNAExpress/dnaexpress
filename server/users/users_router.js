var usersController = require('./users_controller.js');

module.exports = function(app) {
  app.route('/signup')
    .post(usersController.signup) ///controller.funtion

  // routing for authentication: sign-in, sign-out
  // routing for editing profile
  // handling connections
};
