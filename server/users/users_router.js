var usersController = require('./users_controller.js');

module.exports = function(app) {

  app.post('/signup', usersController.signup);

  app.post('/signin', usersController.signin);

  app.post('/profile', usersController.editUserProfile); // edit profile

};
