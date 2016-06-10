var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

module.exports = function(app, express) {
   app.use(express.static(__dirname + '/../../client'));
 }
