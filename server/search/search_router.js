var searchController = require('./search_controller.js');

module.exports = function (app) {
  // curr plain /search post request will search for restaurants
    // however, having a search router would allow for other searches
    // if we chose to expand beyond restaurants (activities, etc.)
  app.route('/')
    .post(searchController.handleSingleSearch);

};
