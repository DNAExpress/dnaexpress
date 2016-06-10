var Yelp = require('./restaurant_search.js');

module.exports = {

  askYelp:function(searchCriteria, res) {
    Yelp.askYelp(searchCriteria, res);
  }

};
