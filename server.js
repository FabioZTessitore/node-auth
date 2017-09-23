var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var bodyParser   = require('body-parser');
var helmet = require('helmet');

var port = process.env.PORT || 8080;

app.use('/css', express.static('./css'));

var configDB = require('./config/database.js');
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url, { useMongoClient: true });

app.use(helmet());

require('./config/passport.js')(passport);

app.use(morgan('dev'));
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'a secret to secret the secret haha' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./app/routes.js');
app.use(routes(passport));

app.listen(port, function () {
  console.log('The magic happens on port ' + port);
});
