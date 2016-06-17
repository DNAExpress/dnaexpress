var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key:'ju7T0GatX3G3terGQa8qAg',
  consumer_secret:'xxqTDZc8wGUxCcvzxgaVaRKeGY8',
  token:'gTsZIinUjEwsPzCcaA_CXLzjN4WSiZOO',
  token_secret:'D4W6WFkDcsxrADvwLMcv3ZrDJdA'
});

module.exports.askYelp = function(searchCriteria, response) {
  console.log('search criteria', searchCriteria);
  // searchCriteria is an object with filter data
    //will first pass in {searchTerm: 'some food type', location: 'some location'}
  var category = 'restaurants';
  var termFilter = searchCriteria.searchTerm;
  var searchLocation = searchCriteria.location;
  yelp.search({category_filter:category, term: termFilter, location:searchLocation})
  .then(function(yelpData){
    response.status(200).json(yelpData.businesses);
    // re-write to send response back to handle before sending to client
  })
  .catch(function(err) {
    res.status(500).send({error: 'error inside restaurant_search.js askYelp: ' + err});
  });
}


/*
yelp search parameters from yelp documentation:
term: search term (such as restaurants, thai food, etc.)
sort: organizes results. acceptable parameters are 0 - best matched, 1 - distance, 2 - Highest Rated. 1 and 2 may return more results
category_filter: filters results by a comma delimited list ie see yelp dev docs for example https://www.yelp.com/developers/documentation/v2/search_api
radius_filter: search radius in meters. max value is 40000 (equal to 25 miles),
location: see yelp docs. several ways to search by this.
*/
