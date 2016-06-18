var path = require('path');
var db = require('knex')({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'dnaExpress',
    password: 'password',
    database: 'dnaExpressdb',
    charset: 'utf8',
    filename: path.join(__dirname, './db/dna.sqlite')
  },
  useNullAsDefault: true
});


db.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('email', 100).unique();
      user.string('password', 100);
      user.string('salt', 100);
      user.string('firstname', 50);
      user.string('lastname', 50);
      user.string('location', 100);
      user.timestamps();
    }).then(function () {
      console.log('Created users table');
    });
  }
});

db.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    db.schema.createTable('events', function(event) {
      event.increments('id').primary();
      event.string('name', 50);
      event.date('date');
      event.integer('creator').references('users.id');
      event.integer('attendeesNum');
      event.integer('responded');
      event.string('selectedRestaurant');
      event.string('publicEventId').unique();
      event.timestamps();
    }).then(function (table) {
      console.log('Created events table', table);
    });
  }
});

db.schema.hasTable('friends').then(function(exists) {
  if (!exists) {
    db.schema.createTable('friends', function(friendship) {
      friendship.increments('id').primary();
      friendship.integer('user_id').references('users.id');
      friendship.integer('friend_id').references('users.id');
    }).then(function () {
      console.log('Created friends table');
    });
  }
});

db.schema.hasTable('userEvents').then(function(exists) {
  if (!exists) {
    db.schema.createTable('userEvents', function(userEvent) {
      userEvent.increments('id').primary();
      userEvent.integer('user_id').references('users.id');
      userEvent.integer('event_id').references('events.id');
      userEvent.boolean('responseStatus');
    }).then(function (table) {
      console.log('Created userEvents table', table);
    });
  }
});

db.schema.hasTable('userEventsFood').then(function(exists){
  if (!exists) {
    db.schema.createTable('userEventsFood', function(userEventFood){
      userEventFood.increments('id').primary();
      userEventFood.integer('userEvent_id').references('userEvents.id');
      userEventFood.integer('foodType_id').references('foodTypes.id');
    }).then(function (table) {
      console.log('Created userEventsFood table', table);
    });
  }
});

db.schema.hasTable('recommendations').then(function(exists){
  if (!exists) {
    db.schema.createTable('recommendations', function(recommendation){
      recommendation.increments('id').primary();
      recommendation.integer('event_id').references('events.id');
      recommendation.string('recommendation');
    }).then(function (table) {
      console.log('Created userEventsFood table', table);
    });
  }
});

db.schema.hasTable('foodTypes').then(function(exists) {
  if (!exists) {
    db.schema.createTable('foodTypes', function(food) {
      food.increments('id').primary();
      food.string('type', 50);
    }).then(function () {
      var autoPop = require('./presets/auto_pop_tables');
      autoPop.addFoodTypes();
      console.log('Created foodTypes table and populated preset data');
    });
  }
});

db.schema.hasTable('userProfileFoodPrefs').then(function(exists) {
  if (!exists) {
    db.schema.createTable('userProfileFoodPrefs', function(profFoodPrefs) {
      profFoodPrefs.increments('id').primary();
      profFoodPrefs.integer('user_id').references('users.id');
      profFoodPrefs.integer('type_id').references('foodTypes.id');
    }).then(function () {
      console.log('Created userProfileFoodPrefs table');
    });
  }
});

db.schema.hasTable('dietRestricts').then(function(exists) {
  if (!exists) {
    db.schema.createTable('dietRestricts', function(restricts) {
      restricts.increments('id').primary();
      restricts.string('type', 50);
    }).then(function () {
      var autoPop = require('./presets/auto_pop_tables');
      autoPop.addDietRestrictions();
      console.log('Created dietRestricts table and populated preset data');
    });
  }
});

db.schema.hasTable('userDietRestricts').then(function(exists) {
  if (!exists) {
    db.schema.createTable('userDietRestricts', function(userRestricts) {
      userRestricts.increments('id').primary();
      userRestricts.integer('user_id').references('users.id');
      userRestricts.integer('restriction_id').references('dietRestricts.id');
    }).then(function () {
      console.log('Created userDietRestricts table');
    });
  }
});

db.schema.hasTable('eventSuggestions').then(function(exists) {
  if (!exists) {
    db.schema.createTable('eventSuggestions', function(suggestion) {
      suggestion.increments('id').primary();
      suggestion.integer('event_id').references('events.id');;
      suggestion.string('suggestion', 50);
    }).then(function () {
      console.log('Created eventSuggestions table');
    });
  }
});

var bookshelf = require('bookshelf')(db);
module.exports = bookshelf;
