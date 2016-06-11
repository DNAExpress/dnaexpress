var bodyParser = require('body-parser');
var fs = require('fs');


module.exports = function(app, express) {
  var searchRouter = express.Router();
  // var userRouter = express.Router();
  // var eventRouter = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));

  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/search', searchRouter);

  require('../search/search_router.js')(searchRouter);

  app.get('/*', function(req, res) {
    fs.createReadStream(__dirname + '/../../client/index.html').pipe(res);
  });
};
