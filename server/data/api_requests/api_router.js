var Yelp = require('./restaurant_search.js');

module.exports = {

  askYelp:function(req, res) {
    Yelp.askYelp(req.body.searchTerm, res);
  }

};
