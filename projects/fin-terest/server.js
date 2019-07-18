var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();
var port = process.env.PORT || 8080;

require('dotenv').load();
require('./config/passport')(passport);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fin-terest');

//session secret
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(port, function() {
  console.log('Serving dolphins on port ' + port);
});
