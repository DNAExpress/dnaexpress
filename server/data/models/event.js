var db = require('./../db_schema.js');
var User = require('./user');
var Recommendation = require('./recommendation');

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  attendees: function() {
    return this.belongsToMany(User, 'usersEvents');
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
      console.log('initializing event');
      return self;
    }();
  },
  recommendation: function() {
    return this.hasMany(Recommendation);
  },

  creator: function() {
    return this.hasOne(User);
  },

  initialize: function() {
    return this.on('creating', this.createCustomId);
  },
});

module.exports = Event;
