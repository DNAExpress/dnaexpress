var searchController = require('./search_controller.js');

module.exports = function (app) {

  app.route('/')
    .post(searchController.handleSingleSearch);

};
