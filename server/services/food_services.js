var Foods = require('./../data/collections/foods');
var Food = require('./../data/models/food');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = foodServices = {
    getProfileFoodPrefs: function(user) {
        //console.log('inside getProfileFoodPrefs')
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
        //console.log('inside addProfileFoodPrefs', submittedPrefs)

        submittedPrefs.forEach(function(pref) {
          addPref(pref);
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
        //console.log('inside removeProfileFoodPrefs, ', prefsToRemove);

        prefsToRemove.forEach(function(pref) {
          removePref(pref);
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

    editProfileFoodPrefs: function(next, user, updatedFoodPrefs) {
        console.log('inside editProfileFoodPrefs')
        var toRemove = [];
        var toAdd = [];

        return foodServices.getProfileFoodPrefs(user)
          .then(function(savedFoodPrefs) {
            for (var i = 0; i < updatedFoodPrefs.length; i++) {
              if (!isInArray(savedFoodPrefs, updatedFoodPrefs[i])) {
                toAdd.push(updatedFoodPrefs[i]);
              }
            }
            for (var j = 0; j < savedFoodPrefs.length; j++) {
              if (!isInArray(updatedFoodPrefs,savedFoodPrefs[j])) {
                toRemove.push(savedFoodPrefs[j]);
              }
            }
          })
          .then(function() {
            foodServices.removeProfileFoodPrefs(user, toRemove);
          }).then(function() {
            foodServices.addProfileFoodPrefs(user, toAdd);
          }).then(function() {
            return foodServices.getProfileFoodPrefs(user);
          })
          .catch(function(error) {
            return next(new Error(error));
          });
    }
}

function isInArray(array, value) {
  return array.indexOf(value) > -1;
}
