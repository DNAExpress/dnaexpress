// [steak, salad, sushi, steak, salad, sushi]
// algorithm for most likely preferences
  // for each array of arrays
    // for each array
  // individual
  'use strict'
  var profilePrefs = ['steak', 'salad', 'sushi'];
  var currentPrefs = ['steak', 'salad', 'sushi'];
  var numOfPeople = 2;
  function histogram(foodprefs) {
    var result = {};
    foodprefs.forEach(function(food){
      if (!result[food]) {
        result[food] = 1;
      } else {
        result[food]++;
      }
    });
    return result;
  }
  //individual
  function filterFoods(obj) {
    var newObj = {};
    obj.forEach(function(item) {
      if (obj[key] === 2) {
        newObj[key] = 2;
      }
    });
    if (Object.keys(newObj).length === 0) {
      return currentPrefs;
    } else {
      return Object.keys(newObj);
    }
  };

  function parseBestOptions(array) {
    var flat;
    Array.isArray(array[0]) ? flat = _.flatten(array) : flat = array;
    var totalFoods = histogram(flat);

  }
// in the works
  function highestCounts(foodprefs) {
    // var counts = [];
    // iterate over object
      //
    var results = [];
    for (var key in foodprefs) {
      results.push([key, foodprefs[key]]);
    }
    var highestThree = counts.sort().slice(-3);
    for (var key in foodprefs) {
      highestThree.map(function(item){
        if (foodprefs[key] === item) {
          results.push()
        }
      })
    }
  }

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


