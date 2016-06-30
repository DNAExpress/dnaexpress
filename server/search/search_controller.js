var api_router = require('./../data/api_requests/api_router.js');
var searchAlgorithm = require('./searchalgorithm');
var Recommendation = require('./../data/models/recommendation');
// var eventControls = require('./../events/events_controller');
var MailServer = require('./../mail_server/mail_server');
var User = require('./../data/models/user');

module.exports = searchControls = {

  handleSingleSearch: function (req, res) {
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

  getEventRecommendations: function (userAndEventDetails, event) {
    // sample userAndEventDetails: {location:'', restrictions: [], userFoodPrefs: [], eventId: int};
    var searchInput = {};

    searchInput.location = userAndEventDetails.location;
    var searchCriteria = searchAlgorithm.parseBestOptions(userAndEventDetails.userFoodPrefs);
    var dietRestriction = getUnique(userAndEventDetails.restrictions);
    // make three calls to makeRequest with request details, (a food pref, diet restrictions, and location)
    // pass in a callback to add the result to recommendations (this will need userAndEventDetails.eventId)
    Promise.all(searchCriteria.map(function(criteria) {
      var searchInput = {
        location: userAndEventDetails.location,
        term: dietRestriction.concat(criteria[0]).join(',')  // yelp search term requires a comma seperated / stringed list
      };
      var userVotes = criteria[1];

      searchControls.makeRequest(searchInput, function(searchResults) {
        var topRecommendations = searchResults.slice(0, 4);

        topRecommendations.map(function(recommendation) {
          // should create a seperate add recommendation function on the events controller...
          var newRecommendation  = {
            event_id: userAndEventDetails.eventId,
            name: recommendation.name,
            address: recommendation.location.address[0],
            city: recommendation.location.city,
            phone: recommendation.phone,
            rating_img_url: recommendation.rating_img_url,
            snippet_image_url: recommendation.snippet_image_url,
            url: recommendation.url,
            userVotes: userVotes,
            image_url: recommendation.image_url
          };
          new Recommendation(newRecommendation).save().then(function(recom) {
            console.log('new recommendation saved!');
          })
          .catch(function(error) {
            console.log(error);
          });
        });
            // email event creator to alert them to choose a restaurant
      })
      return 1;
    }))
    .then(function (n) {
        console.log('How many times is this logging?');
        emailCreator(event);
    });

    // helper functions:
    function getUnique() {
      var n = [];
      for(var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
      }
      return n;
    };

    function emailCreator(event) {
      User
       .forge({username: event.attributes.creator})
       .fetch()
       .then(function (user) {
         return MailServer.mail(user.attributes.firstname, '/mail_Templates/creatorAlert.html', user.attributes.email, event.attributes.name);
       });
    };
  }

}

//sample current request body from client:
    // search req body {
    //  location: 'boston',
    //   opt1: 'indian'
    // }
