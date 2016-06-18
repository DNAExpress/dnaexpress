var DietRestrictions = require('./../data/collections/diet_restrictions');
var DietRestriction = require('./../data/models/diet_restrictions');

module.exports = dietServices = {
  getDietRestrictions: function () {

  },
  editDietRestrictions: function editFoodRestrictions(user, userRestrictions) {
    // fetch users pre-existing restrictions
      // if a restriction has been removed, remove their connection with it from the db
      // if one has been added, add their connection with it to the db
  }
}
