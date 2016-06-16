var foodTypes = require('./food_Types');
var dietRestrictions = require('./diet_restrictions');
var Restrictions = require('../collections/diet_restrictions');
var Restriction = require('../models/diet_restrictions');
var Food = require('./../models/food');
var Foods = require('./../collections/foods');

module.exports = {
  addDietRestrictions: function() {
    dietRestrictions.dietRestrictions.forEach(function(restriction){
      var newDietRestriction = new Restriction({
        type: restriction
      });
      newDietRestriction.save();
    });
  },

  addFoodTypes: function() {
    foodTypes.foodTypes.forEach(function(food){
      var newFoodType = new Food({
        type: food
      });
      newFoodType.save();
    });
  }
}
