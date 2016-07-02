var _ = require('../../client/lib/bower_components/underscore/underscore.js');
'use strict'

// used from search_controller after all attendees have responded to an event
  // finds top three most popular food items from attendees pre-pulled event food prefs and profile food prefs
module.exports = searchAlgorithm = {

  totalUserPrefs: function (userPrefs) { //expects an array of both profile and current choices
    var result = [];
    userPrefs.forEach(function(item) {
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    });

    return result; // this is the total of different foods of a single user with repeats parsed out
  },

  histogram: function (foodprefs) {
    var result = {};
    foodprefs.forEach(function(food) {
      if (!result[food]) {
        result[food] = 1;
      } else {
        result[food]++;
      }
    });
    return result;
  },

  threeHeighest: function (obj, userNum) { // get the most frequently chosen foods
    var result = [];
    while (result.length < 3) {
      var high = _.reduce(Object.keys(obj), function (a, b) { return obj[a] > obj[b] ? a : b; });
      var temp = [high, obj[high]];
      delete obj[high];
      result.push(temp);
    }
    return result;
  },

  percentage: function (choiceNum, personNum) {
    return ((choiceNum*100)/personNum).toFixed(2);
  },

  parseBestOptions: function (allUserChoices) {  // called from search controller
    var allUserPrefs = allUserChoices.map(function(user) {
      return searchAlgorithm.totalUserPrefs(user[0].concat(user[1]));
    });

    return searchAlgorithm.threeHeighest(searchAlgorithm.histogram(_.flatten(allUserPrefs)));
     // returns the top-three choices with num of people who voted for each
  }

};
