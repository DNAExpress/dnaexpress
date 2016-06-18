var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = foodServices = {
  getFoodPrefs: function () {

  },
  editProfileFoodPrefs: function editFoodPrefs(user, foodPrefs, next) {
    var userId = user.attributes.id;

    // fetch users pre-existing food preferences
      // if a preference has been removed, remove their connection with it from the db
      // if one has been added, add their connection with it to the db
  },
  addUserFoodPrefs: function(userId, foodPrefs) {
    // should just pass in the user model, rather than just the ID

    //get the first model
    var userId = 1;
      User
        .forge({id: userId})
        .fetch()
        .then(function(user) {
            //get the other model to add to the join table
            return Food
                    .forge({type: 'greek'})
                    .fetch()
                    .then(function(food) {
                        //send both references down the promise chain
                        return {foodModel: food, userModel: user};
                    });

        })
        .then(function(references) {
          console.log('references', references)
            return references
                    .userModel
                    //get the belongsToMany relation specified in the first definition, which returns a collection
                    .foodtypes()
                    //attach the target to the collection, not the model instance
                    .attach(references.foodModel);
        })
        .then(function(relation) {
            console.log('added user-food connection to userProfileFoodPrefs table')
        })
  }
}
//foodServices.addUserFoodPrefs()
