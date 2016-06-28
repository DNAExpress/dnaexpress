// [steak, salad, sushi, steak, salad, sushi]
// algorithm for most likely preferences
  // for each array of arrays
    // for each array
  // individual [[[person1Profile], [person1Current]], [[person1Profile], [person1Current]], [[person1Profile], [person1Current]]]
  var _ = require('../../client/lib/bower_components/underscore/underscore.js');

  'use strict'
  var users = [[['a', 'b', 'c'], ['a', 'd', 'e']], [[['a', 'b', 'y']], ['p', 'y', 'x']], [['a', 'r', 'b'], ['a', 't', 'v']]];
  var numOfPeople = users.length;

module.exports = searchAlgorithm = {
  // function to pull each profile and current from schema and add as an array to the results array - this will be passed into parseBestOptions
  totalUserPrefs: function (userPrefs) { //expects an array of both profile and current choices
    var result = [];
    userPrefs.forEach(function(item) {
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    });

    return result; // this is the total different foods of a single user with repeats parsed out
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

  parseBestOptions: function (allUserChoices) {
    var allUserPrefs = allUserChoices.map(function(user) {
      return searchAlgorithm.totalUserPrefs(user[0].concat(user[1]));
    });

    return searchAlgorithm.threeHeighest(searchAlgorithm.histogram(_.flatten(allUserPrefs)));
     // number of people for each specified choices for all users
  }

};

  //totalUserPrefs();
  // var bestoptions = searchAlgorithm.parseBestOptions(users);
  // console.log('bestoptions', bestoptions)

  // function filterFoods(obj, curprefs) {
  //   var newObj = {};
  //   for(var key in obj) {
  //     if (obj[key] === 2) {
  //       newObj[key] = 2;
  //     }
  //   };




//     if (Object.keys(newObj).length === 0) {
//       return curprefs;  // if there are no current choices that match profile return the current choices
//     } else {
//       return Object.keys(newObj); // return current choices that match profile choices
//     }
//   };

//   // function parseBestOptions(array) {
//     var flat;
//     Array.isArray(array[0]) ? flat = _.flatten(array) : flat = array;
//     var totalFoods = histogram(flat);

//   // }
// // in the works
//   function highestCounts(foodprefs) {
//     // var counts = [];
//     // iterate over object
//       //
//     var results = [];
//     for (var key in foodprefs) {
//       results.push([key, foodprefs[key]]);
//     }
//     var highestThree = counts.sort().slice(-3);
//     for (var key in foodprefs) {
//       highestThree.map(function(item){
//         if (foodprefs[key] === item) {
//           results.push()
//         }
//       });
//     }
//   }

  // function comparePrefs(foodPrefObj) {
  //   var result;
  //   var percentage;
  //   var highestCounts = [];
  //   var highestCountFoods = [];
  //   for (var key in foodPrefObj) {
  //     if (foodPrefObj[key] > highestCount) {
  //       highestCount = foodPrefObj[key];
  //       highestCountFood = key;
  //     }
  //   }
  //   if (!highestCountFood) {
  //     //percentage = numOfPeople/arrayOfPrefs.length;
  //     result = [arrayOfPrefs[Math.floor(Math.random() * arrayOfPrefs.length)], 1];
  //   } else {
  //     result = [highestCountFood, highestCount];
  //   }
  //   return result;
  // }

  // function singlePercentages(obj) {
  //   var count = 0;
  //   var highestCount = 0;
  //   for (var key in obj) {
  //     if (obj[key] > highestCount) {
  //       highestCount += obj[key];
  //     }
  //     count += obj[key];
  //   }
  //   return
  // }

