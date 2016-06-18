var bodyParser = require('body-parser');
var fs = require('fs');

module.exports = function(app, express) {
  var searchRouter = express.Router();
  var usersRouter = express.Router();
  var eventsRouter = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/search', searchRouter);
  app.use('/api/users', usersRouter);

  app.use('/api/events', eventsRouter);

  require('../search/search_router.js')(searchRouter);
  require('../users/users_router.js')(usersRouter);
  require('../events/events_router.js')(eventsRouter);

  app.use(function errorHandler(error, req, res, next) {
    res.status(500).send({error: error.message});
  });

  app.get('/*', function(req, res) {
    fs.createReadStream(__dirname + '/../../client/index.html').pipe(res);
  });
};
