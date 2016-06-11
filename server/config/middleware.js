var bodyParser = require('body-parser');
var fs = require('fs');

module.exports = function(app, express) {
  var searchRouter = express.Router();
  var usersRouter = express.Router();
  // var eventRouter = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/search', searchRouter);
  app.use('/api/users', usersRouter)

  require('../search/search_router.js')(searchRouter);
  require('../users/users_router.js')(usersRouter)

  require('../users/users_router.js')(usersRouter)

  app.get('/*', function(req, res) {
    fs.createReadStream(__dirname + '/../../client/index.html').pipe(res);
  });

  app.get('/*', function(req, res) {
    fs.createReadStream(__dirname + '/../../client/index.html').pipe(res);
  });
};
