var api_router = require('./../data/api_requests/api_router.js');
var searchAlgorithm = require('./searchalgorithm');
var Recommendation = require('./../data/models/recommendation');

module.exports = searchControls = {

  handleSingleSearch: function (req, res) {
    console.log('single search request', req.body)
    var searchInput = {
      location: req.body.location,
      term: req.body.opt1
    };

    searchControls.makeRequest(searchInput, function(searchResults) {
      console.log(searchResults)
      res.status(200).json(searchResults);
    });
  },

  makeRequest: function (searchInput, callback) {
    var searchCriteria = {
      location: searchInput.location,
      searchTerm: searchInput.term
    };

    api_router.askYelp(searchCriteria, callback);
  },

  getEventRecommendations: function (userAndEventDetails) {
    // sample userAndEventDetails: {location:'', restrictions: [], userFoodPrefs: [], eventId: int};
    var searchInput = {};

    searchInput.location = userAndEventDetails.location;
    console.log('userAndEventDetails.userFoodPrefs', userAndEventDetails.userFoodPrefs)
    var searchCriteria = searchAlgorithm.parseBestOptions(userAndEventDetails.userFoodPrefs);
    var dietRestriction = getUnique(userAndEventDetails.restrictions);
    console.log('searchCriteria', searchCriteria)
    console.log('dietRestriction', dietRestriction)
    // make three calls to makeRequest with request details, (a food pref, diet restrictions, and location) 
    // pass in a callback to add the result to recommendations (this will need userAndEventDetails.eventId)
    searchCriteria.forEach(function(criteria) {
      var searchInput = {
        location: userAndEventDetails.location,
        term: dietRestriction.concat(criteria[0]).join(',')  // yelp search term requires a comma seperated / stringed list
      };
      //console.log('searchInput', searchInput)
      searchControls.makeRequest(searchInput, function(searchResults) {
        var topRecommendations = searchResults.slice(0, 4);

        topRecommendations.forEach(function(recommendation) {
          // should create a seperate add recommendation function on the events controller...
          var newRecommendation  = {
            event_id: userAndEventDetails.eventId, 
            name: recommendation.name,
            address: recommendation.location.address[0],
            city: recommendation.location.city,
            phone: recommendation.phone,
            rating_img_url: recommendation.rating_img_url,
            snippet_image_url: recommendation.snippet_image_url,
            url: recommendation.url
          };
          console.log('newRecommendation', newRecommendation)
          new Recommendation(newRecommendation).save().then(function(recom) {
            console.log('new recommendation saved!')
          })
          .catch(function(error) {
            console.log(error);
          })
        })
      })
    })

    // helper function: 
    function getUnique() {
      var n = [];
      for(var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
      }
      return n;
    };
  }

}

//sample current request body from client:
    // search req body { 
    //  location: 'boston',
    //   opt1: 'indian'
    // }
