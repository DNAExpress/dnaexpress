var DietRestrictions = require('./../data/collections/diet_restrictions');
var DietRestriction = require('./../data/models/diet_restrictions');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = dietServices = {

  getDietRestrictions: function (user) {
    return DietRestriction
    .forge()
    .fetch()
    .then(function(restriction) {
      return {dietRestrictionModel: restriction, userModel: user};
    })
    .then(function(references) {
      return references
        .userModel
        .dietRestrictions()
        .fetch();
    })
   .then(function(relation) {
      return relation.models.map(function(model) {
        return model.attributes.type;
       });
   });
  },

  editDietRestrictions: function (next, user, newRestrictions) {
    var toAdd = [];
    var toRemove = [];
    return dietServices.getDietRestrictions(user)
      .then(function(storedRestrictions) {
        newRestrictions.forEach(function (current) {
          if (storedRestrictions.indexOf(current) === -1) {
            toAdd.push(current);
          }
        })
        storedRestrictions.forEach(function (stored) {
          if (newRestrictions.indexOf(stored) === -1) {
            toRemove.push(stored);
          }
        });
    })
    .then(function(){
      //console.log(toAdd, toRemove);
      dietServices.removeDietRestrictions(user, toRemove);
    })
    .then(function() {
      dietServices.addDietRestrictions(user, toAdd);
    })
    .then(function () {
      return dietServices.getDietRestrictions(user);
    })
    .catch(function(error) {
      console.log('Error in editing Diet Restrictions', error);
    });
  },

  addDietRestrictions: function (user, toAdd) {
    toAdd.forEach(function(item) {
      add(item);
    });
    function add(item) {
        return DietRestriction
          .forge({type: item})
          .fetch()
          .then(function(restriction) {
            return {dietRestrictionModel: restriction, userModel: user};
          })
      .then(function(references) {
          return references
            .userModel
            .dietRestrictions()
            .attach(references.dietRestrictionModel);
      })
      .then(function(relation) {
          console.log('Successfully created relationship in addDietRestrictions function');
      }).catch(function(error){
          return next(new Error('Failed to create relationship in addDietRestrictions function'))
      });
    };
  },

  removeDietRestrictions: function (user, toRemove) {
    toRemove.forEach(function(item) {
      remove(item);
    });

    function remove(item) {
      return DietRestriction
        .forge({type: item})
        .fetch()
        .then(function(restriction) {
          return {dietRestrictionModel: restriction, userModel: user};
        })
        .then(function(references) {
          console.log('references', references)
          return references
            .userModel
            .dietRestrictions()
            .detach(references.dietRestrictionModel);
        })
        .then(function(relation) {
          console.log('Successfully removed relationship in removeDietRestrictions function');
        }).catch(function(error){
          return next(new Error('Failed to remove relationship in removeDietRestrictions function' + error));
        });
    }
  }
};
// User.forge().fetch({id: 1}).then(function(user){
//   dietServices.editDietRestrictions(null, user, ['vegetarian', 'vegan']);
// });

