// var Bookshelf = require('./../db_schema.js');
var DietRestrictions = require('./../data/collections/diet_restrictions');
var DietRestriction = require('./../data/models/diet_restrictions');
var Users = require('./../data/collections/users');
var User = require('./../data/models/user');

module.exports = dietServices = {
  getDietRestrictions: function () {
    // var dietRestriction = new DietRestriction({});
  },
  editDietRestrictions: function editFoodRestrictions (user, userRestrictions) {
    // fetch users pre-existing restrictions
      // if a restriction has been removed, remove their connection with it from the db
      // if one has been added, add their connection with it to the db
      // var totalRestrictions = [];
      // userRestrictions.forEach(function(restriction){
  },
  addDietRestriction: function (userid, userRestrictions) {
    // userRestrictions.forEach(function (restriction) {
    //   var restriction_id = bookshelf.knex.raw("SELECT id FROM dietRestricts WHERE type='" + restriction + "';");
    //   Bookshelf.knex.raw("INSERT INTO userDietRestricts (user_id, restriction_id) VALUES ('" + user.attributes.id + "', '" + restriction_id + "');");
    // });
    var userId = 1;
    User
    .forge({id: userId})
    .fetch()
    .then(function(user) {
        //get the other model to add to the join table
        return DietRestriction
                .forge({type: 'vegan'})
                .fetch()
                .then(function(restriction) {
                    //send both references down the promise chain
                    return {dietRestrictionModel: restriction, userModel: user};
                });

    })
    .then(function(references) {
      console.log('references', references)
        return references
                .userModel
                //get the belongsToMany relation specified in the first definition, which returns a collection
                .dietRestrictions()
                //attach the target to the collection, not the model instance
                .attach(references.dietRestrictionModel);
    })
    .then(function(relation) {
        console.log('alskdfjlkasdjflkjsdflkjalskdj')
    });
    // new DietRestriction()  //{type: restriction}
    // .query().where(...userRestrictions)
    // .fetch()
    // // .then(function(restriction){
    //   // totalRestrictions.push(restriction);
    // .then(function(restriction){
    //   user.DietRestriction.dietRestrictions().attach(restriction);
    // });
  },

  removeDietRestriction: function (user, userRestrictions) {
    // new DietRestriction()
    // .query().where
    // .fetch()
    // userRestrictions.forEach(function (restriction) {
      // var removableRestriction_ids = bookshelf.knex.raw("SELECT id FROM dietRestricts WHERE type <> '" + restriction + "';"); // array of restrictions not being submitted?
      // removableRestriction_ids.forEach(function (removableRestriction_id) {
        Bookshelf.knex.raw("DELETE * FROM userDietRestricts WHERE user_id = '" + user.attributes.id + "';");
      // });
    // });
  }
};

// dietServices.addDietRestriction();
