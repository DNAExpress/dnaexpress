var db = require('./../db_schema.js');
var Recommendation = require('./recommendation');
var UserEvent = require('./user_event');
// var Bookshelf = require('bookshelf');
db.plugin('registry');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  attendees: function() {
    return this.belongsToMany('User', 'usersEvents');
    //through usersEvents
  },
  createCustomId: function () {
    var num = [1,2,3,4,5,6,7,8,9,'a', 'b', 'c', 'd', 'e'];
    var self = this;
    return function(){
      var i = 0
        , j = 0
        , temp = null;

      for (i = num.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = num[i];
        num[i] = num[j];
        num[j] = temp;
      }
      self.set('publicEventId', num.join(''));
      return self;
    }();
  },

  recommendation: function() {
    return this.hasMany(Recommendation);
  },

  creator: function() {
    return this.hasOne('User');
  },

  initialize: function() {
    return this.on('creating', this.createCustomId);
  },

  saveSelection: function(RecName) {
    var self = this;
    var eventId = this.attributes.id;
    var choosen;
    return Recommendation
      .forge()
      .query('where', 'event_id', '=', eventId)
      .fetchAll()
      .then(function(recommendations) {
        var recModels = recommendations.models;
        for (var i = 0; i < recModels.length - 1; i++) {
          if (recModels[i].attributes.name === RecName) {
            choosen = recModels[i];
            i = recModels.length - 1;
          }
        }
        return choosen;
      })
      .then(function(choosen) {

        self.save({selectedRestaurant: choosen.attributes.id});
      })
  },

  getRecommendations: function() {
    var eventId = this.attributes.id;
    return Recommendation
      .forge()
      .query('where', 'event_id', '=', eventId)
      .fetchAll()
      .then(function (userEvents) {
        return userEvents.models.map(function(model) {
          return {
            name: model.attributes.name,
            address: model.attributes.address,
            city: model.attributes.city,
            phone: model.attributes.phone,
            rating_img_url: model.attributes.rating_img_url,
            snippet_image_url: model.attributes.snippet_image_url,
            url: model.attributes.url,
            userVotes: model.attributes.userVotes,
            image_url: model.attributes.image_url
          };
        });
      });
  }
});

module.exports = Event;
