var Yelp = require('../../config/config.js');

module.exports = {

  askYelp:function(req, res) {
    Yelp.askYelp(req.body.searchTerm, res);
  }

};
