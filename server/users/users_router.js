var usersController = require('./users_controller.js');

module.exports = function(app) {

  app.post('/signup', usersController.signup)

  app.post('/signin', usersController.signin)

  app.route('/profile')
    .post(usersController.editUserProfile)

  // routing for editing profile
  // handling connections with other users

};
