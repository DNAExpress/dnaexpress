var jwt = require('jwt-simple');
var User = require('./../data/models/user');
var Users = require('./../data/collections/users');

module.exports = userControls = {
  signup: function signup(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log('routed to signup')
    new User({ username: username })
      .fetch()
      .then(function(user) {
        console.log('looked for user')
        if (!user) {
          var newUser = new User({
            username: username,
            email: email,
            password: password,
            salt: null,
            firstname: null,
            lastname: null
          });
          newUser.save()
            .then(function(newUser) {
              console.log('saved user')
              var token = jwt.encode(newUser, 'secret');
              res.json({token: token});
            });
        } else {
          res.status(500).send({error: 'account already exists'});
        }
      });  
  },
  signin: function signin(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(500).send({error: 'user does not exist'});
        } else {
          user.comparePassword(password, function(match) {
            if (match) {
              console.log('making signin token')
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            } else {
              res.status(500).send({error: 'user password does not match'});
            }
          });
        }
    });
  },
  checkAuth: function checkAuth() {

  },
  editUserProfile: function editUserProfile() {

  }
};
