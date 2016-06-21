var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = foodServices = {
    getProfileFoodPrefs: function(user) {
        return Food
            .forge()
            .fetch()
            .then(function(food) {
                //send both references down the promise chain
                return {foodModel: food, userModel: user};
            })
            .then(function(references) {
                return references
                    .userModel
                    //get the belongsToMany relation specified in the first definition, which returns a collection
                    .foodtypes()
                    .fetch();
            })
            .then(function(relation) {
                //console.log('got userProfileFoodPrefs table', relation.models)
                return relation.models.map(function(model) {

                  console.log('model atts.type', model.attributes.type)
                  return model.attributes.type
                })
            })
    },
    addProfileFoodPrefs: function(user, submittedPrefs) {
        var user = this;

        submittedPrefs.forEach(function(pref) {
          user.addPref(pref);
        })

        function addPref(pref) {
          return Food
              .forge({type: pref})
              .fetch()
              .then(function(food) {
                  //send both references down the promise chain
                  return {foodModel: food, userModel: user};
              })
              .then(function(references) {
                //console.log('references', references)
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
    },
    removeProfileFoodPrefs: function(user, prefsToRemove) {
        var user = this;

        prefsToRemove.forEach(function(pref) {
          user.removePref(pref);
        })

        function removePref(pref) {
          return Food
              .forge({type: pref})
              .fetch()
              .then(function(food) {
                  //send both references down the promise chain
                  return {foodModel: food, userModel: user};
              })
              .then(function(references) {
                //console.log('references', references)
                  return references
                    .userModel
                    //get the belongsToMany relation specified in the first definition, which returns a collection
                    .foodtypes()
                    //attach the target to the collection, not the model instance
                    .detach(references.foodModel);
              })
              .then(function(relation) {
                  console.log('removed user-food connection to userProfileFoodPrefs table')
              })
        }
    },
    editProfileFoodPrefs: function(req, res, next, user) {
        var updatedFoodPrefs = req.body.prefs;
        var toRemove = [];
        var toAdd = [];

        foodServices.getProfileFoodPrefs(user)
          .then(function(savedFoodPrefs) {
            for (var i = 0; i < updatedFoodPrefs.length; i++) {
              if (!savedFoodPrefs.includes(updatedFoodPrefs[i])) {
                toAdd.push(updatedFoodPrefs[i]);
              }
            }
            for (var j = 0; j < savedFoodPrefs.length; j++) {
              if (!updatedFoodPrefs.includes(savedFoodPrefs[j])) {
                toRemove.push(savedFoodPrefs[j]);
              }
            }
          })
          .then(function() {
            foodServices.removeProfileFoodPrefs(user, toRemove);
          }).then(function() {
            foodServices.addProfileFoodPrefs(user, toAdd);
          }).then(function() {
            foodServices.getProfileFoodPrefs(user);
          })
          .catch(function(error) {
            console.log('Error in editing Profile Food prefs', error)
          });
    }
  // old
        // getFoodPrefs: function () {

        // },
        // editProfileFoodPrefs: function editFoodPrefs(user, foodPrefs, next) {
        //   var userId = user.attributes.id;

        //   // fetch users pre-existing food preferences
        //     // if a preference has been removed, remove their connection with it from the db
        //     // if one has been added, add their connection with it to the db
        // },
        // addUserFoodPrefs: function(userId, foodPrefs) {
        //   // should just pass in the user model, rather than just the ID

        //   //get the first model
        //   var userId = 1;
        //     User
        //       .forge({id: userId})
        //       .fetch()
        //       .then(function(user) {
        //           //get the other model to add to the join table
        //           return Food
        //                   .forge({type: 'greek'})
        //                   .fetch()
        //                   .then(function(food) {
        //                       //send both references down the promise chain
        //                       return {foodModel: food, userModel: user};
        //                   });

        //       })
        //       .then(function(references) {
        //         console.log('references', references)
        //           return references
        //                   .userModel
        //                   //get the belongsToMany relation specified in the first definition, which returns a collection
        //                   .foodtypes()
        //                   //attach the target to the collection, not the model instance
        //                   .attach(references.foodModel);
        //       })
        //       .then(function(relation) {
        //           console.log('added user-food connection to userProfileFoodPrefs table')
        //       })
        // }
}
//foodServices.addUserFoodPrefs()
